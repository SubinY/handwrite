"use client";

import { ConfigForm } from "@/components/edit/ConfigForm";
import { RenderArea } from "@/components/edit/RenderArea/index";
import type { FormValueType } from "@/components/edit/types";
import { useMemo, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { CropperList } from "./_components/CropperList";

const { TabPane } = Tabs;

const A4SIZE = 1.414;

const defaultWH = {
  pageW: 700,
  pageH: 700 * A4SIZE,
};

export function CustomContent() {
  const [formV, setFormV] = useState<FormValueType>({
    font: "/fonts/云烟体.ttf",
    inputText: "",
    pageSize: defaultWH,
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
    fontSize: 30,
    horizontalSpace: 4,
    verticalSpace: 9.5,
    chaos: 10,
    offset: 0,
  });

  const providerValue = {
    formV,
    setFormV,
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div className="h-screen z-10 container flex p-4">
      <div className="h-full min-w-[500px] p-4 border-r border-solid border-stone-400">
        <Tabs defaultActiveKey="crop">
          <TabPane tab="书写区域" key="crop">
            <CropperList />
          </TabPane>
          <TabPane tab="全局设置" key="global">
            <ConfigForm {...providerValue} />
          </TabPane>
        </Tabs>
      </div>
      <div className="h-[750px] p-4 flex flex-1 justify-center">
        <RenderArea {...providerValue} />
      </div>
    </div>
  );
}
