import type { PropType } from "vue";
import type { IInfoAttrs, IInfoItemAttrs } from "./type";

export const infoProps = {
  option: {
    type: Object as PropType<IInfoAttrs & { fields: IInfoItemAttrs[] }>,
    required: true as true,
  },
  infoModel: {
    type: Object,
    required: true as true,
  },
  onCancel: {
    type: Function,
  },
};

export const infoEmits = {};
