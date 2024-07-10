"use client";

import { InputNumber } from "antd";
import React, { useState } from "react";
import { PageWH } from "../types";

interface PriceInputProps {
  id?: string;
  value?: PageWH;
  onChange?: (value: PageWH) => void;
}

export const PageSize: React.FC<PriceInputProps> = (props) => {
  const { id, value = {}, onChange } = props;

  const handleWidthChange = (v: any) => {
    onChange?.({ ...value, pageW: v });
  };

  const handleHeightChange = (v: any) => {
    onChange?.({ ...value, pageH: v });
  };

  return (
    <div>
      <InputNumber
        step="1"
        min="100"
        max="2000"
        defaultValue={value.pageW}
        onChange={handleWidthChange}
        style={{ width: 100 }}
      />
      x
      <InputNumber
        step="1"
        min="100"
        max="2000"
        defaultValue={value.pageH}
        onChange={handleHeightChange}
        style={{ width: 100 }}
      />
    </div>
  );
};
