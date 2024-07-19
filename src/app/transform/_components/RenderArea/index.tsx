"use client";

import { Form, InputNumber, Select, Button } from "antd";
import Image from "next/image";
import { useTransferContext } from "../../context";
import useBound from "./useBound";
import "./index.css";
import { useCallback, useEffect } from "react";

const FormItem = Form.Item;

export const RenderArea = () => {
  const [form] = Form.useForm();
  const { formV, setFormV } = useTransferContext();
  const { setBoundPos, bounds } = useBound("renderArea");

  useEffect(() => {
    if (bounds?.length) setFormVFn();
  }, [bounds]);

  const setFormVFn = useCallback(() => {
    let top = 0,
      left = 0,
      right = 0,
      bottom = 0;
    bounds.forEach((item, index) => {
      switch (index) {
        case 0:
          top = item.offsetTop;
          form.setFieldValue("top", item.offsetTop);
          break;
        case 1:
          right =
            // @ts-ignore
            item.parentNode.getBoundingClientRect().width - item.offsetLeft;
          form.setFieldValue(
            "right",
            // @ts-ignore
            item.parentNode.getBoundingClientRect().width - item.offsetLeft
          );
          break;
        case 2:
          bottom =
            // @ts-ignore
            item.parentNode.getBoundingClientRect().height - item.offsetTop;
          form.setFieldValue(
            "bottom",
            // @ts-ignore
            item.parentNode.getBoundingClientRect().height - item.offsetTop
          );
          break;
        case 3:
          left = item.offsetLeft;
          form.setFieldValue("left", item.offsetLeft);
      }
    });
    setFormV({ ...formV, top, left, right, bottom });
  }, [formV, bounds]);

  useEffect(() => {
    console.log(formV.bgUrl, "formV.bgUrl");
  }, [formV.bgUrl]);

  const handleFieldsChange = (changedFields: any) => {
    const { name, value } = changedFields[0];
    const tempFormV = { ...formV, [name[0]]: value };
    setFormV(tempFormV);
    for (let key in tempFormV) {
      if (["left", "top", "right", "bottom"].includes(key)) {
        setBoundPos(key, tempFormV);
      }
    }
  };

  return (
    <div className="flex justify-center flex-wrap">
      <Form
        className="flex justify-center"
        layout="horizontal"
        form={form}
        initialValues={formV}
        variant="filled"
        onFieldsChange={handleFieldsChange}
      >
        <FormItem label="上边距" name="top">
          <InputNumber className="!w-[60px] !mr-1" />
        </FormItem>
        <FormItem label="左边距" name="left">
          <InputNumber className="!w-[60px] !mr-1" />
        </FormItem>
        <FormItem label="下边距" name="bottom">
          <InputNumber className="!w-[60px] !mr-1" />
        </FormItem>
        <FormItem label="右边距" name="right">
          <InputNumber className="!w-[60px]" />
        </FormItem>
      </Form>
      <div id="renderArea" className="h-full min-w-[500px]">
        <Image
          alt="logo"
          id="canvas_bg"
          src={formV.bgUrl ? formV.bgUrl : "/imgs/A4本子.jpg"}
          width={480}
          height={480 * 1.414}
          style={{
            width: "500px",
            // objectFit: "fill",
          }}
        />
      </div>
    </div>
  );
};
