import type { PropType } from "vue";
import type {
  IFormModel,
  ISearchFormAttrs,
  ISearchFormItemAttrs,
} from "./type";

export const searchFormProps = {
  option: {
    type: Object as PropType<
      ISearchFormAttrs & { fields: ISearchFormItemAttrs[] }
    >,
    required: true as true,
  },
  searchModel: {
    type: Object as PropType<IFormModel>,
    required: true as true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
};

export const searchFormEmits = {
  init: null,
  search: null,
  reset: null,
  show: null,
};
