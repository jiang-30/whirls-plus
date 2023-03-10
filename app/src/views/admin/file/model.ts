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
    rowMenuWidth: 210,
    rowMenuAlign: "center",
    createBtn: false,
    updateBtn: false,
    deleteBtn: true,
    infoBtn: true,
    span: 24,
    fields: [
      {
        prop: "originFilename",
        label: "文件名",
        type: "input",
        search: true,
      },
      {
        prop: "访问地址",
        label: "url",
        type: "input",
      },
      {
        prop: "contentType",
        label: "文件类型",
        type: "input",
        width: 120,
      },
      {
        prop: "size",
        label: "文件大小",
        type: "input",
        width: 120,
      },
      {
        prop: "bucket",
        label: "bucket",
        type: "input",
        table: false,
      },
      {
        prop: "etag",
        label: "etag",
        type: "input",
        table: false,
      },
      {
        prop: "createdTime",
        label: "添加时间",
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
