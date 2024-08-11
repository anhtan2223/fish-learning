import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import AntdTheme from "@/app/antdThemeProvider"



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fish"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <AntdTheme>
            <Provider>
              <AntdRegistry>
                {children}
              </AntdRegistry>
            </Provider>
          </AntdTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
