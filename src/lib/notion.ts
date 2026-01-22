import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY) {
    throw new Error('Missing NOTION_API_KEY environment variable');
}

if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('Missing NOTION_DATABASE_ID environment variable');
}

export const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

export const databaseId = process.env.NOTION_DATABASE_ID;

export async function getDatabaseItems() {
    try {
        // Using blocks.children.list as databases.query is unavailable in this version
        // Note: This returns children of the database block (pages) but without advanced filtering/sorting
        const response = await notion.blocks.children.list({
            block_id: databaseId,
        });
        return response.results;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        return [];
    }
}

export async function getDatabaseMetadata() {
    try {
        const response = await notion.databases.retrieve({
            database_id: databaseId,
        });
        return response;
    } catch (error) {
        console.error('Error fetching database metadata:', error);
        return null;
    }
}
