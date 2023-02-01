export interface ITableConfig {
  type?: 'table'
  key?: string
  attrs?: any
  events?: any[]
  buttons?: any[]
  children?: any[]
}

export interface IField {
  label: string
  prop: string
  key?: string
}
export interface ITableField {
  label: string
  type: string
  prop: string
  key: string
  emptyValue: string
  attrs: {
    rules: {}[]
    span: string
  }
  children: {}[]
}

export interface IFormField {
  label: string
  type: string
  prop: string
  key: string
  emptyValue: string
  attrs: {}
}

export interface IInfoField {}
export interface IColumn {
  label: string
  type: string
  prop: string
  key: string
  emptyValue: string
  attrs: {}
  dictData: any[]
  dictUrl: string
}
