export const revalidate = 60;

export async function GET() {
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) return Response.json({ data: [] });

    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sorts: [
                    {
                        property: "Timeline",
                        direction: "descending"
                    }
                ]
            }),
            next: { revalidate: 60 }
        });

        const data = await response.json();

        // If 'Timeline' sort fails (e.g. property type mismatch), it might return an error. 
        // We'll handle data.results safely.
        const items = (data.results || []).map((page: any) => {
            const props = page.properties;
            const title = props.Name?.title?.[0]?.plain_text || props.Title?.title?.[0]?.plain_text || 'Untitled';
            const role = props.Role?.rich_text?.[0]?.plain_text || props.Position?.rich_text?.[0]?.plain_text || title;
            const period = props.Timeline?.rich_text?.[0]?.plain_text || props.Period?.rich_text?.[0]?.plain_text || props.Date?.date?.start || '202X';
            const description = props.Description?.rich_text?.[0]?.plain_text || props.Summary?.rich_text?.[0]?.plain_text || '';
            const category = props.Tag?.select?.name || props.Category?.select?.name || props.Type?.select?.name || 'General';

            return { id: page.id, title, role, period, description, category };
        });

        return Response.json({ data: items });
    } catch (error) {
        return Response.json({ data: [] });
    }
}
