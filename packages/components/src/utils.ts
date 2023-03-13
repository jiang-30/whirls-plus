import { computed } from 'vue'
import type { AxiosInstance } from 'axios'
import type { ICrudOption } from './index'
import type { IDict } from './typings'

export const defaultAttrs = {}
export const defaultFieldAttrs = {}

export const tools: {
  // axios 请求实例
  axios: AxiosInstance | null
  dict: {
    url: string
    status: 'padding' | 'done'
    items: IDict[]
  }[]
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
  defaultFieldAttrs: {},
  dict: [],
}

export const fetchDict = (url: string, props: any) => {
  if (tools.axios && !tools.dict.find(item => item.url == url)) {
    tools
      .axios({
        method: 'get',
        url: url,
      })
      .then(({ data }) => {
        tools.dict.push({
          url: url,
          status: 'done',
          items: data,
        })
      })
  }
}

export const dictData = (url: string) => {
  return computed(() => {
    return tools.dict.find(item => item.url == url && item.status == 'done') ?? []
  })
}

// format Value 对不同的数据域类型格式化显示结果
export const formatValue = (field: any, row: any, column: any, index: any) => {
  if (field.__formatter) {
    // row, column, cellValue, index
    return field.__formatter(row, column, row[field.prop], index)
  } else if (field.type === 'select' && field.multiple === true) {
    const value = row[field.prop]
    if (Array.isArray(value)) {
      const dict = field.__dictData?.filter((item: any) => value.includes(item.value))
      return dict.map((item: any) => item.label).join(',')
    }
    return value
  } else if (field.type === 'select' || field.type === 'radio' || field.type === 'radioButton') {
    const value = row[field.prop]
    const dict = field.__dictData?.find((item: any) => item.value === value)

    return dict?.label ?? value
  } else {
    return row[field.prop]
  }
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
