import type { AxiosInstance } from "axios";
import type { ICrudOption } from "./index";

// 表单控制域类型
export type IFieldType =
  | "input"
  | "inputNumber"
  | "textarea"
  | "select"
  | "radio"
  | "radioButton"
  | "tree";

// 字典数据类型
export type IDict = { label: string; value: string };

// 字段基础属性
export interface IFieldBaseAttrs {
  prop: string;
  label: string;
  type: IFieldType;
  // 字典Key
  dictKey?: string;
  // 字典数据
  dictData?: IDict[];
  // formatter
}

export const defaultAttrs = {};
export const defaultFieldAttrs = {};

export const tools: {
  // axios 请求实例
  axios: AxiosInstance | null;
  // crud 默认值
  defaultAttrs: Partial<ICrudOption>;
  // crud 数据项 默认值
  defaultFieldAttrs: Partial<ICrudOption["fields"]["0"]>;
  dictList: IDict[];
} = {
  axios: null,
  defaultAttrs: {},
  defaultFieldAttrs: {},
  dictList: [],
};

// format Value 对不同的数据域类型格式化显示结果
export const formatValue = (field: any, row: any, column: any, index: any) => {
  if (field.__formatter) {
    // row, column, cellValue, index
    return field.__formatter(row, column, row[field.prop], index);
  } else if (field.type === "select") {
    const value = row[field.prop];
    const dict = field._dictData.find((item: any) => item.value === value);

    return dict.label ?? value;
  } else {
    return row[field.prop];
  }
};
