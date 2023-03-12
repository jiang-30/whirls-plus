export const useModel = (tableData: Ref<any>) => {
  const api = ref({
    restful: '/admin/dept',
    list: '/admin/dept/tree'
  });

  const option = computed(() => {
    return {
      labelWidth: 100,
      fields: [
        {
          prop: "parentId",
          label: "上级",
          type: "tree",
          dictData: tableData.value,
          checkStrictly: true,
          valueKey: 'id',
          props: {
            label: 'name',
          },
          updateDisabled: true,
          isTable: false,
        },
        {
          prop: "name",
          label: "部门名称",
          type: "input",
          rules: [
            { required: true, message: "请输入部门名称", trigger: "blur" },
            { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
          ],
        },
        {
          prop: "code",
          label: "部门标识",
          type: "input",
          rules: [
            { type: "string", max: 30, message: "30个字符以内", trigger: "blur" },
          ],
        },
        {
          prop: "remark",
          label: "备注",
          type: "textarea",
          rules: [
            { type: "string", max: 255, message: "255个字符以内", trigger: "blur" },
          ],
          isTable: false
        },
        {
          prop: "sort",
          label: "排序",
          type: "inputNumber",
          default: 1,
        },
      ],
    }
  });

  return {
    api,
    option,
  };
};
