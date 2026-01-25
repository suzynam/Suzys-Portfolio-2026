export const revalidate = 60;

export async function GET() {
    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) {
        return Response.json({ error: '환경 변수가 설정되지 않았습니다.' }, { status: 400 });
    }

    try {
        console.log('Fetching from Notion via direct fetch API...');

        // Using direct fetch to avoid SDK bundling issues with Turbopack
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
                        timestamp: 'last_edited_time',
                        direction: 'descending',
                    },
                ],
            }),
            next: { revalidate: 60 } // Cache results for 60 seconds
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Notion API error: ${response.status}`);
        }

        const data = await response.json();

        const projects = data.results.map((page: any) => {
            const p = page.properties;

            const title = p.Name?.title?.[0]?.plain_text ||
                p.Title?.title?.[0]?.plain_text ||
                '제목 없음';

            const category = p.Tag?.select?.name ||
                p.Category?.select?.name ||
                'Project';

            const summary = p.Description?.rich_text?.[0]?.plain_text ||
                p.Summary?.rich_text?.[0]?.plain_text ||
                '';

            let coverImage = null;
            if (page.cover) {
                coverImage = page.cover.external?.url || page.cover.file?.url;
            }

            return {
                id: page.id,
                title,
                category,
                summary,
                coverImage,
                date: page.last_edited_time
            };
        });

        return Response.json({ data: projects });
    } catch (error: any) {
        console.error('Notion Direct Fetch Error:', error);
        return Response.json({
            error: '노션 데이터를 가져오는 중 오류가 발생했습니다.',
            details: error.message
        }, { status: 500 });
    }
}
