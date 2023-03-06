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
