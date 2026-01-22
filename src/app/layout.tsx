import type { Metadata } from "next";
// import localFont from "next/font/local"; // Not using local fonts for now, using Google Fonts via CDN for simplicity as per original, or we could use next/font/google
import "./globals.css";

export const metadata: Metadata = {
  title: "User Name | AI-Augmented Product Builder",
  description: "Product Designer turned AI Solopreneur. Building systems and products with design engineering and AI.",
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
