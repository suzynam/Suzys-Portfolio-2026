export const revalidate = 60;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const { NotionAPI } = require('notion-client');
        const { Client } = require('@notionhq/client');

        // Use unofficial API to get recordMap for react-notion-x
        const notion = new NotionAPI();
        const recordMap = await notion.getPage(id);

        // Use official API to get metadata
        const officialNotion = new Client({
            auth: process.env.NOTION_API_KEY,
        });

        const page = await officialNotion.request({
            path: `pages/${id}`,
            method: 'get',
        }) as any;

        const props = page.properties;
        const title = props.Name?.title?.[0]?.plain_text ||
            props.Title?.title?.[0]?.plain_text ||
            'Untitled Project';

        const category = props.Tag?.select?.name ||
            props.Category?.select?.name ||
            'Project';

        const summary = props.Description?.rich_text?.[0]?.plain_text ||
            props.Summary?.rich_text?.[0]?.plain_text ||
            '';

        const date = props.Date?.date?.start || page.created_time;

        let coverImage = null;
        if (page.cover) {
            coverImage = page.cover.external?.url || page.cover.file?.url;
        }

        return Response.json({
            data: {
                id,
                title,
                category,
                summary,
                date,
                coverImage,
                recordMap, // Return recordMap for react-notion-x
            }
        });
    } catch (error: any) {
        console.error('Project Detail API Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
