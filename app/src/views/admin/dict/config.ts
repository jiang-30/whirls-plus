export const option = {
  title: "操作",
  width: 500,
  draggable: true,
  appendToBody: true,
  border: true,
  stripe: true,
  labelWidth: 80,
  rowMenu: true,
  rowMenuWidth: 205,
  createBtn: true,
  infoBtn: false,
  span: 24,
  fields: [
    {
      label: "名称",
      prop: "name",
      type: "input",
      search: true,
      rules: [
        { required: true, message: "请输入字典名称", trigger: "blur" },
        { type: "string", max: 20, message: "20个字符以内", trigger: "blur" },
      ],
    },
    {
      label: "标识",
      prop: "code",
      type: "input",
      search: true,
      rules: [
        { required: true, message: "请输入字典标识", trigger: "blur" },
        { type: "string", max: 20, message: "20个字符以内", trigger: "blur" },
      ],
    },
    {
      label: "类型",
      prop: "type",
      type: "select",
      dictKey: "SYS_DICT_TYPE",
      defaultValue: "system",
    },
    {
      label: "数据结构",
      prop: "dataType",
      type: "radio",
      dictKey: "SYS_DICT_DATA_TYPE",
      defaultValue: "1",
      rules: [],
    },
    {
      label: "备注",
      prop: "note",
      type: "textarea",
      rules: [
        { type: "string", max: 255, message: "255个字符以内", trigger: "blur" },
      ],
    },
  ],
};
