import { siteConfig } from "@/config/site";
import { CustomContent } from "./content";

export const metadata = {
  title: "自定义书写区域",
  description: "transform the page by handwriting",
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
};

export default async function CustommPage() {
  return <CustomContent />;
}
