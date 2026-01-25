import type { Metadata } from "next";
// import localFont from "next/font/local"; // Not using local fonts for now, using Google Fonts via CDN for simplicity as per original, or we could use next/font/google
import "./globals.css";

export const metadata: Metadata = {
  title: "Suzy Nam | Product Designer to AI Solopreneur",
  description: "디자인과 시스템, 그리고 AI를 연결합니다. 제품 디자이너에서 AI 솔로프러너로 진화하는 수지의 여정과 프로젝트를 확인해보세요.",
  openGraph: {
    title: "Suzy Nam | AI-Augmented Product Builder",
    description: "Product Designer turned AI Solopreneur. Building systems and products with design engineering and AI.",
    url: 'https://suzys-portfolio-2026.vercel.app',
    siteName: "Suzy Nam Portfolio",
    images: [
      {
        url: '/og-image.png', // public/og-image.png 파일이 필요합니다.
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
    title: "Suzy Nam | AI-Augmented Product Builder",
    description: "Product Designer turned AI Solopreneur. Building systems and products with design engineering and AI.",
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
