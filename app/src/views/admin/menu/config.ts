const yesOrNo = [
  { label: "是", value: "1" },
  { label: "否", value: "0" },
];

export const useConfig = () => {
  const option = ref({
    rowKey: "id",
    border: true,
    stripe: true,
    title: "操作",
    width: 700,
    draggable: true,
    appendToBody: true,
    labelWidth: "100px",
    rowMenuAlign: "center",

    column: 2,

    rowMenu: true,
    rowMenuWidth: 190,
    createBtn: true,
    infoBtn: false,
    span: 24,

    fields: [
      {
        prop: "title",
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
      },
      {
        prop: "type",
        label: "类型",
        type: "radioButton",
        dictKey: "SYS_MENU_TYPE",
        defaultValue: "menu",
        width: 100,
        align: "center",
        span: 12,
      },
      {
        prop: "parentId",
        label: "上级",
        type: "tree",
        span: 12,
        table: false,
        formSlot: true,
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
        table: false,
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
        table: false,
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
        dictKey: "SYS_MENU_TARGET",
        defaultValue: "_self",
        table: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "pageLayout",
        label: "布局方式",
        type: "select",
        dictKey: "SYS_MENU_LAYOUT",
        defaultValue: "admin",
        table: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "keepAlive",
        label: "是否缓存",
        type: "radio",
        dictKey: "SYS_FLAG",
        defaultValue: "0",
        table: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "showMenu",
        label: "是否展示",
        type: "radio",
        dictKey: "SYS_FLAG",
        defaultValue: "1",
        table: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "tabBar",
        label: "是否标签页",
        type: "radio",
        dictKey: "SYS_FLAG",
        defaultValue: "1",
        table: false,
        listen: {
          show: { type: "page" },
        },
        span: 12,
      },
      {
        prop: "sort",
        label: "排序",
        type: "inputNumber",
        defaultValue: 1,
        span: 12,
        width: 100,
        align: "center",
      },
      {
        prop: "enabled",
        label: "状态",
        type: "radio",
        dictKey: "SYS_ENABLED",
        defaultValue: "1",
        width: 80,
        align: "center",
        span: 12,
      },
      {
        prop: "note",
        label: "备注",
        type: "textarea",
        table: false,
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
    option,
  };
};
