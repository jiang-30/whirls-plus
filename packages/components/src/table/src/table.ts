import type { PropType } from "vue";
import type { TableData, TableFields, PageModel, ITableAttrs } from "./type";

// 属性
export const tableProps = {
  tableData: {
    type: Array as PropType<TableData[]>,
    required: true,
  },
  option: {
    type: Object as PropType<ITableAttrs & { fields: TableFields[] }>,
    required: true,
  },
  pageModel: {
    type: Object as PropType<PageModel>,
  },
};

// 事件
export const tableEmits = {
  fetch: null,
  pageChange: null,
  pageCurrentChange: null,
  pageSizeChange: null,
  create: null,
  rowInfo: (row: TableData) => !!row,
  rowUpdate: (row: TableData) => !!row,
  rowDelete: (row: TableData) => !!row,
};
