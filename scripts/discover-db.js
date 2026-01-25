const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

async function listDatabases() {
    try {
        console.log('Searching for items accessible by this integration...');
        const response = await notion.search({
            sort: {
                direction: 'descending',
                timestamp: 'last_edited_time'
            }
        });

        console.log(`Found ${response.results.length} results.`);

        const dbs = response.results.filter(item => item.object === 'database');
        console.log(`Found ${dbs.length} databases:`);
        dbs.forEach(db => {
            const title = db.title?.[0]?.plain_text || 'Untitled';
            console.log(`- Title: ${title}`);
            console.log(`  ID: ${db.id.replace(/-/g, '')}`);
        });

        if (dbs.length === 0) {
            console.log('\nShowing recent pages instead:');
            response.results.slice(0, 5).forEach(page => {
                const title = page.properties?.Name?.title?.[0]?.plain_text ||
                    page.properties?.Title?.title?.[0]?.plain_text ||
                    'Untitled';
                console.log(`- Page: ${title} (ID: ${page.id.replace(/-/g, '')})`);
                if (page.parent.type === 'database_id') {
                    console.log(`  Parent DB ID: ${page.parent.database_id.replace(/-/g, '')}`);
                }
            });
        }
    } catch (error) {
        console.error('Search failed:', error.message);
    }
}

listDatabases();
