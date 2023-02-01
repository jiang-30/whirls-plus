import type { ExtractPropTypes, PropType } from "vue";
import type Table from "./table.vue";

// 属性
export const tableProps = {
  tableData: {
    type: Array as PropType<TableData[]>,
    required: true,
  },
  option: {
    type: Object as PropType<{ fields: TableFields[] }>,
    required: true,
  },
};

// 事件
export const tableEmits = {
  fetch: null,
  create: null,
  rowInfo: (row: TableData) => !!row,
  rowUpdate: (row: TableData) => !!row,
  rowDelete: (row: TableData) => !!row,
};

export interface TableFields {
  prop: string;
  label: string;
}

export type TableData = Record<string, any>;

export type TableProps = ExtractPropTypes<typeof tableProps>;

export type TableEmits = typeof tableEmits;

export type TableInstance = InstanceType<typeof Table>;
