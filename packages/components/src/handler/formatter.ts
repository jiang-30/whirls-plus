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
  // const a = [{ key: 'a', a: [1], c: 'a' }]
  // const b = [{ key: 'a', a: [2], c: 'b' }]
  // console.log(merge.all([a, b], { arrayMerge: overwriteMerge }))

  // const createFields = option.fields
  // const editFields = option.fields
  // const infoFields = option.fields
  // const searchFields = option.fields
  // const tableFields = option.fields

  /**
   * 表格
   * option.table > option.fields > 默认配置 每一种 type 添加默认值
   */
  let tableOption: ITableConfig = merge.all([{}, { children: option.fields.filter(() => true) }, option.table])

  /**
   * 查询条件
   * option.search > option.fields > 默认配置
   */
  let searchOption: any = merge.all([{}, { children: option.fields.filter(() => false) }, option.search])

  /**
   * 新增弹窗表单
   * option.dialog['crud-create'] > option.fields > 默认配置
   */
  const createFormFields = option.fields.filter(() => true)
  let createOption: any = merge.all(
    [{}, option.dialogs.find((item: any) => item.key === 'crud-dialog-create')],
    // { arrayMerge: overwriteMerge },
  )

  /**
   * 编辑弹窗表单
   * option.dialog['crud-edit'] > option.fields > 默认配置
   */
  let editOption: any = merge.all([
    {},
    { children: option.fields.filter(() => true) },
    option.dialogs.find((item: any) => item.key === 'crud-dialog-edit'),
  ])

  /**
   * 查看弹窗详情
   * option.dialog['crud-info'] > option.fields > 默认配置
   */
  let infoOption: any = merge.all([
    {},
    { children: option.fields.filter(() => true) },
    option.dialogs.find((item: any) => item.key === 'crud-dialog-info'),
  ])

  console.log(createOption)

  return {
    tableOption,
    searchOption,
    createOption,
    editOption,
    infoOption,
  }
}

// export function merge() {}
