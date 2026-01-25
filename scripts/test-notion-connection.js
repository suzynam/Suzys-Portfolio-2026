const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

async function testConnection() {
    console.log('Testing Notion connection via blocks.children.list...');
    try {
        const response = await notion.blocks.children.list({
            block_id: process.env.NOTION_DATABASE_ID,
        });

        console.log('Successfully listed children!');
        console.log(`Found ${response.results.length} items.`);
        if (response.results.length > 0) {
            console.log('First item type:', response.results[0].type);
        }
    } catch (error) {
        console.error('Connection failed:', error.body || error.message);
    }
}

testConnection();
