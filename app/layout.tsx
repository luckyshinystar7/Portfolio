import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutHeader from "./layoutHeader";
import Script from "next/script";
import { setDarkMode } from "@/public/scripts/darkMode";
import QueryProvider from "@/utils/queryProvider";
import ContactInfo from "./contact/ContactInfo";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NameSlider = () => (
    <div className="flex flex-col gap-28 items-center">
      <div className="text-6xl">Wei</div>
      <div className="rotate-270 text-9xl">Frank</div>
    </div>
  );

  const NAME_REPEATS = 6;

  return (
    <html lang="en">
      {/* <div id="wrapper" className="absolute top-0 min-h-screen grid grid-flow-row grid-cols-6">
        {[...Array(NAME_REPEATS)].map((e, i) => (
          <NameSlider key={i} />
        ))}
      </div> */}
      <head>
        <Script
          id="setDarkMode"
          type="text/javascript"
          strategy="beforeInteractive"
        >
          {setDarkMode}
        </Script>
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <div className="fixed top-0 left-0 right-0 max-w-[1440px] w-full mx-auto px-2">
            <LayoutHeader />
          </div>
          <div className="min-h-screen max-w-[1440px] px-8 md:px-12 mx-auto">
            {children}
          </div>
          <footer
            id="contact"
            className="border-t-2 border-slate-100 dark:border-slate-400"
          >
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col gap-2">
                <h4>Let&apos;s Connect!</h4>
                <div>Reach out to me on:</div>
                <div className="flex flex-row gap-4">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}