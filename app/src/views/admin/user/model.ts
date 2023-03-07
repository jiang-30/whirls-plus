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
    rowMenuWidth: 230,
    rowMenuAlign: "center",
    createBtn: true,
    infoBtn: false,
    span: 24,
    fields: [
      {
        prop: "username",
        label: "用户名",
        type: "input",
        rules: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
        ],
        search: true,
      },
      {
        prop: "deptId",
        label: "所属部门",
        rules: [{ required: true, message: "请选择部门", trigger: "change" }],
        formSlot: true,
        tableSlot: true,
      },
      {
        prop: "roleIds",
        label: "角色",
        rules: [
          { required: true, message: "请选择用户角色", trigger: "change" },
        ],
        formSlot: true,
        tableSlot: true,
      },
      {
        prop: "password",
        label: "密码",
        type: "input",
        rules: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            max: 30,
            message: "6 - 30个字符",
            trigger: "blur",
          },
        ],
        table: false,
        updateForm: false,
      },
      {
        prop: "email",
        label: "邮箱",
        type: "input",
        rules: [
          { type: "string", max: 50, message: "50个字符以内", trigger: "blur" },
        ],
      },
      {
        prop: "phone",
        label: "手机号码",
        type: "input",
        table: false,
        rules: [
          {
            type: "string",
            length: 11,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
      },
      {
        prop: "note",
        label: "备注",
        type: "textarea",
        table: false,
        rules: [
          {
            type: "string",
            length: 255,
            message: "255个字符以内",
            trigger: "blur",
          },
        ],
      },
      {
        prop: "enabled",
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
    api,
    option,
  };
};