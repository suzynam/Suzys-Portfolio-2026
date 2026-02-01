const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const dbId = process.env.NOTION_DATABASE_ID;
const fetch = global.fetch;

async function request(path, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
    };
    if (body) options.body = JSON.stringify(body);

    const url = `https://api.notion.com/v1/${path}`;
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`API ${path} failed: ${res.status} ${await res.text()}`);
    }
    return res.json();
}

async function addProject() {
    console.log(`Creating 'LG CNS UXUI Design' in DB: ${dbId}...`);

    try {
        await request("pages", "POST", {
            parent: { database_id: dbId },
            properties: {
                Name: {
                    title: [{ text: { content: "LG CNS UXUI Design" } }]
                },
                Category: {
                    select: { name: "Design" }
                },
                Summary: {
                    rich_text: [{ text: { content: "2019년부터 3년 간, 다양한 도메인의 대형 프로젝트 UXUI 디자인 및 기획을 수행" } }]
                },
                Date: {
                    date: { start: "2019-01-01" }
                }
            },
            children: [
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: "**Timeline**: 2019 - 2021 (3 Years)" } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: "다양한 도메인의 대형 프로젝트 UXUI 디자인 및 기획을 수행했습니다." } }] }
                }
            ]
        });
        console.log("✅ Successfully added LG CNS project!");
    } catch (e) {
        console.error("❌ Failed:", e.message);
    }
}

addProject();
