export const useModel = () => {
  const api = ref({});
  const option = {
    labelWidth: 100,

    border: true,
    stripe: true,
    rowKey: "id",
    defaultExpandAll: true,

    appendToBody: true,
    draggable: true,
    title: "操作",
    width: 600,

    rowMenu: true,
    createBtn: true,
    rowMenuWidth: 190,
    rowMenuAlign: "center",
    infoBtn: false,

    span: 24,

    fields: [
      {
        prop: "parentId",
        label: "上级",
        type: "treeSelect",
        table: false,
        updateDisabled: true,
        formSlot: true,
      },
      {
        prop: "name",
        label: "名称",
        type: "input",
        rules: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { type: "string", max: 20, message: "20个字符以内", trigger: "blur" },
        ],
      },
      {
        prop: "note",
        label: "备注",
        type: "textarea",
        rules: [
          {
            type: "string",
            max: 255,
            message: "255个字符以内",
            trigger: "blur",
          },
        ],
      },
      {
        prop: "sort",
        label: "排序",
        type: "inputNumber",
        defaultValue: 1,
        table: false,
      },
      {
        prop: "createdTime",
        label: "创建时间",
        type: "input",
        width: 180,
        align: "center",
        form: false,
      },
    ],
  };

  return {
    api,
    option,
  };
};
