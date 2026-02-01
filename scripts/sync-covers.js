const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const OLD_KEY = process.env.OLD_NOTION_KEY || "REPLACE_WITH_OLD_KEY";
const OLD_DB_ID = "2f08db7b-4141-808b-a8e6-f44c4064ad7a";

// NEW Credentials (from .env)
const NEW_KEY = process.env.NOTION_API_KEY;
const NEW_DB_ID = process.env.NOTION_DATABASE_ID; // Should be the new one

const oldNotion = new Client({ auth: OLD_KEY });
const newNotion = new Client({ auth: NEW_KEY });

async function syncCovers() {
    console.log("🚀 Starting Cover Image Sync...");

    // 1. Fetch Old Data
    console.log("Fetching Old DB...");
    // Use native fetch for Old DB query as before to match success pattern
    const fetch = global.fetch;
    const oldRes = await fetch(`https://api.notion.com/v1/databases/${OLD_DB_ID}/query`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OLD_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_size: 100 }),
    });

    if (!oldRes.ok) {
        console.error("Failed to fetch Old DB");
        return;
    }
    const oldData = await oldRes.json();
    const oldMap = new Map();
    for (const page of oldData.results) {
        const title = page.properties.Name?.title?.[0]?.plain_text
            || page.properties.Title?.title?.[0]?.plain_text;
        if (title && page.cover) {
            oldMap.set(title, page.cover);
        }
    }
    console.log(`Found ${oldMap.size} pages with covers in Old DB.`);

    // 2. Fetch New Data (Use native fetch again)
    console.log("Fetching New DB...");
    const newRes = await fetch(`https://api.notion.com/v1/databases/${NEW_DB_ID}/query`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${NEW_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_size: 100 }),
    });
    if (!newRes.ok) {
        throw new Error("Failed to fetch New DB");
    }
    const newPages = await newRes.json();

    // 3. Update New Data
    for (const page of newPages.results) {
        const title = page.properties.Name?.title?.[0]?.plain_text;
        if (title && oldMap.has(title)) {
            const cover = oldMap.get(title);
            console.log(`Updating cover for: "${title}"...`);

            // Notion API requires repacking match for external/file
            let newCover = null;
            if (cover.type === 'external') {
                newCover = { external: { url: cover.external.url } };
            } else if (cover.type === 'file') {
                // Files expire, but we copy the URL knowing it might last 1 hour
                // Ideally user should re-upload, but this helps immediate viz
                newCover = { external: { url: cover.file.url } };
            }

            if (newCover) {
                await newNotion.pages.update({
                    page_id: page.id,
                    cover: newCover
                });
            }
        }
    }
    console.log("✅ Cover Sync Complete!");
}

syncCovers();
