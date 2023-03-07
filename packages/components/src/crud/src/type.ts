import type { ExtractPropTypes } from "vue";
import type { TableProps, TableColumnCtx, DialogProps } from "element-plus";
import type { crudProps, crudEmits } from "./crud";
import type Crud from "./crud.vue";
import type { IFieldType, IDict } from "../../typings";

// 表格数据类型
export type ITableData = Record<string, any>;

// Pagination model 数据
export type IPageModel = {
  current: number;
  size: number;
  total: number;
};

// {
//   method: "get";
//   url: "/admin/dict";
//   data: ''
// };
export interface ICrudApi {
  list?: string;
  page?: string;
  info?: string;
  create?: string;
  update?: string;
  delete?: string;
}

// Table 属性
export interface IElTableAttrs {
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: "large" | "default" | "small";
  fit?: boolean;
  showHeader?: boolean;
  highlightCurrentRow?: boolean;
  currentRowKey?: TableProps<ITableData>["currentRowKey"];
  // row-class-name?: function({ row, rowIndex }) / string
  // row-style?: function({ row, rowIndex }) / object
  // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // header-row-class-name?: function({ row, rowIndex }) / string
  // header-row-style?: function({ row, rowIndex }) / object
  // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  rowKey?: string; //function(row) / string
  emptyText?: string;
  defaultExpandAll?: boolean;
  // expand-row-keys: array
  // default-sort: object
  tooltipEffect?: "dark" | "light";
  showSummary?: boolean;
  sumText?: string;
  // summaryMethod?: function({ columns, data })
  // span-method
  selectOnIndeterminate?: boolean;
  indent?: number;
  lazy?: boolean;
  // load?: function(row, treeNode, resolve)
  // tree-props
  tableLayout?: "fixed" | "auto";
  scrollbarAlwaysOn?: boolean;
}

// Table Field 属性
export interface IElTableColumnAttrs {
  // type?: "selection" | "index" | "expand"; // form 冲突
  index?: number | ((index: number) => number);
  columnKey?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: string | boolean;
  // renderHeader?: () function({ column, $index })
  sortable?: boolean | string;
  // sortMethod?: function(a, b)
  // sortBy?: function(row, index) / string / array
  // sort-orders?: array
  resizable?: boolean;
  formatter?: TableColumnCtx<any>["formatter"];
  showOverflowTooltip?: boolean;
  align?: string;
  headerAlign?: string;
  className?: string;
  labelClassName?: string;
  // filters?: array[{ text, value }]
  // filter-placement
  // filter-multiple
  // filter-method
  // filtered-value
}

// Pagination 属性
export interface IElPaginationAttrs {
  // pageSizes: [10, 20, 50, 100],
  // background: true,
  // layout: ' ->, total, sizes, prev, pager, next, jumper',
}

// Dialog 属性
export interface IElDialogAttrs {
  // dialogTitle?: string;
  dialogWidth?: DialogProps["width"];
  dialogFullscreen?: boolean;
  dialogTop?: string;
  dialogModal?: boolean;
  dialogAppendToBody?: boolean;
  dialogLockScroll?: boolean;
  dialogCustomClass?: string;
  dialogOpenDelay?: number;
  dialogCloseDelay?: number;
  dialogCloseOnClickModal?: boolean;
  dialogCloseOnPressEscape?: boolean;
  dialogShowClose?: boolean;
  dialogBeforeClose?: DialogProps["beforeClose"];
  dialogDraggable?: boolean;
  dialogCenter?: boolean;
  dialogAlignCenter?: boolean;
  dialogDestroyOnClose?: boolean;
}

// Crud 扩展属性
export interface ICrudAttrs
  extends IElTableAttrs,
  IElPaginationAttrs,
  IElDialogAttrs {
  // 序号 列
  indexColumn?: boolean;
  indexColumnWidth?: boolean;
  indexColumnFixed?: boolean;

  // 展开 列
  expandColumn?: boolean;

  // 选择 列
  selectionColumn?: boolean;

  // 操作栏
  // printBtn
  // excelBtn
  // refreshBtn
  // columnBtn
  // searchShowBtn

  // 表格操作栏
  rowAction?: boolean;
  rowActionWidth?: string | number;
  rowActionTitle?: string;
  rowActionFixed?: string;
  rowActionType?: string;
  rowActionHeaderAlign?: string;
  rowActionAlign?: string;
  // 显示新增按钮
  isCreateBtn?: boolean;
  createBtnPermission?: boolean;

  // 显示详情按钮 default false
  isInfoBtn?: boolean;
  infoBtnDisabled?: boolean;
  // 显示修改按钮
  isUpdateBtn?: boolean;
  updateBtnDisabled?: boolean;
  updateBtnPermission?: boolean;
  // 显示删除按钮
  isDeleteBtn?: boolean;
  deleteBtnDisabled?: boolean;
  deleteBtnPermission?: boolean;

  // 共用属性
  align?: TableColumnCtx<any>["align"];

  headerAlign?: TableColumnCtx<any>["headerAlign"];
}

export interface ICrudColumnAttrs extends IElTableColumnAttrs {
  prop: string;
  label: string;
  type: IFieldType;
  dictKey?: string;
  dictData?: IDict[];
  isTable?: boolean;
  isTableVisible?: boolean;
  tableSlot?: boolean;
}

// CRUD 属性
export type ICrudProps = ExtractPropTypes<typeof crudProps>;

// CRUD option 属性
export type ICrudOption = ICrudProps["option"];

// CRUD 事件
export type ICrudEmits = typeof crudEmits;

// CRUD 组件实例
export type ICrud = InstanceType<typeof Crud>;
