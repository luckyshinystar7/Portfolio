import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutHeader from "./layoutHeader";
import Script from "next/script";
import { setDarkMode } from "@/public/scripts/darkMode";
import QueryProvider from "@/utils/queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frank's Portfolio",
  description: "Frank Wei's Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="setDarkMode"
          type="text/javascript"
          strategy="beforeInteractive"
        >
          {setDarkMode}
        </Script>
        <title>Frank Wei | Portfolio</title>
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <LayoutHeader />
          <div id="root" className="breakpoint-x overflow-hidden">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
