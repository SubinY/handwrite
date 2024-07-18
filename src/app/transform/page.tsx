import { siteConfig } from "@/config/site";
import { TransferContent } from "./content";

export const metadata = {
  title: "快速转换手写",
  description: "transform the page by handwriting",
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
};

export default async function TransformPage() {
  return <TransferContent />;
}
