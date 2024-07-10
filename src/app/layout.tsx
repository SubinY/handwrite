import BaiDuAnalytics from "@/app/BaiDuAnalytics";
import GoogleAnalytics from "@/app/GoogleAnalytics";
import { ThemeProvider } from "@/components/ThemedButton";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import "@/styles/antd.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({
  src: "../../public/fonts/云烟体.woff",
  display: "auto",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  // manifest: `${siteConfig.url}/site.webmanifest`,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
};

// 全局配置的主题色
const theme = {
  primaryColor: "red", // 全局的主要字体颜色
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={`${inter.className}`}>
        <GoogleAnalytics />
        <BaiDuAnalytics />
        <ThemeProvider>
          <ConfigProvider theme={{ token: { colorPrimary: "blue" } }}>
            <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-indigo-800 dark:via-gray-900 dark:to-cyan-800" />
            <Nav />
            <main className="flex min-h-screen w-full flex-col items-center justify-center py-16">
              <AntdRegistry>{children}</AntdRegistry>
            </main>
            <Footer />
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
