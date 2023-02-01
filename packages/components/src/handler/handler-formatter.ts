/**
 * type、index、selectable、reserve-selection
 */
interface ITableFieldAttrs {}
interface ITableField {
  label?: string
  prop?: string
  columnKey?: string
  width?: string | number
  minWidth?: string | number
  fixed?: string | boolean
  // renderHeader?: function({ column, $index })
  sortable?: boolean | string
  // sortMethod?: function(a, b)
  // sortBy?: function(row, index) / string / array
  // sort-orders?: array
  resizable?: boolean
  // formatter?: function(row, column, cellValue, index)
  showOverflowTooltip?: boolean
  align?: string
  headerAlign?: string
  className?: string
  labelClassName?: string
  // filters?: array[{ text, value }]
  // filter-placement
  // filter-multiple
  // filter-method
  // filtered-value
  isTable?: boolean // 默认 true,
  isShow?: boolean
  slot?: boolean
  headerSlot?: boolean
}

/**
 * 需要合并 当前配置 和 默认配置
 * @param fields
 * @returns
 */
export function tableFieldFormatter(fields: any[], defaultConfig: ITableField = {}): ITableField[] {
  /**
   * 判断 fields 和 默认配置 是否包含属性
   */
  const keys: (keyof ITableField)[] = [
    'label',
    'prop',
    'columnKey',
    'width',
    'minWidth',
    'fixed',
    // renderHeader?: function({ column, $index })
    'sortable',
    // sortMethod?: function(a, b)
    // sortBy?: function(row, index) / string / array
    // sort-orders?: array
    'resizable',
    // formatter?: function(row, column, cellValue, index)
    'showOverflowTooltip',
    'align',
    'headerAlign',
    'className',
    'labelClassName',
    // filters?: array[{ text, value }]
    // filter-placement
    // filter-multiple
    // filter-method
    // filtered-value
    'isTable',
    // isShow?: boolean
    // slot?: boolean
    // headerSlot?: boolean
  ]
  const arr: ITableField[] = []
  fields.forEach(item => {
    if (item.isTable !== false) {
      /**
       * { isTalle、attrs: {}}
       */
      const field: ITableField = {
        ...defaultConfig,
      }
      keys.forEach(key => {
        // if (key in defaultConfig) {
        //   field[key] = defaultConfig[key]
        // }
        if (key in item) {
          field[key] = item[key]
        }
      })

      arr.push(field)
    }
  })

  return arr
}
interface ITableAttrs {
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  // current-row-key?: string | number
  // row-class-name?: function({ row, rowIndex }) / string
  // row-style?: function({ row, rowIndex }) / object
  // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // header-row-class-name?: function({ row, rowIndex }) / string
  // header-row-style?: function({ row, rowIndex }) / object
  // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // row-key?: function(row) / string
  emptyText?: string
  defaultExpandAll?: boolean
  // expand-row-keys: array
  // default-sort: object
  tooltipEffect?: 'dark' | 'light'
  showSummary?: boolean
  sumText?: string
  // summaryMethod?: function({ columns, data })
  // span-method
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  // load?: function(row, treeNode, resolve)
  // tree-props
  tableLayout?: 'fixed' | 'auto'
  scrollbarAlwaysOn?: boolean
}

export function tableAttrsFormatter(option: ITableAttrs, defaultConfig: ITableAttrs = {}): ITableAttrs {
  const keys: (keyof ITableAttrs)[] = [
    'height',
    'maxHeight',
    'stripe',
    'border',
    'size',
    'fit',
    'showHeader',
    'highlightCurrentRow',
    // current-row-key?: string | number
    // row-class-name?: function({ row, rowIndex }) / string
    // row-style?: function({ row, rowIndex }) / object
    // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
    // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
    // header-row-class-name?: function({ row, rowIndex }) / string
    // header-row-style?: function({ row, rowIndex }) / object
    // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
    // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
    // row-key?: function(row) / string
    'emptyText',
    'defaultExpandAll',
    // expand-row-keys: array
    // default-sort: object
    'tooltipEffect',
    'showSummary',
    'sumText',
    // summaryMethod?: function({ columns, data })
    // span-method
    'selectOnIndeterminate',
    'indent',
    'lazy',
    // load?: function(row, treeNode, resolve)
    // tree-props
    'tableLayout',
    'scrollbarAlwaysOn',
  ]
  const attrs: ITableAttrs = {
    ...defaultConfig,
  }

  keys.forEach(key => {
    if (key in option) {
      attrs[key] = option[key]
    }
  })

  return attrs
}
