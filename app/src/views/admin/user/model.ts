import { useDictStore } from '@/stores'

export const useModel = () => {
  const api = ref({
    restful: '/admin/user',
  })
  const option = ref({
    rowActionWidth: 200,
    labelWidth: 100,
    fields: [
      {
        prop: 'username',
        label: '用户名',
        type: 'input',
        rules: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'string', max: 30, message: '30个字符以内', trigger: 'blur' },
        ],
        isSearch: true,
      },
      {
        prop: 'deptId',
        label: '所属部门',
        type: 'tree',
        dictUrl: '/admin/dept/tree',
        checkStrictly: true,
        valueKey: 'id',
        props: {
          label: 'name',
          value: 'id',
        },
        rules: [{ required: true, message: '请选择部门', trigger: 'change' }],
        isSearch: true,
      },
      {
        prop: 'roleIds',
        label: '角色',
        type: 'select',
        dictUrl: '/admin/role/list',
        multiple: true,
        default: [],
        props: {
          value: 'id',
          label: 'name',
        },
        rules: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
      },
      {
        prop: 'password',
        label: '密码',
        type: 'password',
        rules: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 30, message: '6 - 30个字符', trigger: 'blur' },
        ],
        isTable: false,
        isUpdateForm: false,
      },
      {
        prop: 'email',
        label: '邮箱',
        type: 'input',
        rules: [{ type: 'string', max: 50, message: '50个字符以内', trigger: 'blur' }],
      },
      {
        prop: 'phone',
        label: '手机号码',
        type: 'input',
        table: false,
        rules: [{ type: 'string', length: 11, message: '手机号码格式不正确', trigger: 'blur' }],
      },
      {
        prop: 'remark',
        label: '备注',
        type: 'textarea',
        rules: [{ type: 'string', length: 255, message: '255个字符以内', trigger: 'blur' }],
        isTable: false,
      },
      {
        prop: 'isEnabled',
        label: '状态',
        type: 'radio',
        dictData: useDictStore().items('SYS_ENABLED'),
        default: '1',
        width: 100,
      },
    ],
  })

  return {
    api,
    option,
  }
}
