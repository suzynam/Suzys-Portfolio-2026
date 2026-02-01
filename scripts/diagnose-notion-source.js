const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
// The ID user gave (which seems to be a View or Wrapper)
const originalId = process.env.NOTION_DATABASE_ID;
// The ID found in data_sources
const sourceId = "2f92caa6-88a7-8071-bdb7-000b4afb6182";

async function diagnose() {
    console.log("Checking Source ID from data_sources: " + sourceId);
    try {
        const db = await notion.databases.retrieve({ database_id: sourceId });
        console.log("✅ Success! Source Database found.");
        console.log(`Title: ${db.title?.[0]?.plain_text || "Untitled"}`);

        if (db.properties) {
            console.log("✅ Properties found in Source DB!");
            console.log("Keys:", Object.keys(db.properties));
            console.log("\nRECOMMENDATION: Use this Source ID in .env.local!");
        } else {
            console.log("❌ Still no properties in Source DB.");
        }
    } catch (error) {
        console.error("❌ Failed to retrieve Source Database:", error.message);
    }
}

diagnose();
