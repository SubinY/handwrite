"use client";

import { Form, Input, Select, Button } from "antd";
import Image from "next/image";
import { useTransferContext } from "../../context";
import useBound from "./useBound";
import "./index.css";
import { useEffect } from "react";

const FormItem = Form.Item;

export const RenderArea = () => {
  const [form] = Form.useForm();
  const { formV, setFormV } = useTransferContext();
  const { setBoundPos, bounds } = useBound("renderArea");

  useEffect(() => {
    if (formV && bounds[0] && setBoundPos) {
      for (let key in formV) {
        setBoundPos(key, formV);
      }
    }
  }, [formV, bounds[0], setBoundPos]);

  return (
    <div className="flex justify-center flex-wrap">
      <Form
        className="flex justify-center"
        layout="horizontal"
        form={form}
        initialValues={formV}
        variant="filled"
      >
        <FormItem label="上边距" name="top">
          <Input className="!w-[50px] !mr-1" />
        </FormItem>
        <FormItem label="左边距" name="left">
          <Input className="!w-[50px] !mr-1" />
        </FormItem>
        <FormItem label="下边距" name="bottom">
          <Input className="!w-[50px] !mr-1" />
        </FormItem>
        <FormItem label="右边距" name="right">
          <Input className="!w-[50px]" />
        </FormItem>
      </Form>
      <div id="renderArea" className="h-full min-w-[500px]">
        <Image
          alt="logo"
          src="/imgs/A4本子.jpg"
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
