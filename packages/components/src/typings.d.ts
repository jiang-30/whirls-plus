// 表单控制域类型
export type IFieldType =
  | 'input'
  | 'inputNumber'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'radioButton'
  | 'tree'

// 字典数据类型
export type IDictItem = { label: string; value: string; disabled?: boolean }
export type IDict = { name?: string; code: string; items: IDictItem[] }
export type IProps = {
  label?: string
  value?: string
  children?: string
}

export type IDataType = 'info' | 'create' | 'update' | 'row' | 'table'
export type IDialogType = 'info' | 'create' | 'update'
export type IFormType = 'create' | 'update'

// 字段基础属性
export interface IFieldBaseAttrs {
  prop: string
  label: string
  type: IFieldType
  // 字典数据
  dictData?: IDictItem[]
  // 字典地址
  dictUrl?: string
  props?: IProps
  // select 是否多选
  multiple?: boolean
}
