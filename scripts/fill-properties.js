const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const dbId = process.env.NOTION_DATABASE_ID;

const fetch = global.fetch;

async function request(path, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
    };
    if (body) options.body = JSON.stringify(body);

    // Auto-prepend v1/ if not present? Actually easier to manual.
    // Base URL https://api.notion.com/v1/
    const url = `https://api.notion.com/v1/${path}`;
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`API ${path} failed: ${res.status} ${await res.text()}`);
    }
    return res.json();
}

async function fillProperties() {
    console.log(`🚀 Starting Property Fill for DB: ${dbId}...`);

    // 1. Fetch All Pages
    const pages = await request(`databases/${dbId}/query`, "POST", { page_size: 100 });
    console.log(`Found ${pages.results.length} pages.`);

    for (const page of pages.results) {
        const title = page.properties.Name?.title?.[0]?.plain_text || "Untitled";
        console.log(`Processing: "${title}"...`);

        // 2. Fetch Blocks
        const blocks = await request(`blocks/${page.id}/children`, "GET");

        let desc = "";
        let tag = "";
        let timeline = "";

        // 3. Parse Blocks
        for (const block of blocks.results) {
            if (block.type === 'paragraph') {
                const text = block.paragraph.rich_text.map(t => t.plain_text).join("");

                if (text.startsWith("**Description**: ")) {
                    desc = text.replace("**Description**: ", "").replace("(None)", "");
                } else if (text.startsWith("**Tag**: ")) {
                    tag = text.replace("**Tag**: ", "").replace("(None)", "");
                } else if (text.startsWith("**Timeline**: ")) {
                    timeline = text.replace("**Timeline**: ", "").replace("(None)", "");
                }
            }
        }

        // 4. Update Properties
        const updates = {};
        if (desc) updates.Summary = { rich_text: [{ text: { content: desc } }] };
        if (tag) updates.Category = { select: { name: tag } };

        // Handle Date
        if (timeline) {
            const yearMatch = timeline.match(/20\d\d/);
            if (yearMatch) {
                updates.Date = { date: { start: `${yearMatch[0]}-01-01` } };
            }
        }

        if (Object.keys(updates).length > 0) {
            try {
                await request(`pages/${page.id}`, "PATCH", { properties: updates });
                console.log(`✅ Updated: ${title}`);
            } catch (e) {
                console.error(`❌ Failed update ${title}: ${e.message}`);
            }
        } else {
            console.log(`No data found in blocks for ${title}`);
        }
    }
    console.log("All done.");
}

fillProperties();
