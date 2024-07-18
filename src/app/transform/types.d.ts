export interface PageWH {
  pageW?: number;
  pageH?: number;
}

export interface FormValueType {
  bgUrl?: string; // 纸张尺寸
  pageSize: PageWH; // 纸张尺寸
  font: string; // 字体
  fontSize?: number; // 字体大小
  horizontalSpace?: number; // 字体间距
  verticalSpace?: number; // 行距
  chaos?: number; // 混乱程度
  offset?: number; // 字体偏离
  inputText?: string; // 文本
  top?: number; // 上边距
  left?: number; // 左边距
  bottom?: number; // 下边距
  right?: number; // 右边距
}
