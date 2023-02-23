import type { PropType } from "vue";
import type { formModel, IFormAttrs, IFormFieldAttrs } from "./type";

export const formSearchProps = {
  formModel: {
    type: Object as PropType<formModel>,
    required: true,
  },
  option: {
    type: Object as PropType<IFormAttrs & { fields: IFormFieldAttrs[] }>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
};

export const formSearchEmits = {
  search: null,
  reset: null,
  show: null,
};

// 属性
export const formProps = {
  formModel: {
    type: Object as PropType<formModel>,
    required: true,
  },
  option: {
    type: Object as PropType<IFormAttrs & { fields: IFormFieldAttrs[] }>,
    required: true,
  },
  type: {
    type: String,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
  onReset: {
    type: Function,
  },
  onCancel: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
};

// 事件
export const formEmits = {};
