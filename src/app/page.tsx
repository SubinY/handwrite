import AnimatedSvgComponent from "@/components/AnimatedSvgComponent";
import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import { PreviewImage } from "@/components/shared/previewImage";
import { siteConfig } from "@/config/site";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  return (
    <>
      <div
        className="w-full relative bg-cover bg-no-repeat pt-[100px]"
        style={{
          backgroundImage: `url(/imgs/background.jpg)`,
          minHeight: "100vh",
        }}
      >
        <h2
          className="mt-10 mb-8 animate-fade-up text-white text-center font-display text-4xl opacity-0 font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "1s", animationFillMode: "forwards" }}
        >
          <Balancer>这里只允许手写</Balancer>
        </h2>
        <div className="z-10 w-full px-5 xl:px-0">
          <p
            className="mb-6 animate-fade-up text-center text-white opacity-0 sm:text-2xl text-[14px]"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            {siteConfig.description.map((item, index) => (
              <Balancer className="!block" key={index}>
                {item}
              </Balancer>
            ))}
          </p>
          <div
            className="animate-fade-up opacity-0 mx-auto flex items-center justify-center"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <AnimatedSvgComponent
              height={60}
              width={200}
              titleSize="text-2xl"
              titleText="立即抄写"
              paragraphSize="text-xs"
              paragraphText=""
              paragraphLink="/transform"
            />
          </div>
        </div>
      </div>
      <h3
        className="mt-10 mb-2 animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl opacity-0 font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <Balancer>我能做什么</Balancer>
      </h3>
      <div className="grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, href, description, demo }) => (
          <Card
            key={title}
            href={href}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
          />
        ))}
      </div>
    </>
  );
}

const features = [
  {
    title: "在空白纸上书写",
    href: "/transform",
    description: `内置多种尺寸纸张，一键生成手写样式文稿，可以根据自己的书写习惯进行调整，生成独一无二的抄写文稿`,
    demo: (
      // <div className="flex items-center justify-center space-x-20">
      //   <Image alt="logo" src="/tailwindcss.svg" width={50} height={50} />
      // </div>
      <PreviewImage
        alt="白纸手写"
        src="/imgs/pic_kongbai1.jpg"
        width={150}
        height={150}
      />
    ),
  },
  {
    title: "指定多个区域书写",
    href: "/custom",
    description: `上传自定义图片，指定书写区域，一键生成你的专属手写文稿`,
    demo: (
      // <div className="flex items-center justify-center space-x-20">
      //   <Image alt="logo" src="/tailwindcss.svg" width={50} height={50} />
      // </div>
      <PreviewImage
        alt="区域手写"
        src="/imgs/pic_pdf.jpg"
        width={150}
        height={150}
      />
    ),
  },
];
