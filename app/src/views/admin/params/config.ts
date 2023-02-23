export const option = {
  title: "操作",
  width: 600,
  draggable: true,
  appendToBody: true,
  border: true,
  labelSuffix: "：",
  labelWidth: 100,
  rowMenu: true,
  createBtn: false,
  span: 24,
  fields: [
    {
      prop: "name",
      label: "配置名称",
      type: "input",
      isSearch: true,
    },
    {
      prop: "code",
      label: "配置标识",
    },
    {
      prop: "note",
      label: "备注",
    },
  ],
};
