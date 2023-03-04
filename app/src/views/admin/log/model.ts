export const useModel = () => {
  const api = ref({});
  const option = ref({
    width: 600,
    draggable: true,
    appendToBody: true,
    border: true,
    stripe: true,
    labelSuffix: "：",
    labelWidth: 100,
    rowMenu: true,
    rowMenuWidth: 160,
    rowMenuAlign: "center",
    createBtn: false,
    updateBtn: false,
    deleteBtn: true,
    infoBtn: true,
    span: 24,
    fields: [
      {
        prop: "title",
        label: "模块",
        type: "input",
      },
      {
        prop: "description",
        label: "操作描述",
        type: "input",
      },
      {
        prop: "username",
        label: "用户名",
        type: "input",
        isSearch: true,
      },
      {
        prop: "ip",
        label: "IP",
        type: "input",
        width: 100,
        align: "center",
      },
      {
        prop: "method",
        label: "请求方法",
        type: "input",
      },
      {
        prop: "url",
        label: "请求路径",
        type: "input",
      },
      {
        prop: "time",
        label: "操作时间",
        type: "input",
        width: 180,
        align: "center",
      },
    ],
  });

  return {
    api,
    option,
  };
};
