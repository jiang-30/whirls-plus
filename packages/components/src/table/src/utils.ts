import { computed, useAttrs } from "vue";
import type { TableProps, TableFields } from "./table";

interface ITableAttrs {
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

interface ITableColumnAttrs {
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

const tableAttrsKey: (keyof ITableAttrs)[] = [
  "height",
  "maxHeight",
  "stripe",
  "border",
  "size",
  "fit",
  "showHeader",
  "highlightCurrentRow",
  // current-row-key?: string | number
  // row-class-name?: function({ row, rowIndex }) / string
  // row-style?: function({ row, rowIndex }) / object
  // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // header-row-class-name?: function({ row, rowIndex }) / string
  // header-row-style?: function({ row, rowIndex }) / object
  // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  "rowKey",
  "emptyText",
  "defaultExpandAll",
  // expand-row-keys: array
  // default-sort: object
  "tooltipEffect",
  "showSummary",
  "sumText",
  // summaryMethod?: function({ columns, data })
  // span-method
  "selectOnIndeterminate",
  "indent",
  "lazy",
  // load?: function(row, treeNode, resolve)
  // tree-props
  "tableLayout",
  "scrollbarAlwaysOn",
];

const tableColumnAttrsKey: (keyof ITableColumnAttrs)[] = [
  // 'type',
  "index",
  "columnKey",
  "width",
  "minWidth",
  "fixed",
  // renderHeader?: function({ column, $index })
  "sortable",
  // sortMethod?: function(a, b)
  // sortBy?: function(row, index) / string / array
  // sort-orders?: array
  "resizable",
  // formatter?: function(row, column, cellValue, index)
  "showOverflowTooltip",
  "align",
  "headerAlign",
  "className",
  "labelClassName",
  // filters?: array[{ text, value }]
  // filter-placement
  // filter-multiple
  // filter-method
  // filtered-value
];

/**
 * table attribute 表格属性
 */
export function useTableAttrsFormatter(
  option: any,
  defaultConfig: ITableAttrs = {}
): ITableAttrs {
  const attrs: ITableAttrs = {
    ...defaultConfig,
  };
  tableAttrsKey.forEach((key) => {
    if (key in option) {
      attrs[key] = option[key];
    }
  });
  return attrs;
}

/**
 * table fields 表格项信息
 */
export function useTableFieldsFormatter(
  fields: any[],
  defaultConfig: ITableColumnAttrs = {}
): any[] {
  const tableFields: any[] = [];

  fields.forEach((item) => {
    if (item.table !== false) {
      const tableColumnAttrs: ITableColumnAttrs = {
        ...defaultConfig,
      };

      tableColumnAttrsKey.forEach((key) => {
        if (key in item) {
          tableColumnAttrs[key] = item[key];
        }
      });

      tableFields.push({
        ...item,
        __tableColumnAttrs: tableColumnAttrs,
        // __dictData: handlerDict(item)
      });
    }
  });

  return tableFields;
}

/**
 * table Menu
 */
export function useTableMenuFormatter(option: any, defaultConfig: any): any {
  return {
    createAction: false,
    createText: "新建",
  };
}

/**
 * table RowMenu
 */
const tableRowMenuAttrsKey = [
  "rowMenuWidth",
  "rowMenuAlign",
  "rowMenuLabel",
  "rowMenu",
  // 'deleteBtn',
  // 'updateBtn',
  // 'infoBtn'
];
export function useTableRowMenuAttrsFormatter(option: any) {
  const defaultConfig = {
    rowMenuWidth: 210,
    rowMenuAlign: "center",
    rowMenuLabel: "操作",
    rowMenu: true,
    // deleteBtn: true, // function
    // updateBtn: true, // function
    // infoBtn: true, // function
  };

  const rowMenuAttrs: { [key: string]: any } = {
    ...defaultConfig,
  };

  tableRowMenuAttrsKey.forEach((key) => {
    if (key in option) {
      rowMenuAttrs[key] = option[key];
    }
  });

  return rowMenuAttrs;
}

// el-pagination 属性
const pageKeys = [
  "small",
  "background",
  "pagerCount",
  "layout",
  "pageSizes",
  "hideOnSinglePage",
];

export const useTableOption = (option: TableProps["option"]) => {
  const attrs = useAttrs();
  const _pageAttrs = computed(() => {
    return {
      pageSizes: [10, 20, 50, 100],
      background: true,
      layout: " ->, total, sizes, prev, pager, next, jumper",
    };
  });

  const _tableAttrs = computed(() => {
    return {
      onRowClick: attrs.onRowClick,
    };
  });

  const _tableFields = computed(() => {
    return option?.fields;
  });

  const _tableColumnActionAttrs = computed(() => {
    return {
      prop: "_action",
      label: "操作",
      align: "center",
    };
  });

  return {
    _pageAttrs,
    _tableAttrs,
    _tableFields,
    _tableColumnActionAttrs,
  };
};
