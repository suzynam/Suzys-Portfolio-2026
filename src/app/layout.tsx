import type { Metadata } from "next";
// import localFont from "next/font/local"; // Not using local fonts for now, using Google Fonts via CDN for simplicity as per original, or we could use next/font/google
import "./globals.css";

export const metadata: Metadata = {
  title: "Suzy Nam | Connecting Design, Systems, and AI",
  description: "디자인과 시스템, 그리고 AI를 통한 배움을 연결합니다. 6년의 프로덕트 디자인, 팀 리딩, 그리고 AI 개발 경험을 바탕으로 새로운 가치를 설계합니다.",
  openGraph: {
    title: "Suzy Nam | Multidisdisciplinary System Builder",
    description: "Connecting Design, Systems, and Learning through AI. Explore the journey of a Product Designer, Educator, and System Builder.",
    url: 'https://suzys-portfolio-2026.vercel.app',
    siteName: "Suzy Nam Portfolio",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Suzy Nam Portfolio Preview',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Suzy Nam | Design, Systems, and AI",
    description: "Multidisciplinary expertise in product design, education systems, and AI development.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Fonts - Using direct link for identical rendering to static site for now */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
