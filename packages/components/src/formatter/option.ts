export const option = {
    title: '操作',
    width: 600,
    draggable: true,
    appendToBody: true,
    border: true,
    labelSuffix: '：',
    labelWidth: 100,
    span: 24,
    rowMenuWidth: 100,
    rowMenuVisible: true,
    rowDeleteButton: true, // function
    rowUpdateButton: true, // function
    rowInfoButton: true, // function
    action: true,
    createBtn: true,
    updateBtn: true,
    deleteBtn: true,
    infoBtn: true,
    // dialogTitle
    // dialogTitleUpdate
    // dialogTitleCreate
    // dialogTitleInfo
    fields: [
      {
        label: '数据结构',
        prop: 'dataType',
        type: 'radio',
        dictData: [
          { label: '列表', value: '1' },
          { label: '树', value: '2' },
        ],
        // dictKey: "",
        defaultValue: '1',
        rules: [],
        span: 12,
        search: true,
        table: true,
        info: false,
        form: true,
        createForm: true,
        updateForm: true,

        listen: {
          show: { type: '2' },
        },
      }
    ],
  }

function useOptionFormatter(option: any){
  
}


interface IOptionField {
  // =========================================== base ===========================================
  label: string
  prop: string
  type: 'input' | 'radio'
  dictData: any[]
  dictKey: string
  defaultValue: any
  rules: any[]
  span: number
  search: boolean
  table: boolean
  info: boolean
  form: boolean
  createForm: boolean
  updateForm: boolean
  disabled: boolean
  createDisabled: boolean
  updateDisabled: boolean

  // =========================================== table column ===========================================
  // type?: 'selection' | 'index' | 'expand'
  index?: number | ((index: number) => number)
  columnKey?: string
  width?: string | number
  minWidth?: string | number
  fixed?: string | boolean
  // renderHeader?: () function({ column, $index })
  sortable?: boolean | string
  // sortMethod?: function(a, b)
  // sortBy?: function(row, index) / string / array
  // sort-orders?: array
  resizable?: boolean
  // formatter?: function(row, column, cellValue, index)
  showOverflowTooltip?: boolean
  align?: string
  headerAlign?: string
  className?: string
  labelClassName?: string
  // filters?: array[{ text, value }]
  // filter-placement
  // filter-multiple
  // filter-method
  // filtered-value


  // ===========================================  info item  ===========================================
  // label?: string
  // span?: number
  // width?: string | number
  // minWidth?: string | number
  // align?: 'left' | 'center' | 'right'
  // labelAlign?: 'left' | 'center' | 'right'
  // className?: string
  // labelClassName?: string


  // =========================================== form item ===========================================
  labelWidth?: string | number
  required?: boolean
  // rules?: FormItemRule | FormItemRule[]
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: 'large' | 'default' | 'small'


}






/**
 * 
 */
interface IOption {
  // ===========================================  table  ===========================================
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  // current-row-key?: string | number
  // row-class-name?: function({ row, rowIndex }) / string
  // row-style?: function({ row, rowIndex }) / object
  // cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  // header-row-class-name?: function({ row, rowIndex }) / string
  // header-row-style?: function({ row, rowIndex }) / object
  // header-cell-class-name?: function({ row, column, rowIndex, columnIndex }) / string
  // header-cell-style?: function({ row, column, rowIndex, columnIndex }) / object
  rowKey?: string  //function(row) / string
  emptyText?: string
  defaultExpandAll?: boolean
  // expand-row-keys: array
  // default-sort: object
  tooltipEffect?: 'dark' | 'light'
  showSummary?: boolean
  sumText?: string
  // summaryMethod?: function({ columns, data })
  // span-method
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  // load?: function(row, treeNode, resolve)
  // tree-props
  tableLayout?: 'fixed' | 'auto'
  scrollbarAlwaysOn?: boolean


   // ===========================================  dialog  ===========================================
   "title"?: string
   // "width"?: string | number
   "fullscreen"?: boolean
   "top"?: string
   "modal"?: boolean
   "appendToBody"?: boolean
   "lockScroll"?: boolean
   "customClass"?: string
   "openDelay"?: number
   "closeDelay"?: number
   "closeOnClickModal"?: boolean
   "closeOnPressEscape"?: boolean
   "showClose"?: boolean
   "beforeClose"?: (done: () => {}) => void
   "draggable"?: boolean
   "center"?: boolean
   "destroyOnClose"?: boolean


  // ===========================================  info  ===========================================
  // border?: boolean
  column?: number
  direction?: 'vertical' | 'horizontal'
  // size?: 'large' | 'default' | 'small'
  // title?: string
  extra?: string

  // ===========================================  form  ===========================================
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  // size?: 'large' | 'default' | 'small'
  scrollToError?: boolean

  // ===========================================  search form  ===========================================
  // ===========================================  create form  ===========================================
  // ===========================================  update form  ===========================================



  // ===========================================  fields  ===========================================
  fields: IOptionField[]

}