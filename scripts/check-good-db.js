const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const dbId = "289da502-7904-4f5d-a47a-13b62cca657a";

async function check() {
    try {
        const db = await notion.databases.retrieve({ database_id: dbId });
        console.log(`Checking Latest Created DB (${dbId})...`);
        console.log(`Title: ${db.title?.[0]?.plain_text}`);
        console.log(`In Trash: ${db.in_trash}`);
        console.log(`URL: ${db.url}`);
    } catch (e) {
        console.log(e);
    }
}
check();
