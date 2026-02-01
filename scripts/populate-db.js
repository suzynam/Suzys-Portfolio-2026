const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
// Also try the Source ID if the View ID fails
const sourceId = "89535d8a-3876-40df-a073-a78380ff056e";

// Data from Screenshot
const items = [
    {
        name: "Portfolio Summary",
        desc: "", // Empty in screenshot
        tag: null,
        timeline: ""
    },
    {
        name: "Team Lead & System Design",
        desc: "240억 매출을 견인하는 코드잇 교육 경험팀의 리드로써 구축한 교육 운영 시스템",
        tag: "System",
        timeline: "2025 - current"
    },
    {
        name: "AI-Powered Builder",
        desc: "기획부터 개발까지 혼자 수행하여 매출을 만들고 있는 AI 기반 자기이해 서비스",
        tag: "AI Dev",
        timeline: "2025 - current"
    },
    {
        name: "AI & Design Lectures",
        desc: "만족도 4.8+, 500명 이상의 현업자와 소통하며 나눈 생성형 AI 및 디자인 지식",
        tag: "Education",
        timeline: "2024 - current"
    },
    {
        name: "Curriculum & Content Creating",
        desc: "코드잇 디자인 부트캠프의 전체 여정을 설계하고 콘텐츠로 구현한 경험",
        tag: "Content",
        timeline: "2024 - 2025"
    },
    {
        name: "Community Building & Partnership",
        desc: "1년 만에 국내 주요 블록체인 3개 컨퍼런스와 파트너십을 체결한 '디자인 다오' 설립 및 운영기",
        tag: "Community",
        timeline: "2022 - 2023"
    },
    {
        name: "Product Design: Web3 Social Identity Protocol",
        desc: "117K NFT Badges Changing Web3 World, Noox👑",
        tag: "Design",
        timeline: "2022 - 2024"
    }
];

async function populate(targetId) {
    console.log(`\nAttempting to populate Database ID: ${targetId}...`);

    for (const item of items) {
        try {
            console.log(`Creating: "${item.name}"...`);

            // Construct properties safely (Only Name exists)
            const properties = {
                Name: { title: [{ text: { content: item.name } }] }
            };

            // Write details to Page Blocks since we can't create properties on Linked View
            const children = [
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: { rich_text: [{ text: { content: 'Details' } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: `**Description**: ${item.desc || "(None)"}` } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: `**Tag**: ${item.tag || "(None)"}` } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: `**Timeline**: ${item.timeline || "(None)"}` } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: '---' } }] }
                },
                // Add some dummy lorem ipsum content as requested (500 chars)
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ text: { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." } }] }
                }
            ];

            await notion.pages.create({
                parent: { database_id: targetId },
                properties: properties,
                children: children
            });
            console.log("✅ Success!");
        } catch (error) {
            console.error(`❌ Failed: ${error.message}`);
            if (error.code === 'object_not_found') {
                console.log("Aborting this ID.");
                return false;
            }
        }
    }
    return true;
}

async function run() {
    // Try View ID first
    let success = await populate(databaseId);

    // If View ID failed completely, try Source ID
    if (!success) {
        console.log("\n⚠️ View ID failed. Trying Source ID...");
        await populate(sourceId);
    }
}

run();
