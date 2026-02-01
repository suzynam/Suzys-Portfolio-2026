const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function listDatabases() {
    console.log("Searching for accessible items...");
    try {
        // Searching without filter first to see what we have
        const response = await notion.search({
            sort: {
                direction: "descending",
                timestamp: "last_edited_time",
            },
        });

        const dbs = response.results.filter(item => item.object === 'database');
        const pages = response.results.filter(item => item.object === 'page');

        console.log(`\nFound ${dbs.length} database(s) and ${pages.length} page(s).`);

        console.log("\n--- DATABASES ---");
        dbs.forEach((db) => {
            console.log(`[Database] Title: ${db.title?.[0]?.plain_text || "Untitled"}`);
            console.log(`ID: ${db.id}`);
            console.log(`URL: ${db.url}`);
            console.log(`Properties: ${db.properties ? Object.keys(db.properties).join(", ") : "None"}`);
            console.log("------------------------------------------------");
        });

        console.log("\n--- PAGES (Possible Wrappers) ---");
        pages.forEach((page) => {
            // Check if page has title
            const titleProp = page.properties?.title || page.properties?.Name || page.properties?.Title;
            const title = titleProp?.title?.[0]?.plain_text || "Untitled Page";

            console.log(`[Page] Title: ${title}`);
            console.log(`ID: ${page.id}`);
            console.log(`URL: ${page.url}`);
            console.log("------------------------------------------------");
        });

    } catch (error) {
        console.error("Error searching:", error);
    }
}

listDatabases();
