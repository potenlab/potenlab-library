import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { DashboardLayout } from "@potenlab/ui";
import { AppSidebar } from "@/components/layouts/app-sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Potenlab Admin",
  description: "Potenlab Admin User Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <DashboardLayout sidebar={<AppSidebar />}>{children}</DashboardLayout>
      </body>
    </html>
  );
}
