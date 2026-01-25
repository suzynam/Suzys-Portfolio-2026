const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const DB_ID = process.env.NOTION_DATABASE_ID;

async function inspectDatabase() {
    console.log('Inspecting Database...');

    // Method 1: Search for pages whose parent is this database
    try {
        const response = await notion.search({
            filter: {
                value: 'page',
                property: 'object'
            },
            sort: {
                direction: 'descending',
                timestamp: 'last_edited_time'
            }
        });

        // Filter results client-side for our specific DB if search returns everything
        // (Search works globally on the workspace usually)
        const ourDbItems = response.results.filter(
            item => item.parent.type === 'database_id' &&
                item.parent.database_id.replace(/-/g, '') === DB_ID.replace(/-/g, '')
        );

        console.log(`Search found ${response.results.length} total pages.`);
        console.log(`Found ${ourDbItems.length} pages in target database.`);

        if (ourDbItems.length > 0) {
            const sample = ourDbItems[0];
            console.log('Sample Item Properties:', JSON.stringify(sample.properties, null, 2));
        } else {
            console.log('No items found in this database via Search.');
        }

    } catch (error) {
        console.error('Inspection failed:', error.body || error.message);
    }
}

inspectDatabase();
