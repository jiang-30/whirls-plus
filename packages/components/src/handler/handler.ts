import { fields } from '../../../views/admin/menu/types'
import merge from 'deepmerge'
import type { ITableConfig } from '../type'

const overwriteMerge = (destinationArray: any[], sourceArray: any[], options: any) => {
  sourceArray.forEach(item => {
    if (typeof item === 'object') {
      const index = destinationArray.findIndex((it: any) => it.key && it.key === item.key)
      if (index > -1) {
        destinationArray = merge.all<any[]>([destinationArray[index], item], options)
      } else {
        destinationArray.push(item)
      }
    } else {
      destinationArray.push(item)
    }
  })

  return destinationArray
}

/**
 * 1. type=page从 fields 中提取 create、edit、info、search、table 中的数据
 * 2. 各个模块数据合并（默认数据、配置数据、field生成数据）
 * 3.
 * @param option
 * @returns
 */
export function formatter(option: any) {
  /**
   * 新增弹窗表单
   * option.dialog['crud-create'] > option.fields > 默认配置
   */
  const createFields = option.fields

  /**
   * 编辑弹窗表单
   * option.dialog['crud-edit'] > option.fields > 默认配置
   */
  const editFields = option.fields

  /**
   * 查看弹窗详情
   * option.dialog['crud-info'] > option.fields > 默认配置
   */
  const infoFields = option.fields

  /**
   * 查询条件
   * option.search > option.fields > 默认配置
   */
  const searchFields = option.fields

  /**
   * 表格
   * option.table > option.fields > 默认配置 每一种 type 添加默认值
   */
  const tableFields = option.fields

  return {
    createFields,
    editFields,
    infoFields,
    searchFields,
    tableFields,
  }
}

// export function merge() {}

export function getTableOption(option: any) {
  const tableOption = {
    attrs: option.table,
    fields: option.fields.filter((item: any) => {
      return item.table ?? !item.hide
    }),
  }
  return tableOption
}

export function getSearchOption(option: any) {
  const searchOption = {
    fields: option.fields.filter((item: any) => item.search),
  }

  return searchOption
}

export function getCreateFormOption(option: any) {
  const searchOption = {
    attrs: option.form,
    fields: option.fields.filter((item: any) => {
      return item.createForm ?? item.form ?? !item.hide
    }),
  }
  return searchOption
}

export function getUpdateFormOption(option: any) {
  const fields = option.fields.filter((item: any) => {
    return item.updateForm ?? item.form ?? !item.hide
  })
  const updateOption = {
    attrs: option.form,
    fields: fields.map((field: any) => {
      return {
        prop: field.prop,
        label: field.label,
        type: field.type,
        default: field.updateDefault ?? field.formDefault ?? option.default,
        span: field.updateSpan ?? field.formSpan ?? option.span ?? 12,
        dictData: field.formDictData ?? field.dictData,
      }
    }),
  }
  return updateOption
}

export function getInfoOption(option: any) {
  const searchOption = {
    fields: option.fields.filter((item: any) => item.search),
  }
  return searchOption
}

export function valueFormatter(data: any[], fields: any) {
  console.log(data, fields)
  const result = computed(() => {
    const list: any[] = []
    data.forEach(row => {
      const info = {
        ...row,
      }
      fields.value.forEach((field: any) => {
        console.log(field)
        let formatterValue
        if (field.type == 'radio') {
          formatterValue = field.dictData.find((dict: any) => dict.value == row[field.prop])?.label
        }
        info['_' + field.prop] = formatterValue ?? row[field.prop] ?? field.emptyValue
      })
      list.push(info)
    })
    console.log(list)
    return list
  })

  return result
}
