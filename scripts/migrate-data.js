const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

// Helper to format ID with dashes if needed
function toUuid(id) {
    if (id.includes("-")) return id;
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
}

// OLD Credentials
const OLD_KEY = process.env.OLD_NOTION_KEY || "REPLACE_WITH_OLD_KEY";
const OLD_DB_ID = "2f08db7b-4141-808b-a8e6-f44c4064ad7a";
OLD_DB_ID = toUuid(OLD_DB_ID);

// NEW Credentials
const NEW_KEY = process.env.NOTION_API_KEY;
const NEW_DB_ID = process.env.NOTION_DATABASE_ID;

const oldNotion = new Client({ auth: OLD_KEY });
const newNotion = new Client({ auth: NEW_KEY });

async function migrate() {
    console.log("🚀 Starting Migration...");
    console.log(`FROM Old DB: ${OLD_DB_ID}`);
    console.log(`TO New DB: ${NEW_DB_ID}`);

    try {
        // 1. Fetch Old Data
        console.log("\n1. Fetching data from Old DB...");

        // Try strict lookup first to verify access
        try {
            const dbCheck = await oldNotion.databases.retrieve({ database_id: OLD_DB_ID });
            console.log(`✅ Old DB Accessible: ${dbCheck.title?.[0]?.plain_text || "Untitled"}`);
        } catch (e) {
            console.error("❌ Link to Old DB failed. Access Denied or ID Wrong.");
            console.error(e.message);
            return;
        }

        // Use Native Fetch to bypass SDK weirdness
        // Use Native Fetch to bypass SDK weirdness
        // Node 18+ has global fetch.

        const response = await global.fetch(`https://api.notion.com/v1/databases/${OLD_DB_ID}/query`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OLD_KEY}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ page_size: 100 }), // Limit to 100 or paginate if needed
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Fetch failed: ${response.status} ${errText}`);
        }

        const oldPages = await response.json();
        console.log(`Found ${oldPages.results.length} pages.`);

        // 2. Insert into New DB
        console.log("\n2. Migrating pages...");

        let successCount = 0;
        for (const page of oldPages.results) {
            const props = page.properties;

            // Extract Values with Fallbacks
            const title = props.Name?.title || props.Title?.title || [];
            const titleText = title[0]?.plain_text || "Untitled";

            const category = props.Tag?.select?.name || props.Category?.select?.name || "Project";
            // Summary logic: Check multiple likely names
            const summary = props.Description?.rich_text || props.Summary?.rich_text || [];

            // Date logic
            const dateVal = props.Date?.date || props.Created?.date || null;
            const date = dateVal ? dateVal : { start: page.created_time };

            // Extract Cover
            let cover = null;
            if (page.cover) {
                if (page.cover.type === 'external') {
                    cover = { external: { url: page.cover.external.url } };
                } else if (page.cover.type === 'file') {
                    cover = { external: { url: page.cover.file.url } };
                }
            }

            //console.log(`Migrating: "${titleText}" (${category})...`);

            try {
                await newNotion.pages.create({
                    parent: { database_id: NEW_DB_ID },
                    cover: cover,
                    properties: {
                        Name: { title: title },
                        Category: {
                            select: { name: category }
                        },
                        Summary: { rich_text: summary },
                        Date: {
                            date: date
                        }
                    }
                });
                process.stdout.write(".");
                successCount++;
            } catch (err) {
                console.error(`\nFailed to migrate "${titleText}": ${err.message}`);
            }
        }

        console.log(`\n✅ Migration Complete! Migrated ${successCount} pages.`);

    } catch (error) {
        console.error("\n❌ Critical Migration Error:", error.body || error);
    }
}

migrate();
