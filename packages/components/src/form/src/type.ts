import type { ExtractPropTypes } from "vue";
import type { FormItemRule } from "element-plus";
import type Form from "./form.vue";
import type { formProps } from "./form";

export type formModel = Record<string, any>;

// Form 属性
export interface IFormAttrs {
  inline?: boolean;
  labelPosition?: "left" | "right" | "top";
  labelWidth?: string | number;
  labelSuffix?: string;
  hideRequiredAsterisk?: boolean;
  showMessage?: boolean;
  inlineMessage?: boolean;
  statusIcon?: boolean;
  validateOnRuleChange?: boolean;
  size?: "large" | "default" | "small";
  scrollToError?: boolean;
}

// Form Field 属性
export interface IFormFieldAttrs {
  prop: string;
  label: string;
  type:
    | "input"
    | "inputNumber"
    | "textarea"
    | "select"
    | "radio"
    | "radioButton"
    | "tree";
  span?: number;

  default?: any;
  searchDefault?: any;
  isSearch?: boolean;
  dictKey?: string;
  hint?: string;
  formSlot?: boolean;
  listen?: any;

  labelWidth?: string | number;
  required?: boolean;
  rules?: FormItemRule | FormItemRule[];
  error?: string;
  showMessage?: boolean;
  inlineMessage?: boolean;
  size?: "large" | "default" | "small";
}

export interface ISearchFormFieldAttrs {
  searchDefault?: any;
  isSearch?: boolean;
}

// Form 属性
export type IFormProps = ExtractPropTypes<typeof formProps>;

// Form option 属性
export type IFormOption = IFormProps["option"];

// Form 组件实例
export type IForm = InstanceType<typeof Form>;
