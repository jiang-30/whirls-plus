import type { ExtractPropTypes, PropType } from "vue";
import type Table from "./table.vue";
import type { tableProps, tableEmits } from "./table";
import type {} from "element-plus";

// table 属性
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

// table columns 属性
export interface ITableColumnAttrs {
  type?: "selection" | "index" | "expand";
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

export type TableFields = {
  prop: string;
  label: string;
};

export type PageModel = {
  current: number;
  size: number;
  total: number;
};

export type TableData = Record<string, any>;

export type TableProps = ExtractPropTypes<typeof tableProps>;

export type TableEmits = typeof tableEmits;

export type TableInstance = InstanceType<typeof Table>;
