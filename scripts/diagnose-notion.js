const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

console.log("--- Notion Connection Diagnosis ---");

async function diagnose() {
    try {
        console.log("\nGetting Database...");
        const db = await notion.databases.retrieve({ database_id: databaseId });
        console.log("DB Raw Keys:", Object.keys(db));
        // console.log("DB Properties:", JSON.stringify(db.properties, null, 2)); 

        if (db.properties) {
            console.log("Current Properties:", Object.keys(db.properties));
        } else {
            console.log("WARNING: db.properties is undefined!");
            console.log("Full DB Object:", JSON.stringify(db, null, 2));
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

diagnose();
