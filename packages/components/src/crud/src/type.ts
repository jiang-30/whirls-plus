import type { ExtractPropTypes } from 'vue'
import type { TableProps, TableColumnCtx, DialogProps, PaginationProps } from 'element-plus'
import type { crudProps, crudEmits } from './crud'
import type Crud from './crud.vue'
import type { IFieldType, IDictItem } from '../../typings'

// 表格数据类型
export type ITableData = Record<string, any>

// Pagination model 数据
export type IPageModel = {
  current: number
  size: number
  total: number
}

export interface ICrudApi {
  /**
   * page、create、update、delete
   */
  restful?: string
  list?: string
  page?: string
  info?: string
  create?: string
  update?: string
  delete?: string
}

// Table 属性
export interface IElTableAttrs {
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  currentRowKey?: TableProps<ITableData>['currentRowKey']
  rowClassName?: TableProps<ITableData>['rowClassName']
  rowStyle?: TableProps<ITableData>['rowStyle']
  cellClassName?: TableProps<ITableData>['cellClassName']
  cellStyle?: TableProps<ITableData>['cellStyle']
  headerRowClassName?: TableProps<ITableData>['headerRowClassName']
  headerRowStyle?: TableProps<ITableData>['headerRowStyle']
  headerCellClassName?: TableProps<ITableData>['headerCellClassName']
  headerCellStyle?: TableProps<ITableData>['headerCellStyle']
  rowKey?: TableProps<ITableData>['rowKey']
  emptyText?: string
  defaultExpandAll?: boolean
  expandRowKeys?: TableProps<ITableData>['expandRowKeys']
  defaultSort?: TableProps<ITableData>['defaultSort']
  tooltipEffect?: TableProps<ITableData>['tooltipEffect']
  showSummary?: boolean
  sumText?: string
  summaryMethod?: TableProps<ITableData>['summaryMethod']
  spanMethod?: TableProps<ITableData>['spanMethod']
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  load?: TableProps<ITableData>['load']
  treeProps?: TableProps<ITableData>['treeProps']
  tableLayout?: 'fixed' | 'auto'
  scrollbarAlwaysOn?: boolean
  flexible?: boolean
}

// Table Field 属性
export interface IElTableColumnAttrs {
  // type?: "selection" | "index" | "expand"; // form 冲突
  index?: number | ((index: number) => number)
  columnKey?: string
  width?: string | number
  minWidth?: string | number
  fixed?: string | boolean
  // renderHeader?: () function({ column, $index })
  sortable?: boolean | string
  // sortMethod?: function(a, b)
  // sortBy?: function(row, index) / string / array
  // sort-orders?: array
  resizable?: boolean
  formatter?: TableColumnCtx<any>['formatter']
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
}

// Pagination 属性
export interface IElPaginationAttrs {
  small?: PaginationProps['small']
  background?: PaginationProps['background']
  pagerCount?: PaginationProps['pagerCount']
  layout?: PaginationProps['layout']
  pageSizes?: PaginationProps['pageSizes']
  popperClass?: PaginationProps['popperClass']
  prevText?: PaginationProps['prevText']
  prevIcon?: PaginationProps['prevIcon']
  nextText?: PaginationProps['nextText']
  nextIcon?: PaginationProps['nextIcon']
  // disabled?: PaginationProps['disabled']
  hideOnSinglePage?: PaginationProps['hideOnSinglePage']
}

// Dialog 属性
export interface IElDialogAttrs {
  // dialogTitle?: string;
  dialogWidth?: DialogProps['width']
  dialogFullscreen?: boolean
  dialogTop?: string
  dialogModal?: boolean
  dialogAppendToBody?: boolean
  dialogLockScroll?: boolean
  dialogCustomClass?: string
  dialogOpenDelay?: number
  dialogCloseDelay?: number
  dialogCloseOnClickModal?: boolean
  dialogCloseOnPressEscape?: boolean
  dialogShowClose?: boolean
  dialogBeforeClose?: DialogProps['beforeClose']
  dialogDraggable?: boolean
  dialogCenter?: boolean
  dialogAlignCenter?: boolean
  dialogDestroyOnClose?: boolean
}

// Crud 扩展属性
export interface ICrudAttrs extends IElTableAttrs, IElPaginationAttrs, IElDialogAttrs {
  // 序号 列
  indexColumn?: boolean
  indexColumnWidth?: boolean
  indexColumnFixed?: boolean

  // 展开 列
  expandColumn?: boolean

  // 选择 列
  selectionColumn?: boolean

  // 操作栏
  // printBtn
  // excelBtn
  // refreshBtn
  // columnBtn
  // searchShowBtn

  // 表格操作栏
  rowAction?: boolean
  rowActionWidth?: string | number
  rowActionTitle?: string
  rowActionFixed?: string
  rowActionType?: string
  rowActionHeaderAlign?: string
  rowActionAlign?: string
  // 显示新增按钮
  isCreateBtn?: boolean
  createBtnPermission?: boolean

  // 显示详情按钮 default false
  isInfoBtn?: boolean
  infoBtnDisabled?: boolean
  // 显示修改按钮
  isUpdateBtn?: boolean
  updateBtnDisabled?: boolean
  updateBtnPermission?: boolean
  // 显示删除按钮
  isDeleteBtn?: boolean
  deleteBtnDisabled?: boolean
  deleteBtnPermission?: boolean

  // 共用属性
  align?: TableColumnCtx<any>['align']

  headerAlign?: TableColumnCtx<any>['headerAlign']
}

export interface ICrudColumnAttrs extends IElTableColumnAttrs {
  prop: string
  label: string
  type: IFieldType
  dictKey?: string
  dictData?: IDictItem[]
  isTable?: boolean
  isTableVisible?: boolean
  tableSlot?: boolean
}

// CRUD 属性
export type ICrudProps = ExtractPropTypes<typeof crudProps>

// CRUD option 属性
export type ICrudOption = ICrudProps['option']

// CRUD 事件
export type ICrudEmits = typeof crudEmits

// CRUD 组件实例
export type ICrud = InstanceType<typeof Crud>
