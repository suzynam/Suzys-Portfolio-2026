const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function updateSchema() {
    console.log("Updating Notion Database Schema...");
    console.log(`Database ID: ${databaseId}`);

    try {
        const response = await notion.databases.update({
            database_id: databaseId,
            properties: {
                // "Title" property is usually default as "Name" or "title", but we will try to add/update aliases
                "Category": {
                    select: {
                        options: [
                            { name: "Project", color: "blue" },
                            { name: "Design", color: "purple" },
                            { name: "Education", color: "red" },
                            { name: "Development", color: "green" }
                        ],
                    },
                },
                "Summary": {
                    rich_text: {},
                },
                "Date": {
                    date: {},
                },
                // "Description" is an alias for Summary in the code, but let's stick to one primary name "Summary"
                // "Tag" is an alias for Category, we stick to "Category"
                // Title is "Name" by default in new DBs usually.
            },
        });
        console.log("Schema updated successfully!");
        console.log(JSON.stringify(response.properties, null, 2));
    } catch (error) {
        console.error("Error updating schema:", error.body || error);
    }
}

updateSchema();
