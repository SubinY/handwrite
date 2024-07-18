"use client";

import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  message,
  Upload,
  ConfigProvider,
} from "antd";
import type { UploadFile, UploadProps } from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import { useTransferContext } from "../context";
import { FormValueType } from "../types";
import { PageSize } from "./PageSize";
import { useState, useEffect } from "react";
import useDraw from "./RenderArea/useDraw";

const opentype: any = require("opentype.js");

const { TextArea } = Input;
const { Option } = Select;

const FormItem = Form.Item;

const FontOptions = [
  {
    label: "云烟体.ttf",
    value: "/fonts/云烟体.ttf",
  },
  {
    label: "hy.ttf",
    value: "/fonts/hy.ttf",
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

const colors1 = ["#6253E1", "#04BEFE"];

const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

// const fileReader = (input: any) => {
//   let url = window.URL.createObjectURL(input.files.item(0));
//   let name = input.files.item(0).name;
//   return [url, name];
// };

export const ConfigForm = () => {
  const [form] = Form.useForm();

  const { formV } = useTransferContext();
  const { write, initPaper } = useDraw("renderArea");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fontSource, setFontSource] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleFontChange(FontOptions[0].value);
  }, []);

  const fileReaderToUrl = (inputFile: any) => {
    let url = window.URL.createObjectURL(inputFile);
    return url;
  };

  const handleFontChange = (v: string) => {
    setLoading(true);
    // let [url,name] = fileReader(fontfileInput)
    // fontfileInput.parentNode.firstChild.textContent = name
    opentype.load(v, (e: Error, f: any) => {
      if (e) {
        alert("字体文件解析错误，重试或者请换一个字体文件");
      } else {
        setFontSource(f);
      }
      setLoading(false);
    });
  };

  const handleFileChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
        file.status = "done";
      }
      return file;
    });
    setFileList(newFileList);
    if (newFileList.length) {
      const url = fileReaderToUrl(newFileList[0].originFileObj);
      formV.current = {
        ...formV,
        bgUrl: url,
      };
    }
  };

  const handleSubmit = (values: any) => {
    if (!values.inputText.trim()) {
      return message.warning("请输入文本");
    }
    // const { pageW, pageH } = values.pageSize;
    const { top, left, bottom, right } = formV.current;
    const {
      inputText,
      fontSize,
      horizontalSpace,
      verticalSpace,
      chaos,
      offset,
    } = values;
    const result = {
      ...formV.current,
      ...values,
      fontSource,
      // pageW,
      // pageH,
    };
    formV.current = result;
    write(
      inputText,
      fontSource,
      fontSize,
      [horizontalSpace, verticalSpace],
      [top, 500 - right, 707 - bottom, left],
      chaos,
      offset
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
            colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
              colors1
            ).join(", ")})`,
            colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
              colors1
            ).join(", ")})`,
            lineWidth: 0,
          },
        },
      }}
    >
      <Form
        layout="horizontal"
        wrapperCol={{ offset: 1, span: 12 }}
        labelCol={{ span: 8 }}
        form={form}
        initialValues={formV.current}
        onFinish={handleSubmit}
      >
        {/* <FormItem label="纸张大小" name="pageSize" layout="horizontal">
        <PageSize />
      </FormItem> */}
        <Row>
          <Col span={24}>
            <FormItem
              label="替换背景"
              name="bgFile"
              wrapperCol={{ offset: 1, span: 18 }}
              labelCol={{ span: 4 }}
            >
              <Upload
                onChange={handleFileChange}
                fileList={fileList}
                maxCount={1}
                accept="image/*"
              >
                {fileList?.length ? null : (
                  <Button className="left-[-12px]">上传</Button>
                )}
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="选择字体" name="font" className="!text-xl">
              <Select onChange={handleFontChange}>
                {FontOptions.map((option) => (
                  <Option value={option.value} key={option.label}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="字体大小" name="fontSize">
              <InputNumber className="!w-full" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="字体间距" name="horizontalSpace">
              <InputNumber className="!w-full" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="行距" name="verticalSpace">
              <InputNumber className="!w-full" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem label="混乱程度" name="chaos">
              <InputNumber className="!w-full" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="字体偏离" name="offset">
              <InputNumber className="!w-full" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormItem
              label="输入文本"
              name="inputText"
              labelAlign="left"
              wrapperCol={{ offset: 1, span: 18 }}
              labelCol={{ span: 4 }}
            >
              <TextArea
                rows={14}
                placeholder="请输入"
                className="left-[-12px]"
              />
            </FormItem>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={loading}
          >
            预览
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
