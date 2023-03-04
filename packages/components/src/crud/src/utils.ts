import { computed } from "vue";
import type { TableProps, PaginationProps, DialogProps } from "element-plus";
import type { ICrudOption } from "./type";

export const useCrudOption = (option: ICrudOption) => {
  // 分页组件 属性
  const __pageAttrs = computed<Partial<PaginationProps>>(() => {
    return {
      pageSizes: [10, 20, 50, 100],
      background: true,
      layout: " ->, total, sizes, prev, pager, next, jumper",
    };
  });

  // dialog 组件 属性
  const __dialogAttrs = computed<Partial<DialogProps>>(() => {
    return {
      width: option.dialogWidth,
      fullscreen: option.dialogFullscreen,
      top: option.dialogTop,
      modal: option.dialogModal,
      appendToBody: option.dialogAppendToBody,
      lockScroll: option.dialogLockScroll,
      openDelay: option.dialogOpenDelay,
      closeDelay: option.dialogCloseDelay,
      closeOnClickModal: option.dialogCloseOnClickModal,
      closeOnPressEscape: option.dialogCloseOnPressEscape,
      showClose: option.dialogShowClose,
      beforeClose: option.dialogBeforeClose,
      draggable: option.dialogDraggable,
      center: option.dialogCenter,
      alignCenter: option.dialogAlignCenter,
      destroyOnClose: option.dialogDestroyOnClose,
    };
  });

  // Table Attrs table props 和 event
  const __tableAttrs = computed<Omit<TableProps<any>, "data">>(() => {
    return {
      height: option.height,
      maxHeight: option.maxHeight,
      stripe: option.stripe,
      border: option.border,
      size: option.size,
      fit: option.fit,
      showHeader: option.showHeader,
      highlightCurrentRow: option.highlightCurrentRow,
      // current-row-key?: string | number
      // row-class-name?: function({ row, rowIndex }) / string
      // row-style?: function({ row, rowIndex }) / object
      // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
      // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
      // header-row-class-name?: function({ row, rowIndex }) / string
      // header-row-style?: function({ row, rowIndex }) / object
      // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
      // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
      rowKey: option.rowKey,
      emptyText: option.emptyText,
      defaultExpandAll: option.defaultExpandAll,
      // expand-row-keys: array
      // default-sort: object
      tooltipEffect: option.tooltipEffect,
      showSummary: option.showSummary,
      sumText: option.sumText,
      // summaryMethod?: function({ columns, data })
      // span-method
      selectOnIndeterminate: option.selectOnIndeterminate,
      indent: option.indent,
      lazy: option.lazy,
      // load?: function(row, treeNode, resolve)
      // tree-props
      tableLayout: option.tableLayout,
      scrollbarAlwaysOn: option.scrollbarAlwaysOn,
    };
  });

  // table column
  const __tableFields = computed(() => {
    const tableFields: any[] = [];

    option.fields.forEach((field: any) => {
      if (field.isTable !== false) {
        tableFields.push({
          prop: field.prop,
          label: field.label,
          type: field.type,
          isShow: field.isShow ?? true,
          _formatter: field.formatter,
          _dictData: field.dictData,
          __elTableColumnAttrs: {
            // 'type',
            index: field.index,
            columnKey: field.columnKey,
            width: field.width,
            minWidth: field.minWidth,
            fixed: field.fixed,
            renderHeader: field.renderHeader,
            sortable: field.sortable,
            sortMethod: field.sortMethod,
            sortBy: field.sortBy,
            sortOrders: field.sortOrders,
            resizable: field.resizable,
            formatter: field.formatter,
            showOverflowTooltip: field.showOverflowTooltip,
            align: field.align ?? option.align,
            headerAlign: field.headerAlign ?? option.headerAlign,
            className: field.className,
            labelClassName: field.labelClassName,
            filters: field.filters,
            filterPlacement: field.filterPlacement,
            filterMultiple: field.filterMultiple,
            filterMethod: field.filterMethod,
            filteredValue: field.filteredValue,
          },
        });
      }
    });

    return tableFields;
  });

  const __tableColumnActionAttrs = computed(() => {
    return {
      prop: "_action",
      label: "操作",
      align: "center",
      width: option.rowActionWidth ?? 180,
    };
  });

  return {
    __tableAttrs,
    __pageAttrs,
    __dialogAttrs,
    __tableFields,
    __tableColumnActionAttrs,
  };
};
