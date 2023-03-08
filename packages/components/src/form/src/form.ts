import type { PropType } from "vue";
import type {
  IFormModel,
  IFormType,
  IFormAttrs,
  IFormItemAttrs,
  IFormItemControlAttrs,
} from "./type";

// 属性
export const formProps = {
  // 数据模型
  formModel: {
    type: Object as PropType<IFormModel>,
    required: true as true,
  },
  // 配置
  option: {
    type: Object as PropType<
      IFormAttrs & { fields: (IFormItemAttrs & IFormItemControlAttrs)[] }
    >,
    required: true as true,
  },
  // 表单类型 create | update
  type: {
    type: String as PropType<IFormType>,
  },
  // 确认事件
  onConfirm: {
    type: Function,
    required: true,
  },
  // 重置事件
  onReset: {
    type: Function,
  },
  // 取消事件
  onCancel: {
    type: Function,
  },
  // 确认成功事件
  onSuccess: {
    type: Function,
  },
};

// 事件
export const formEmits = {};
