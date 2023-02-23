import { computed } from "vue";
import type { TableProps as ElTableProps } from "element-plus";
import type { ITableAttrs, ITableFieldAttrs, ICrudProps } from "./type";

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

const tableFieldAttrsKey: (keyof ITableFieldAttrs)[] = [
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

export const useTableOption = (
  option: Exclude<ICrudProps["option"], undefined>
) => {
  const _pageAttrs = computed(() => {
    return {
      pageSizes: [10, 20, 50, 100],
      background: true,
      layout: " ->, total, sizes, prev, pager, next, jumper",
    };
  });

  // Table Attrs table props 和 event
  const _tableAttrs = computed<Omit<ElTableProps<any>, "data">>(() => {
    const attrs: any = {};
    tableAttrsKey.forEach((key) => {
      if (key in option) {
        attrs[key] = option[key];
      }
    });
    return attrs;
  });

  // table column
  const _tableFields = computed(() => {
    const tableFields: any[] = [];

    option?.fields.forEach((item: any) => {
      if (item.isTable !== false) {
        const tableColumnAttrs: any = {};

        tableFieldAttrsKey.forEach((key) => {
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
