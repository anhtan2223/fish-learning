import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'


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
          <Provider>
            <AntdRegistry>
              {children}
            </AntdRegistry>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
