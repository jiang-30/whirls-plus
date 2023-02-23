import type { ExtractPropTypes } from "vue";
import type {} from "element-plus";
import type { crudProps, crudEmits } from "./crud";
import type Crud from "./crud.vue";

// Crud 扩展属性
export interface ICrudAttrs {
  // 表格操作栏
  // 操作栏
}

// Table 属性
export interface ITableAttrs {
  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: "large" | "default" | "small";
  fit?: boolean;
  showHeader?: boolean;
  highlightCurrentRow?: boolean;
  // current-row-key?: string | number
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
export interface ITableFieldAttrs {
  prop: string;
  label: string;

  dictKey?: string;
  isTable?: boolean;
  tableSlot?: boolean;

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
  // formatter?: function(row, column, cellValue, index)
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

// Dialog 属性
export interface IDialogAttrs {
  title?: string;
  width?: string | number;
  fullscreen?: boolean;
  top?: string;
  modal?: boolean;
  appendToBody?: boolean;
  lockScroll?: boolean;
  customClass?: string;
  openDelay?: number;
  closeDelay?: number;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
  beforeClose?: (done: () => {}) => void;
  draggable?: boolean;
  center?: boolean;
  destroyOnClose?: boolean;
}

// Pagination model 数据
export type IPageModel = {
  current: number;
  size: number;
  total: number;
};

// 表格数据类型
export type ITableData = Record<string, any>;

// CRUD 属性
export type ICrudProps = ExtractPropTypes<typeof crudProps>;

// CRUD option 属性
export type ICrudOption = ICrudProps["option"];

// CRUD 事件
export type ICrudEmits = typeof crudEmits;

// CRUD 组件实例
export type ICrud = InstanceType<typeof Crud>;
