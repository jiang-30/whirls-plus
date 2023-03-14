import { computed } from 'vue'
import type { TableProps, PaginationProps, DialogProps } from 'element-plus'
import type { ICrudOption } from './type'
import { omitProperty, tools, fetchDict, dictData } from '../../utils'

export const useCrudOption = (option: ICrudOption) => {
  const defaultAttrs = tools.defaultAttrs
  const defaultFieldAttrs = tools.defaultFieldAttrs
  // 分页组件 属性
  const __pageAttrs = computed<Partial<PaginationProps>>(() => {
    return omitProperty({
      small: option.small ?? defaultAttrs.small,
      background: option.background ?? defaultAttrs.background,
      pagerCount: option.pagerCount ?? defaultAttrs.pagerCount,
      layout: option.layout ?? defaultAttrs.layout,
      pageSizes: option.pageSizes ?? defaultAttrs.pageSizes,
      popperClass: option.popperClass ?? defaultAttrs.popperClass,
      prevText: option.prevText ?? defaultAttrs.prevText,
      prevIcon: option.prevIcon ?? defaultAttrs.prevIcon,
      nextText: option.nextText ?? defaultAttrs.nextText,
      nextIcon: option.nextIcon ?? defaultAttrs.nextIcon,
      hideOnSinglePage: option.hideOnSinglePage ?? defaultAttrs.hideOnSinglePage,
    })
  })

  // dialog 组件 属性
  const __dialogAttrs = computed<Partial<DialogProps>>(() => {
    return omitProperty({
      // title
      width: option.dialogWidth ?? defaultAttrs.dialogWidth,
      fullscreen: option.dialogFullscreen ?? defaultAttrs.dialogFullscreen,
      top: option.dialogTop ?? defaultAttrs.dialogTop,
      modal: option.dialogModal ?? defaultAttrs.dialogModal,
      appendToBody: option.dialogAppendToBody ?? defaultAttrs.dialogAppendToBody,
      lockScroll: option.dialogLockScroll ?? defaultAttrs.dialogLockScroll,
      CustomClass: option.dialogCustomClass ?? defaultAttrs.dialogCustomClass,
      openDelay: option.dialogOpenDelay ?? defaultAttrs.dialogOpenDelay,
      closeDelay: option.dialogCloseDelay ?? defaultAttrs.dialogCloseDelay,
      // closeOnClickModal: option.dialogCloseOnClickModal ?? defaultAttrs.dialogCloseOnClickModal,
      closeOnPressEscape: option.dialogCloseOnPressEscape ?? defaultAttrs.dialogCloseOnPressEscape,
      showClose: option.dialogShowClose ?? defaultAttrs.dialogShowClose,
      beforeClose: option.dialogBeforeClose ?? defaultAttrs.dialogBeforeClose,
      draggable: option.dialogDraggable ?? defaultAttrs.dialogDraggable,
      center: option.dialogCenter ?? defaultAttrs.dialogCenter,
      alignCenter: option.dialogAlignCenter ?? defaultAttrs.dialogAlignCenter,
      // destroyOnClose: option.dialogDestroyOnClose ?? defaultAttrs.dialogDestroyOnClose,
    })
  })

  // Table Attrs table props 和 event
  const __tableAttrs = computed<Omit<TableProps<any>, 'data'>>(() => {
    return omitProperty({
      height: option.height ?? defaultAttrs.height,
      maxHeight: option.maxHeight ?? defaultAttrs.maxHeight,
      stripe: option.stripe ?? defaultAttrs.stripe,
      border: option.border ?? defaultAttrs.border,
      size: option.size ?? defaultAttrs.size,
      fit: option.fit ?? defaultAttrs.fit,
      showHeader: option.showHeader ?? defaultAttrs.showHeader,
      highlightCurrentRow: option.highlightCurrentRow ?? defaultAttrs.highlightCurrentRow,
      currentRowKey: option.currentRowKey ?? defaultAttrs.currentRowKey,
      rowClassName: option.rowClassName ?? defaultAttrs.rowClassName,
      rowStyle: option.rowStyle ?? defaultAttrs.rowStyle,
      cellClassName: option.cellClassName ?? defaultAttrs.cellClassName,
      cellStyle: option.cellStyle ?? defaultAttrs.cellStyle,
      headerRowClassName: option.headerRowClassName ?? defaultAttrs.headerRowClassName,
      headerRowStyle: option.headerRowStyle ?? defaultAttrs.headerRowStyle,
      headerCellClassName: option.headerCellClassName ?? defaultAttrs.headerCellClassName,
      headerCellStyle: option.headerCellStyle ?? defaultAttrs.headerCellStyle,
      rowKey: option.rowKey ?? defaultAttrs.rowKey,
      emptyText: option.emptyText ?? defaultAttrs.emptyText,
      defaultExpandAll: option.defaultExpandAll ?? defaultAttrs.defaultExpandAll,
      expandRowKeys: option.expandRowKeys ?? defaultAttrs.expandRowKeys,
      defaultSort: option.defaultSort ?? defaultAttrs.defaultSort,
      tooltipEffect: option.tooltipEffect ?? defaultAttrs.tooltipEffect,
      showSummary: option.showSummary ?? defaultAttrs.showSummary,
      sumText: option.sumText ?? defaultAttrs.sumText,
      summaryMethod: option.summaryMethod ?? defaultAttrs.summaryMethod,
      spanMethod: option.spanMethod ?? defaultAttrs.spanMethod,
      selectOnIndeterminate: option.selectOnIndeterminate ?? defaultAttrs.selectOnIndeterminate,
      indent: option.indent ?? defaultAttrs.indent,
      lazy: option.lazy ?? defaultAttrs.lazy,
      load: option.load ?? defaultAttrs.load,
      treeProps: option.treeProps ?? defaultAttrs.treeProps,
      tableLayout: option.tableLayout ?? defaultAttrs.tableLayout,
      scrollbarAlwaysOn: option.scrollbarAlwaysOn ?? defaultAttrs.scrollbarAlwaysOn,
      flexible: option.flexible ?? defaultAttrs.flexible,
    })
  })

  // table column
  const __tableFields = computed(() => {
    console.log('generate table fields')

    const tableFields: any[] = []

    option.fields.forEach((field: any) => {
      if (field.isTable !== false) {
        let _dictData = field.dictData
        if (field.dictUrl) {
          fetchDict(field.dictUrl, defaultFieldAttrs.props ?? field.props)
          _dictData = field.dictData ?? dictData(field.dictUrl).value
        }

        tableFields.push({
          prop: field.prop,
          label: field.label,
          type: field.type,
          multiple: field.multiple,
          isShow: field.isShow ?? true,
          __props: {
            ...(defaultFieldAttrs.props ?? {}),
            ...(field.props ?? {}),
          },
          __formatter: field.formatter,
          __dictData: _dictData,
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
        })
      }
    })

    return tableFields
  })

  const __tableColumnActionAttrs = computed(() => {
    return {
      prop: '_action',
      label: '操作',
      align: 'center',
      width: option.rowActionWidth ?? 180,
    }
  })

  return {
    __tableAttrs,
    __pageAttrs,
    __dialogAttrs,
    __tableFields,
    __tableColumnActionAttrs,
  }
}
