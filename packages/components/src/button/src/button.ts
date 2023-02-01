import type { ExtractPropTypes } from "vue";
import type Button from "./button.vue";
export const ButtonType = [
  "default",
  "primary",
  "success",
  "warning",
  "danger",
];
export const ButtonSize = ["large", "normal", "small", "mini"];
export const buttonProps = {
  type: {
    type: String,
    values: ButtonType,
  },
  size: {
    type: String,
    values: ButtonSize,
  },
};

export const buttonEmits = {
  click: (fixed: boolean) => typeof fixed === "boolean",
};

// ExtractPropTypes接收一个类型, 把类型提供出来
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type buttonEmits = typeof buttonEmits;

export type ButtonInstance = InstanceType<typeof Button>;
