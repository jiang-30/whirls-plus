import type { ICrudOption } from './index'

export const option: ICrudOption = {
  // =========================================== ElTable Props ===========================================
  // height: ;
  // maxHeight?: string | number;
  stripe: true,
  border: true,
  size: 'default',
  // fit?: boolean;
  showHeader: true,
  // highlightCurrentRow
  // currentRowKey
  // row-class-name?: function({ row, rowIndex }) / string
  // row-style?: function({ row, rowIndex }) / object
  // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // header-row-class-name?: function({ row, rowIndex }) / string
  // header-row-style?: function({ row, rowIndex }) / object
  // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // rowKey?: string
  // emptyText?: string;
  // defaultExpandAll?: boolean;
  // expand-row-keys: array
  // default-sort: object
  // tooltipEffect?: "dark" | "light";
  // showSummary?: boolean;
  // sumText?: string;
  // summaryMethod?: function({ columns, data })
  // span-method
  // selectOnIndeterminate?: boolean;
  // indent?: number;
  // lazy?: boolean;
  // load?: function(row, treeNode, resolve)
  // tree-props
  // tableLayout?: "fixed" | "auto";
  // scrollbarAlwaysOn?: boolean;

  // =========================================== ElPagination Props ===========================================
  // small false
  // background true
  // pagerCount 7
  // layout
  // pageSizes [10, 20, 30, 40, 50, 100]
  // popperClass
  // prevText
  // prevIcon
  // nextText
  // nextIcon
  // disabled
  // hideOnSinglePage true

  // =========================================== ElDialog Props ===========================================
  // dialogTitle 定制设置
  // dialogWidth 800
  // dialogFullscreen 	false
  // dialogTop 15vh
  // dialogModal 	true
  // dialogAppendToBody true
  // dialogLockScroll true
  // dialogCustomClass
  // dialogOpenDelay
  // dialogCloseDelay
  // dialogCloseOnClickModal 定制设置
  // dialogCloseOnPressEscape true
  // dialogShowClose true
  // dialogBeforeClose
  // dialogDraggable false
  // dialogCenter false
  // dialogAlignCenter false
  // dialogDestroyOnClose true

  // =========================================== ElInfo Props ===========================================
  // infoColumn 固定
  // infoBorder true
  // infoDirection horizontal
  // infoSize default
  // infoTitle
  // infoExtra

  // =========================================== ElForm Props ===========================================
  // rules
  // inline
  // labelPosition right
  // labelWidth
  // labelSuffix
  // hideRequiredAsterisk
  // requireAsteriskPosition
  // showMessage
  // inlineMessage
  // statusIcon
  // validateOnRuleChange
  // formSize - size
  // disabled 定制
  // scrollToError

  // =========================================== SearchForm Props ===========================================
  // searchLabelWidth
  // searchLabelPosition
  // searchLabelSuffix
  // searchFormSize

  // =========================================== Custom Props ===========================================
  //  // 序号 列
  //  indexColumn?: boolean;
  //  indexColumnWidth?: boolean;
  //  indexColumnFixed?: boolean;

  //  // 展开 列
  //  expandColumn?: boolean;

  //  // 选择 列
  //  selectionColumn?: boolean;

  //  // 操作栏
  //  // printBtn
  //  // excelBtn
  //  // refreshBtn
  //  // columnBtn
  //  // searchShowBtn

  //  // 表格操作栏
  //  rowAction?: boolean;
  //  rowActionWidth?: string | number;
  //  rowActionTitle?: string;
  //  rowActionFixed?: string;
  //  rowActionType?: string;
  //  rowActionHeaderAlign?: string;
  //  rowActionAlign?: string;
  //  // 新增按钮
  //  isCreateBtn?: boolean;
  //  createBtnPermission?: boolean;

  //  // 详情按钮
  //  isInfoBtn?: boolean;
  //  infoBtnDisabled?: boolean;
  //  // 修改按钮
  //  isUpdateBtn?: boolean;
  //  updateBtnDisabled?: boolean;
  //  updateBtnPermission?: boolean;
  //  // 删除按钮
  //  isDeleteBtn?: boolean;
  //  deleteBtnDisabled?: boolean;
  //  deleteBtnPermission?: boolean;

  //  // 共用属性
  //  align?: TableColumnCtx<any>["align"];

  //  headerAlign?: TableColumnCtx<any>["headerAlign"];

  fields: [],
}

const field = {
  // // type?: "selection" | "index" | "expand"; // form 冲突
  // index?: number | ((index: number) => number)
  // columnKey?: string
  // width?: string | number
  // minWidth?: string | number
  // fixed?: string | boolean
  // // renderHeader?: () function({ column, $index })
  // sortable?: boolean | string
  // // sortMethod?: function(a, b)
  // // sortBy?: function(row, index) / string / array
  // // sort-orders?: array
  // resizable?: boolean
  // formatter?: TableColumnCtx<any>['formatter']
  // showOverflowTooltip?: boolean
  // align?: string
  // headerAlign?: string
  // className?: string
  // labelClassName?: string
  // // filters?: array[{ text, value }]
  // // filter-placement
  // // filter-multiple
  // // filter-method
  // // filtered-value
}
