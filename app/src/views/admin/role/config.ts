export const option = {
  title: "操作",
  width: 600,
  draggable: true,
  appendToBody: true,
  border: true,
  stripe: true,
  labelWidth: 100,

  rowMenu: true,
  rowMenuWidth: 210,
  rowMenuAlign: "center",
  createBtn: true,
  infoBtn: false,

  span: 24,

  fields: [
    {
      label: "名称",
      prop: "name",
      type: "input",
      isSearch: true,
      rules: [
        { required: true, message: "请输入角色名称", trigger: "blur" },
        { type: "string", max: 20, message: "20个字符以内", trigger: "blur" },
      ],
    },
    {
      label: "标识",
      prop: "code",
      type: "input",
      isSearch: true,
      rules: [
        { required: true, message: "请输入角色标识", trigger: "blur" },
        { type: "string", max: 20, message: "20个字符以内", trigger: "blur" },
      ],
    },
    {
      label: "数据权限",
      prop: "scope",
      type: "select",
      dictKey: "SYS_SCOPE",
      defaultValue: "all",
    },
    {
      label: "备注",
      prop: "note",
      type: "textarea",
      rules: [
        { type: "string", max: 255, message: "255个字符以内", trigger: "blur" },
      ],
    },
    {
      label: "排序",
      prop: "sort",
      type: "inputNumber",
      width: 100,
      align: "center",
      span: 12,
    },
    {
      label: "状态",
      prop: "enabled",
      type: "radio",
      dictKey: "SYS_ENABLED",
      width: 100,
      align: "center",
      span: 12,
    },
  ],
};
