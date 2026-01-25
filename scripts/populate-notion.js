const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

const projects = [
    {
        title: "Product Design: From SI to Web3 Startup",
        category: "Design",
        summary: "6년간 대기업 SI부터 스타트업 초기 멤버까지, 제품의 시작과 성장을 이끈 디자인 여정",
        content: `6년 전 대기업 SI 계열사에서 커리어를 시작하며 블록체인 DID, 스마트 물류, 전기차 배터리 관리 플랫폼 등 고도의 논리적 구조가 필요한 복잡한 도메인을 다루었습니다. 이후 블록체인 스타트업의 초기 멤버로 합류하여 제품의 0 to 1 단계를 설계하며, 디자인뿐만 아니라 GTM(Go-To-Market) 전략 수립과 데이터 기반의 UX 개선을 주도했습니다.

**Key Achievements:**
- 대기업 SI : 도메인 복잡도가 높은 B2B 플랫폼 UX/UI 설계 (DID, 물류 등)
- 스타트업 : 프로덕트 디자인 전체 리딩 및 브랜드 정체성 구축
- 비즈니스 기여 : 데이터 기반 가설 검증과 실험을 통해 UX 지표 개선`
    },
    {
        title: "Design DAO: Community Building & Partnership",
        category: "Community",
        summary: "1년 만에 국내 주요 블록체인 3개 컨퍼런스와 파트너십을 체결한 '디자인 다오' 설립 및 운영기",
        content: `지속 가능한 창작 생태계를 고민하며 '디자인 다오(Design DAO)'를 설립하고 운영해왔습니다. 설립 1년 만에 국내외 주요 블록체인 컨퍼런스(KBW 등)와 파트너십을 성공적으로 체결하며, 디자이너와 빌더들이 함께 성장할 수 있는 커뮤니티 거버넌스를 설계했습니다.

**Key Achievements:**
- 국내 주요 블록체인 컨퍼런스 3개소와 공식 파트너십 체결 및 운영
- 디자이너와 개발자를 위한 네트워킹 이벤트 및 워크숍 기획
- 커뮤니티 운영 시스템 및 멤버십 거버넌스 설계`
    },
    {
        title: "Next Generation Education: AI & Design Lectures",
        category: "Education",
        summary: "만족도 4.8+, 500명 이상의 현업자와 소통하며 나눈 생성형 AI 및 디자인 지식",
        content: `현업 디자이너와 실무자들을 대상으로 생성형 AI를 활용한 디자인 워크플로우 효율화와 업무 자동화 강의를 진행하고 있습니다. 수강생 누적 500명 이상을 기록하며 평균 만족도 4.8점을 유지하고 있으며, 매 강의 종료 후 높은 재강의 요청률을 기록하고 있습니다.

**Key Achievements:**
- 생성형 AI(Midjourney, ChatGPT 등) 활용 실무 디자인 강의 커리큘럼 설계
- 디자이너 및 기획자 대상 업무 자동화 워크숍 진행
- 교육 만족도 4.8/5.0 달성 및 지속적인 파트너십 강의 수주`
    },
    {
        title: "Curriculum Architect: Mapping Personalized Learning",
        category: "Content",
        summary: "코드잇 디자인 부트캠프의 전체 여정을 설계하고 콘텐츠로 구현한 경험",
        content: `단순한 지식 전달을 넘어, 학습자가 실제로 성장할 수 있는 학습 경험을 설계합니다. 코드잇의 디자인 커리큘럼 로드맵을 구축하고, 7개월 분량의 디자인 부트캠프 커리큘럼을 직접 설계했습니다. 텍스트 교안부터 영상 콘텐츠 제작까지 교육의 전 과정을 직접 리딩했습니다.

**Key Achievements:**
- 7개월 기간의 집중형 디자인 부트캠프 커리큘럼 전체 설계
- 실습 중심의 디자인 학습 콘텐츠 및 영상 제작
- 교육 타겟에 최적화된 학습 로직 및 평가 시스템 개발`
    },
    {
        title: "AI-Powered Builder: Self-Discovery Service",
        category: "AI Dev",
        summary: "기획부터 개발까지 혼자 수행하여 매출을 만들고 있는 AI 기반 자기이해 서비스",
        content: `아이디어를 제품으로 구현하는 속도를 극대화하기 위해 AI와 함께 빌딩합니다. '휴먼 디자인' 기반의 자기이해 서비스를 1인 기획/개발/운영하고 있으며, 프롬프트 엔지니어링과 UXUI 설계, AI API 연동을 통해 실질적인 매출을 창출하는 Full-cycle 빌딩 경험을 쌓고 있습니다.

**Key Achievements:**
- AI API를 활용한 맞춤형 데이터 생성 및 서비스 구현
- 1인 개발 기반의 프로덕트 런칭 및 수익화(Monetization) 달성
- 디자인 전문성을 살린 AI 프로덕트 UX 고도화`
    },
    {
        title: "Experience & System Design: Leading KDT Team",
        category: "System",
        summary: "240억 매출을 견인하는 코드잇 교육 경험팀의 리드로써 구축한 운영 시스템",
        content: `비즈니스의 성장은 견고한 시스템 위에서 가능합니다. 연 매출 240억 규모의 KDT 부트캠프 사업을 운영하는 교육 경험팀의 리드로서, HR부터 팀 RnR, 수강생-강사 접점의 경험 설계를 총괄했습니다. 특히 AX(AI Transformation)를 팀 운영에 도입하여 효율적인 업무 자동화 워크플로우를 구축했습니다.

**Key Achievements:**
- 240억 매출 규모의 대형 교육 사업 운영 및 팀 리딩
- AX 기반의 교육 운영 시스템 설계 및 효율 증대
- 교육 현장의 고객 경험(CX) 및 운영 정책 수립`
    }
];

async function populate() {
    console.log('Starting Notion population...');

    for (const project of projects) {
        try {
            console.log(`Creating: ${project.title}`);
            const response = await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    Name: {
                        title: [{ text: { content: project.title } }]
                    },
                    Tag: {
                        select: { name: project.category }
                    },
                    Description: {
                        rich_text: [{ text: { content: project.summary } }]
                    }
                },
                children: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        paragraph: {
                            rich_text: [{ text: { content: project.content } }]
                        }
                    }
                ]
            });
            console.log(`Success: ${response.id}`);
        } catch (error) {
            console.error(`Failed to create ${project.title}:`, error.message);
        }
    }
    console.log('All set!');
}

populate();
