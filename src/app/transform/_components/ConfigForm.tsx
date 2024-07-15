"use client";

import { Form, Input, Select, Button } from "antd";
import opentype from "opentype.js";
import { useTransferContext } from "../context";
import { FormValueType } from "../types";
import { PageSize } from "./PageSize";
import { useState } from "react";
import useDraw from "./RenderArea/useDraw";

const { TextArea } = Input;
const { Option } = Select;

const FormItem = Form.Item;

const FontOptions = [
  {
    label: "hy.ttf",
    value: "/fonts/hy.ttf",
  },
  {
    label: "云烟体.ttf",
    value: "/fonts/云烟体.ttf",
  },
  {
    label: "李国夫手写体.ttf",
    value: "/fonts/李国夫手写体.ttf",
  },
  {
    label: "青叶手写体.ttf",
    value: "/fonts/青叶手写体.ttf",
  },
];

const fileReader = (input: any) => {
  let url = window.URL.createObjectURL(input.files.item(0));
  let name = input.files.item(0).name;
  return [url, name];
};

export const ConfigForm = () => {
  const [form] = Form.useForm();

  const { formV, setFormV } = useTransferContext();
  const { write } = useDraw("renderArea");
  const [fontSource, setFontSource] = useState<any>();

  const handleFontChange = (v: string) => {
    // let [url,name] = fileReader(fontfileInput)
    // fontfileInput.parentNode.firstChild.textContent = name
    opentype.load(v, (e: Error, f: any) => {
      if (e) {
        alert("字体文件解析错误，重试或者请换一个字体文件");
      } else {
        setFontSource(f);
      }
    });
  };

  const handleSubmit = (values: any) => {
    const { pageW, pageH } = values.pageSize;
    const result = {
      ...values,
      fontSource,
      pageW,
      pageH,
    };
    setFormV(values);
    write(values.inputText);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={formV}
      onFinish={handleSubmit}
    >
      <FormItem label="纸张大小" name="pageSize" layout="horizontal">
        <PageSize />
      </FormItem>
      <FormItem label="选择字体" name="font">
        <Select onChange={handleFontChange}>
          {FontOptions.map((option) => (
            <Option value={option.value} key={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>
      </FormItem>
      <FormItem label="输入文本" name="inputText">
        <TextArea rows={20} />
      </FormItem>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          预览
        </Button>
      </Form.Item>
    </Form>
  );
};
