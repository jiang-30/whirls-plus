import type { ICrudOption } from "./index";

export const option: ICrudOption = {
  // =========================================== ElTable Props ===========================================
  // height: ;
  // maxHeight?: string | number;
  stripe: true,
  border: true,
  size: "default",
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
  // small
  // background
  // pagerCount
  // layout
  // pageSizes
  // popperClass
  // prevText
  // prevIcon
  // nextText
  // nextIcon
  // disabled
  // hideOnSinglePage

  // =========================================== ElPagination Props ===========================================
  // dialogTitle?: string;
  // dialogWidth
  // dialogFullscreen
  // dialogTop
  // dialogModal
  // dialogAppendToBody
  // dialogLockScroll
  // dialogCustomClass
  // dialogOpenDelay
  // dialogCloseDelay
  // dialogCloseOnClickModal
  // dialogCloseOnPressEscape
  // dialogShowClose
  // dialogBeforeClose
  // dialogDraggable
  // dialogCenter
  // dialogAlignCenter
  // dialogDestroyOnClose

  // =========================================== ElInfo Props ===========================================
  // infoBorder
  // infoColumn
  // infoDirection
  // infoSize
  // infoTitle
  // infoExtra

  // =========================================== ElForm Props ===========================================
  // inline
  // labelPosition
  // labelWidth
  // labelSuffix
  // hideRequiredAsterisk
  // showMessage
  // inlineMessage
  // statusIcon
  // validateOnRuleChange
  // size
  // scrollToError

  // =========================================== SearchForm Props ===========================================
  // searchLabelWidth
  // searchLabelPosition

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
  //  // 显示新增按钮
  //  isCreateBtn?: boolean;
  //  createBtnPermission?: boolean;

  //  // 显示详情按钮 default false
  //  isInfoBtn?: boolean;
  //  infoBtnDisabled?: boolean;
  //  // 显示修改按钮
  //  isUpdateBtn?: boolean;
  //  updateBtnDisabled?: boolean;
  //  updateBtnPermission?: boolean;
  //  // 显示删除按钮
  //  isDeleteBtn?: boolean;
  //  deleteBtnDisabled?: boolean;
  //  deleteBtnPermission?: boolean;

  //  // 共用属性
  //  align?: TableColumnCtx<any>["align"];

  //  headerAlign?: TableColumnCtx<any>["headerAlign"];

  fields: [],
};
