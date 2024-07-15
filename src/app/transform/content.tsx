"use client";

import { ConfigForm } from "./_components/ConfigForm";
import { RenderArea } from "./_components/RenderArea/index";
import TransferContext from "./context";
import { FormValueType } from "./types";
import { useMemo, useState } from "react";

const A4SIZE = 1.414;

const defaultWH = {
  pageW: 700,
  pageH: 700 * A4SIZE,
};

export function TransferContent() {
  const [formV, setFormV] = useState<FormValueType>({
    font: "/fonts/云烟体.ttf",
    inputText: "",
    pageSize: defaultWH,
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
  });

  const providerValue = useMemo(
    () => ({
      formV,
      setFormV,
    }),
    [formV]
  );

  return (
    <TransferContext.Provider value={providerValue}>
      <div className="h-screen z-10 container flex p-4">
        <div className="h-full min-w-[500px] p-4 border-r border-solid border-stone-400">
          <p className="h-8 mb-2 text-center font-bold text-2xl">页面设置</p>
          <ConfigForm />
        </div>
        <div className="h-[750px] p-4 flex flex-1 justify-center">
          <RenderArea />
        </div>
      </div>
    </TransferContext.Provider>
  );
}
