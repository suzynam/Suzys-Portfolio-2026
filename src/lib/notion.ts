import { Client } from '@notionhq/client';

const notionClient = new Client({
    auth: process.env.NOTION_API_KEY,
});

export const notion = notionClient;
export const databaseId = process.env.NOTION_DATABASE_ID;
