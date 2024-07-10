import { SiteConfig } from "@/types"

const baseSiteConfig = {
  name: "手抄作业",
  description: ["在线生成模拟手写文稿，让打印的字看起来和手写的一样", "一键快速搞定文字抄写任务"],
  url: "https://nextjs.weijunext.com",
  metadataBase: new URL("https://nextjs.weijunext.com"),
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Client Components",
    "next-auth",
    "Upstash",
    "Redis",
    "Prisma",
    "Postgres",
    "Docker",
    "Contentlayer",
  ],
  authors: [
    {
      name: "weijunext",
      url: "https://weijunext.com",
    }
  ],
  creator: '@weijunext',
  themeColor: '#fff',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  ogImage: "https://nextjs.weijunext.com/og.jpg",
  links: {
    twitter: "https://twitter.com/weijunext",
    github: "https://github.com/weijunext/nextjs-learn-demos",
  },
  footerProduct: [
    { url: 'https://weijunext.com/', name: 'J实验室' },
    { url: 'https://smartexcel.cc/', name: 'Smart Excel' },
    { url: 'https://landingpage.weijunext.com/', name: 'Landing Page Boilerplate' },
    { url: 'https://nextjs.weijunext.com/', name: 'Next.js Practice' },
    { url: 'https://starter.weijunext.com/', name: 'Next.js Starter' },
    { url: 'https://githubbio.com', name: 'Github Bio Generator' },
    { url: 'https://github.com/weijunext/indie-hacker-tools', name: 'Indie Hacker Tools' },
  ]
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description[0],
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description[0],
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
