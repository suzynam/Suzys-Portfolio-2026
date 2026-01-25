export const revalidate = 60;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const { Client } = require('@notionhq/client');
        const { NotionToMarkdown } = require('notion-to-md');

        const notion = new Client({
            auth: process.env.NOTION_API_KEY,
        });
        const n2m = new NotionToMarkdown({ notionClient: notion });

        // Add custom transformers for multi-column layout
        n2m.setCustomTransformer('column_list', async (block: any) => {
            return `<div class="notion-column-list">`;
        });
        n2m.setCustomTransformer('column', async (block: any) => {
            return `<div class="notion-column">`;
        });

        console.log('Fetching detail for page:', id);

        // 1. Get Page Metadata via request for maximum compatibility
        const page = await notion.request({
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

        // 2. Get Page Content as Markdown
        const mdblocks = await n2m.pageToMarkdown(id);
        const mdString = n2m.toMarkdownString(mdblocks);
        const content = mdString.parent || '';

        // Process all properties for the info grid
        const processedProperties: any = {};
        for (const [key, value] of Object.entries(props)) {
            const p = value as any;
            if (p.type === 'title') processedProperties[key] = p.title?.[0]?.plain_text;
            else if (p.type === 'rich_text') processedProperties[key] = p.rich_text?.[0]?.plain_text;
            else if (p.type === 'select') processedProperties[key] = p.select?.name;
            else if (p.type === 'multi_select') processedProperties[key] = p.multi_select?.map((s: any) => s.name);
            else if (p.type === 'date') {
                if (p.date?.end) {
                    processedProperties[key] = `${p.date.start} → ${p.date.end}`;
                } else {
                    processedProperties[key] = p.date?.start;
                }
            }
            else if (p.type === 'url') processedProperties[key] = p.url;
            else if (p.type === 'email') processedProperties[key] = p.email;
            else if (p.type === 'phoneNumber') processedProperties[key] = p.phoneNumber;
            else if (p.type === 'number') processedProperties[key] = p.number;
            else if (p.type === 'checkbox') processedProperties[key] = p.checkbox;
        }

        return Response.json({
            data: {
                id,
                title,
                category,
                summary,
                date,
                coverImage,
                properties: processedProperties,
                content: content.replace(/<div class="notion-column"><\/div>/g, '</div>')
                    .replace(/<div class="notion-column-list"><\/div>/g, '</div>')
                // notion-to-md often leaves them empty or unclosed depending on nesting
                // A better way is to use a more complex parser, but let's try this first.
            }
        });
    } catch (error: any) {
        console.error('Project Detail API Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
