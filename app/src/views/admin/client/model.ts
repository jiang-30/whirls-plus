export const useModel = () => {
  const api = ref({});
  const option = ref({
    title: "操作",
    width: 600,
    draggable: true,
    appendToBody: true,
    border: true,
    stripe: true,
    labelWidth: 100,
    rowMenu: true,
    rowMenuWidth: 150,
    createBtn: true,
    infoBtn: false,
    span: 24,
    fields: [
      {
        prop: "name",
        label: "平台名称",
        type: "input",
        rules: [
          {
            required: true,
            message: "请输入平台名称",
            trigger: "blur",
          },
          { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
        ],
        isSearch: true,
      },
      {
        prop: "code",
        label: "平台标识",
        type: "input",
        rules: [
          { required: true, message: "请输入平台名称", trigger: "blur" },
          { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
        ],
      },
      {
        prop: "secret",
        label: "密钥",
        isForm: false,
        width: 290,
        align: "center",
      },
      // 登录方式
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
        prop: "isEnabled",
        label: "状态",
        type: "radio",
        dictKey: "SYS_ENABLED",
        defaultValue: "1",
        width: 100,
        align: "center",
      },
    ],
  });

  return {
    option,
    api,
  };
};
