"use client";

import { Form, InputNumber, Select, Button } from "antd";
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
  console.log(formV, 'ffffffffff')
  useEffect(() => {
    if (formV && bounds[0] && setBoundPos) {
      for (let key in formV) {
        setBoundPos(key, formV);
      }
    }
  }, [formV, bounds[0], setBoundPos]);

  const handleFieldsChange = (changedFields: any) => {
    const { name, value } = changedFields[0];
    setFormV({ ...formV, [name[0]]: value });
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
