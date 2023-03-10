import { useDictStore } from '@/stores'

export const useModel = () => {
  const api = {
    restful: '/admin/role',
  }
  const option = ref({
    labelWidth: 100,
    fields: [
      {
        label: '名称',
        prop: 'name',
        type: 'input',
        isSearch: true,
        rules: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { type: 'string', max: 30, message: '30个字符以内', trigger: 'blur' },
        ],
      },
      {
        label: '标识',
        prop: 'code',
        type: 'input',
        isSearch: true,
        rules: [
          { required: true, message: '请输入角色标识', trigger: 'blur' },
          { type: 'string', max: 30, message: '30个字符以内', trigger: 'blur' },
        ],
      },
      {
        label: '数据权限',
        prop: 'scope',
        type: 'select',
        dictData: useDictStore().items('SYS_DATA_SCOPE'),
        defaultValue: 'all',
      },
      {
        label: '备注',
        prop: 'remark',
        type: 'textarea',
        rules: [{ type: 'string', max: 250, message: '250个字符以内', trigger: 'blur' }],
        isTable: false,
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'inputNumber',
        default: 1,
        width: 100,
        span: 12,
      },
      {
        label: '状态',
        prop: 'isEnabled',
        type: 'radio',
        dictData: useDictStore().items('SYS_ENABLED'),
        default: '1',
        width: 100,
        span: 12,
      },
    ],
  })

  return {
    api,
    option,
  }
}
