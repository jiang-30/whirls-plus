import { ref, reactive } from "vue";
import type { PropType } from "vue";
import type {
  ITableData,
  IDialogAttrs,
  ITableAttrs,
  ITableFieldAttrs,
  IPageModel,
} from "./type";
import type { IFormAttrs, IFormFieldAttrs } from "../../index";

// CRUD PROPS 属性
export const crudProps = {
  option: {
    type: Object as PropType<
      ITableAttrs &
        IDialogAttrs &
        IFormAttrs & { fields: (ITableFieldAttrs & IFormFieldAttrs)[] }
    >,
    required: true,
  },
  tableLoading: {
    type: Boolean,
    default: false,
  },
  tableData: {
    type: Array as PropType<ITableData[]>,
    required: true,
  },
  pageModel: {
    type: Object as PropType<IPageModel>,
  },
  // valueModel
  formModel: {
    type: Object,
  },
  searchModel: {
    type: Object,
    default: () => reactive({}),
  },
  onRowCreate: {
    type: Function,
  },
  // 新增 弹窗打开前
  onCreateOpen: {
    type: Function,
  },
  // 新增 保存
  onCreateSave: {
    type: Function,
  },
  // 修改 弹窗打开前
  onUpdateOpen: {
    type: Function,
  },
  // 修改 保存前
  onUpdateSaveBefore: {
    type: Function,
  },
  // 修改 保存
  onUpdateSave: {
    type: Function,
  },
  // 详情 弹窗打开前
  onInfoOpen: {
    type: Function,
  },
  // 删除 保存前
  onDeleteSave: {
    type: Function,
  },
};

export const crudEmits = {
  rowCreate: null,
  "update:formModel": null,
  query: null,
};
