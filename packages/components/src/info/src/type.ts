import type { ExtractPropTypes } from "vue";
import type Info from "./info.vue";
import type { infoProps, infoEmits } from "./info";

export interface IElDescriptionsAttrs {
  border?: boolean;
  column?: number;
  direction?: "vertical" | "horizontal";
  size?: "large" | "default" | "small";
  title?: string;
  extra?: string;
}

export interface IElDescriptionsItemAttrs {
  width?: string | number;
  minWidth?: string | number;
  align?: "left" | "center" | "right";
  labelAlign?: "left" | "center" | "right";
  className?: string;
  labelClassName?: string;
}

export interface IInfoAttrs extends IElDescriptionsAttrs {
  span?: number;
  labelWidth?: string | number;
}

export interface IInfoItemAttrs extends IElDescriptionsItemAttrs {
  label: string;
  prop: string;
  type: string;
  span?: number;
  isInfo?: boolean;
}

// Info
export type IInfo = InstanceType<typeof Info>;

export type IInfoEmits = typeof infoEmits;

export type IInfoProps = ExtractPropTypes<typeof infoProps>;

export type IInfoOption = IInfoProps["option"];
