const { Client } = require('@notionhq/client');

async function test() {
    const notion = new Client({
        auth: process.env.NOTION_API_KEY,
    });
    const databaseId = process.env.NOTION_DATABASE_ID;

    try {
        const response = await notion.request({
            path: `databases/${databaseId}/query`,
            method: 'post',
        });
        console.log('Total items:', response.results.length);
        if (response.results.length > 0) {
            console.log('Properties:', Object.keys(response.results[0].properties));
            // Print properties of the first few items to see Categories
            response.results.slice(0, 5).forEach((item, i) => {
                console.log(`Item ${i} Properties:`, JSON.stringify(item.properties, null, 2));
            });
        }
    } catch (e) {
        console.error(e);
    }
}

test();
