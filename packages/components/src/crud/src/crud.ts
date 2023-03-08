import { reactive } from "vue";
import type { PropType } from "vue";
import type {
  ITableData,
  ICrudApi,
  IPageModel,
  ICrudAttrs,
  ICrudColumnAttrs,
} from "./type";
import type {
  IFormAttrs,
  IFormItemAttrs,
  ISearchFormAttrs,
  ISearchFormItemAttrs,
  IInfoAttrs,
  IInfoItemAttrs,
} from "../../index";

// CRUD PROPS 属性
export const crudProps = {
  option: {
    type: Object as PropType<
      ICrudAttrs &
        IFormAttrs &
        ISearchFormAttrs &
        IInfoAttrs & {
          fields: (ICrudColumnAttrs &
            IFormItemAttrs &
            ISearchFormItemAttrs &
            IInfoItemAttrs)[];
        }
    >,
    required: true as true,
  },
  api: {
    type: Object as PropType<ICrudApi>,
  },
  tableLoading: {
    type: Boolean,
    default: undefined,
  },
  tableData: {
    type: Array as PropType<ITableData[]>,
    default: undefined,
  },
  modelValue: {
    type: Object,
  },
  pageModel: {
    type: Object as PropType<IPageModel>,
    default: () =>
      reactive({
        current: 1,
        size: 10,
        total: 0,
      }),
  },
  searchModel: {
    type: Object,
    default: () => reactive({}),
  },
  // 新增、详情、修改 弹窗打开前
  beforeOpen: {
    type: Function,
  },
  // beforeClose: {
  //   type: Function as PropType<(done: () => void, type: string) => void>,
  // },
  beforeSave: {
    type: Function,
  },
  onQuery: {
    type: Function,
  },
  // 新增 保存
  onCreate: {
    type: Function,
  },
  // 修改 保存
  onUpdate: {
    type: Function,
  },
  // 删除 保存
  onDelete: {
    type: Function,
  },
};

export const crudEmits = {
  "update:modelValue": null,
  "update:tableData": null,
  init: null,
  search: null,
  searchReset: null,
  pageCurrentChange: null,
  pageSizeChange: null,
  refresh: null,
};
