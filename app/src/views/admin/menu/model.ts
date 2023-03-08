import type { ICrudOption, ICrudApi } from "@whirls/components";
import { useDictStore } from "@/stores";

export const useModel = (tableData: Ref<any[]>) => {
  const api = ref<ICrudApi>({

  });

  const option = ref({
    rowKey: "id",
    border: true,
    stripe: true,
    labelWidth: "100px",
    dialogWidth: 700,
    fields: [
      {
        prop: "type",
        label: "类型",
        type: "radioButton",
        dictData: useDictStore().items('SYS_MENU_TYPE'),
        default: "page",
        width: 100,
        span: 12,
      },
      {
        prop: "parentId",
        label: "上级",
        type: "tree",
        span: 12,
        dictData: tableData,
        isTable: false,
      },
      {
        prop: "name",
        label: "名称",
        type: "input",
        rules: [
          { required: true, message: "请输入名称", trigger: "change" },
          {
            type: "string",
            max: 20,
            message: "20个字符以内",
            trigger: "change",
          },
        ],
        headerAlign: "center",
        isSearch: true,
        default: "dsf",
        searchDefault: "dsf",
      },
      {
        prop: "icon",
        label: "图标",
        type: "input",
        formSlot: true,
        tableSlot: true,
        width: 80,
        align: "center",
      },
      {
        prop: "path",
        label: "访问路径",
        type: "input",
        rules: [
          { required: true, message: "请输入访问路径", trigger: "change" },
          {
            type: "string",
            max: 100,
            message: "100个字符以内",
            trigger: "change",
          },
        ],
        listen: {
          hide: { type: "button" },
        },
      },
      {
        prop: "component",
        label: "组件路径",
        type: "input",
        listen: {
          show: { type: "page" },
        },
        rules: [
          { required: true, message: "请输入组件路径", trigger: "change" },
          {
            type: "string",
            max: 100,
            message: "100个字符以内",
            trigger: "change",
          },
        ],
      },
      {
        prop: "permission",
        label: "权限标识",
        type: "input",
        isTable: false,
        rules: [
          {
            type: "string",
            max: 255,
            message: "255个字符以内",
            trigger: "change",
          },
        ],
      },
      {
        prop: "target",
        label: "打开位置",
        type: "radio",
        dictData: useDictStore().items("SYS_MENU_TARGET"),
        default: "_self",
        isTable: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "pageLayout",
        label: "布局方式",
        type: "select",
        dictData: useDictStore().items("SYS_MENU_LAYOUT"),
        default: "admin",
        isTable: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "keepAlive",
        label: "是否缓存",
        type: "radio",
        dictData: useDictStore().items("SYS_FLAG"),
        default: "0",
        isTable: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "showMenu",
        label: "是否展示",
        type: "radio",
        dictData: useDictStore().items("SYS_FLAG"),
        default: "1",
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "tabBar",
        label: "是否标签页",
        type: "radio",
        dictData: useDictStore().items("SYS_FLAG"),
        default: "1",
        isTable: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "sort",
        label: "排序",
        type: "inputNumber",
        default: 1,
        span: 12,
        width: 100,
        align: "center",
      },
      {
        prop: "enabled",
        label: "状态",
        type: "radio",
        dictData: useDictStore().items('SYS_ENABLED'),
        default: "1",
        width: 80,
        align: "center",
        span: 12,
      },
      {
        prop: "note",
        label: "备注",
        type: "textarea",
        isTable: false,
        rules: [
          {
            type: "string",
            max: 255,
            message: "255个字符以内",
            trigger: "change",
          },
        ],
      },
    ],
  });

  return {
    api,
    option,
  };
};
