const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function createDatabase() {
    console.log("1. Finding a parent page...");

    // Search for pages to use as parent
    const search = await notion.search({
        filter: { value: "page", property: "object" },
        sort: { direction: "descending", timestamp: "last_edited_time" }
    });

    if (search.results.length === 0) {
        console.error("❌ No accessible pages found. Cannot create a database without a parent page.");
        console.error("Please explicitly share at least one page with the 'Portfolio API' integration.");
        return;
    }

    // Try the second page if available, or fallback to first
    const parentPage = search.results.length > 1 ? search.results[1] : search.results[0];
    console.log(`✅ Using parent page: "${parentPage.properties?.title?.title?.[0]?.plain_text || "Untitled"}" (ID: ${parentPage.id})`);

    try {
        console.log("2. Creating new Database...");
        const newDb = await notion.databases.create({
            parent: {
                type: "page_id",
                page_id: parentPage.id,
            },
            title: [
                {
                    type: "text",
                    text: {
                        content: "Colorchip Portfolio DB (New)",
                    },
                },
            ],
            properties: {
                Name: {
                    title: {},
                },
                Description: {
                    rich_text: {},
                },
                Tag: {
                    select: {
                        options: [
                            { name: "System", color: "red" },
                            { name: "AI Dev", color: "blue" },
                            { name: "Education", color: "yellow" },
                            { name: "Content", color: "purple" },
                            { name: "Community", color: "orange" },
                            { name: "Design", color: "pink" }
                        ],
                    },
                },
                Timeline: {
                    rich_text: {},
                },
            },
        });

        console.log("✅ Database Created Successfully!");
        console.log("------------------------------------------------");
        console.log(`NEW DATABASE ID: ${newDb.id}`);
        console.log(`URL: ${newDb.url}`);

        if (newDb.properties) {
            console.log("Properties created:", Object.keys(newDb.properties));
        } else {
            console.log("WARNING: No properties returned! Is this a Linked View?");
            if (newDb.data_sources) console.log("Data Sources:", newDb.data_sources);
        }

        console.log("------------------------------------------------");
        console.log("Make sure to update .env.local with this new ID.");

    } catch (error) {
        console.error("❌ Failed to create database:", error.body || error);
    }
}

createDatabase();
