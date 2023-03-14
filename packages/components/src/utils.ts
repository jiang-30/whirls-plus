import { computed, ref, type Ref } from 'vue'
import type { AxiosInstance } from 'axios'
import type { ICrudOption } from './index'
import type { IDictItem } from './typings'

export const defaultAttrs = {}
export const defaultFieldAttrs = {}

export const tools: {
  // axios 请求实例
  axios: AxiosInstance | null
  dict: Ref<
    {
      url: string
      status: 'padding' | 'done'
      code?: string
      items: IDictItem[]
    }[]
  >
  // crud 默认值
  defaultAttrs: Partial<ICrudOption>
  // crud 数据项 默认值
  defaultFieldAttrs: Partial<ICrudOption['fields']['0']>
} = {
  axios: null,
  defaultAttrs: {
    background: true,
    layout: ' ->, total, sizes, prev, pager, next, jumper',
    pageSizes: [10, 20, 50, 100],
    hideOnSinglePage: true,

    dialogWidth: '700px',
    dialogAppendToBody: true,

    border: true,
    rowKey: 'id',

    infoBorder: true,

    rowActionWidth: 160,
    // 表格居中
    headerAlign: 'center',
    align: 'center',
  },
  defaultFieldAttrs: {
    props: {
      value: 'value',
      label: 'label',
    },
  },
  dict: ref([]),
}

export const fetchDict = (url: string, props?: any) => {
  if (tools.axios && !tools.dict.value.find(item => item.url == url)) {
    // 添加数据，防止重复请求
    tools.dict.value.push({
      url: url,
      // code: pro
      status: 'padding',
      items: [],
    })
    // 请求数据
    tools
      .axios({
        method: 'get',
        url: url,
      })
      .then(({ data }) => {
        const dict = tools.dict.value.find(item => item.url == url)
        if (dict) {
          dict.status = 'done'
          dict.items = data
        }
      })
  }
}

export const dictData = (url: string) => {
  return computed(() => {
    return tools.dict.value.find(item => item.url == url && item.status == 'done')?.items ?? []
  })
}

// // row, column, cellValue, index
// format Value 对不同的数据域类型格式化显示结果
export const formatValue = (field: any, row: any, column: any, index: any) => {
  const value = row[field.prop]
  const __labelName = field.__props.label
  const __valueName = field.__props.value
  const __children = field.__props.children

  if (field.__formatter) {
    return field.__formatter(row, column, row[field.prop], index)
  } else if (field.type === 'select' && field.multiple === true && Array.isArray(value)) {
    const dict = field.__dictData?.filter((item: any) => value.includes(item[__valueName]))
    return dict.map((item: any) => item[__labelName]).join(',')
  } else if (field.type === 'select' || field.type === 'radio' || field.type === 'radioButton') {
    const dict = field.__dictData?.find((item: any) => item[__valueName] === value) ?? {}

    return dict[__labelName] ?? value
  } else if (field.type === 'tree') {
    const dict =
      treeFind(field.__dictData, (item: any) => {
        if (item[__valueName] === value) return true
      }) ?? {}

    return dict[__labelName] ?? value
  }
  return value
}

// 移除 undefined 属性
export const omitProperty = <T extends Record<string, any>>(obj: T) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
      delete obj[prop]
    }
  }
  return obj
}

function treeFind(tree: any, func: any, props?: any): any {
  props = {
    children: 'children',
    ...(props ?? {}),
  }
  for (const node of tree) {
    if (func(node)) return node
    if (node[props.children]) {
      const res = treeFind(node[props.children], func, props)
      if (res) return res
    }
  }
  return null
}
