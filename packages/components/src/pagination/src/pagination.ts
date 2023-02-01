import type { ExtractPropTypes } from "vue";
import type WPagination from "./pagination.vue";

export const buttonProps = {
  type: {
    type: String,
    values: "",
  },
  size: {
    type: String,
    // values: ButtonSize,
  },
};

export const buttonEmits = {
  click: (fixed: boolean) => typeof fixed === "boolean",
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type buttonEmits = typeof buttonEmits;

export type ButtonInstance = InstanceType<typeof WPagination>;
