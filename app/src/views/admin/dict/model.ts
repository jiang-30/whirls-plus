import { useDictStore } from "@/stores";
import type {
  ICrudOption,
  ICrudApi,
  IPageModel,
  ITableData,
} from "@whirls/components";
// useController
// base数据
// 组件状态及交互逻辑 -- 组件里引入交互逻辑
// useService
// 接口请求
export const useModel = (): {
  api: Ref<ICrudApi>;
  option: Ref<ICrudOption>;
  pageModel: Ref<IPageModel>;
  tableLoading: Ref<boolean>;
  tableData: Ref<ITableData>;
} => {
  const api = ref<ICrudApi>({
    page: "/admin/dict/page",
    create: "/admin/dict",
    update: "/admin/dict",
    delete: "/admin/dict/",
  });

  const option = ref<ICrudOption>({
    border: true,
    stripe: true,
    dialogWidth: 600,
    align: "center",
    labelWidth: "100px",
    rowActionWidth: 230,
    fields: [
      {
        label: "字典名称",
        prop: "name",
        type: "input",
        rules: [
          { required: true, message: "请输入字典名称", trigger: "blur" },
          {
            type: "string",
            max: 32,
            message: "最多输入32个字符",
            trigger: "blur",
          },
        ],
        isSearch: true,
      },
      {
        label: "字典标识",
        prop: "code",
        type: "input",
        rules: [
          { required: true, message: "请输入字典标识", trigger: "blur" },
          {
            type: "string",
            max: 32,
            message: "最多输入32个字符",
            trigger: "blur",
          },
        ],
        isSearch: true,
      },
      {
        label: "字典类型",
        prop: "type",
        type: "select",
        default: "biz",
        rules: [{ required: true, message: "请选择字典类型", trigger: "blur" }],
        dictData: useDictStore().items("SYS_DICT_TYPE"),
        isSearch: true,
      },
      {
        label: "数据类型",
        prop: "dataType",
        type: "select",
        default: "list",
        rules: [{ required: true, message: "请选择数据类型", trigger: "blur" }],
        dictData: useDictStore().items("SYS_DICT_DATA_TYPE"),
      },
      {
        label: "备注",
        prop: "remark",
        type: "textarea",
        rules: [
          {
            type: "string",
            max: 255,
            message: "最多输入255个字符",
            trigger: "blur",
          },
        ],
        isTable: false,
      },
    ],
  });

  const pageModel = ref<IPageModel>({
    current: 1,
    size: 10,
    total: 0,
  });

  const tableLoading = ref(false);

  const tableData = ref<Record<string, any>[]>([]);

  return {
    api,
    option,
    tableLoading,
    pageModel,
    tableData,
  };
};
