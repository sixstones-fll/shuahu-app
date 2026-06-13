import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "话术训练员",
  description: "AI 情景话术练习与测评工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#F5F5DC] font-sans">{children}</body>
    </html>
  );
}
