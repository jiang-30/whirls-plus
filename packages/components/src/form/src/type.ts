import type { ExtractPropTypes } from 'vue'
import type { FormProps, FormItemProps } from 'element-plus'
import type { IDictItem, IFieldBaseAttrs } from '../../typings'
import type { formProps, formEmits } from './form'
import type { searchFormProps, searchFormEmits } from './search-form'
import type Form from './form.vue'
import type SearchForm from './search-form.vue'

// 表单数据
export type IFormModel = Record<string, any>

// 表单类型
export type IFormType = undefined | 'create' | 'update'

// 传递给 ElForm 组件的属性
export interface IElFormAttrs {
  rules?: FormProps['rules']
  inline?: FormProps['inline']
  labelPosition?: FormProps['labelPosition']
  labelWidth?: FormProps['labelWidth']
  labelSuffix?: FormProps['labelSuffix']
  hideRequiredAsterisk?: FormProps['hideRequiredAsterisk']
  requireAsteriskPosition?: FormProps['requireAsteriskPosition']
  showMessage?: FormProps['showMessage']
  inlineMessage?: FormProps['inlineMessage']
  statusIcon?: FormProps['statusIcon']
  validateOnRuleChange?: FormProps['validateOnRuleChange']
  formSize?: FormProps['size']
  scrollToError?: FormProps['scrollToError']
}

// 传递给 ElFormItem 组件的属性
export interface IElFormItemAttrs {
  labelWidth?: FormItemProps['labelWidth']
  required?: FormItemProps['required']
  rules?: FormItemProps['rules']
  error?: FormItemProps['error']
  showMessage?: FormItemProps['showMessage']
  inlineMessage?: FormItemProps['inlineMessage']
  size?: FormItemProps['size']
}

// Form 属性 ElFormAttrs
export interface IFormAttrs extends IElFormAttrs {
  // 配置默认formItem span
  span?: number
}

// isCreateForm isUpdateForm disabled createDisabled updateDisabled
// Form Field 属性
export interface IFormItemAttrs extends IFieldBaseAttrs, IElFormItemAttrs {
  // 默认值
  default?: any
  isForm?: boolean
  // 插槽
  formSlot?: boolean
  // 动态响应
  listen?: any
  // 布局
  span?: number
  // 提示信息
  hint?: string
  // 字典Key
  dictKey?: string
  // 字典数据
  dictData?: IDictItem[]
}

// Search Form
export interface ISearchFormAttrs extends IFormAttrs {
  searchLabelWidth?: FormProps['labelWidth']
  searchLabelPosition?: FormProps['labelPosition']
  searchLabelSuffix?: FormProps['labelSuffix']
  searchFormSize?: FormProps['size']
}

export interface ISearchFormItemAttrs extends IFieldBaseAttrs, IFormItemAttrs {
  isSearch?: boolean
  searchDefault?: any
  searchRules?: string
  searchSlot?: boolean
}

// Form
export type IForm = InstanceType<typeof Form>

export type IFormEmits = typeof formEmits

export type IFormProps = ExtractPropTypes<typeof formProps>

export type IFormOption = IFormProps['option']

// Search Form
export type ISearchForm = InstanceType<typeof SearchForm>

export type ISearchFormEmits = typeof searchFormEmits

export type ISearchFormProps = ExtractPropTypes<typeof searchFormProps>

export type ISearchFormOption = ISearchFormProps['option']

// ==========================================  form control  ==========================================

export interface IFormItemBaseAttrs {
  clearable?: boolean
}

export interface IFormItemTreeAttrs extends IFormItemBaseAttrs {
  // "empty-text",
  nodeKey?: string
  valueKey?: string
  checkStrictly?: boolean
  props?: {
    label?: string
    children?: string
    disabled?: string
    isLeaf?: string
    class?: string
  }
  // "render-after-expand",
  // "load",
  // "render-content",
  // "highlight-current",
  // "default-expand-all",
  // "expand-on-click-node",
  // "check-on-click-node",
  // "auto-expand-parent",
  // "default-expanded-keys",
  // "show-checkbox",
  // "check-strictly",
  // "default-checked-keys",
  // "current-node-key",
  // "filter-node-method",
  // "accordion",
  // "indent",
  // "icon",
  // "lazy",
  // "draggable",
  // "allow-drag",
  // "allow-drop",
}

export type IFormItemControlAttrs = IFormItemTreeAttrs

const inputNumberAttrsKey = [
  'min',
  'max',
  'step',
  'step-strictly',
  'precision',
  'size',
  'disabled',
  'controls',
  'controls-position',
  'name',
  'label',
  'placeholder',
  'value-on-clear',
  'validate-event',
]

const inputAttrsKey = [
  'maxlength',
  'minlength',
  'showWordLimit',
  'placeholder',
  'clearable',
  'formatter',
  'parser',
  'show-password',
  'disabled',
  'size',
  'prefix-icon',
  'suffix-icon',
  'rows',
  'autosize',
  'autocomplete',
  'name',
  'readonly',
  'max',
  'min',
  'step',
  'resize',
  'autofocus',
  'form',
  'label',
  'tabindex',
  'validate-event',
  'input-style',
]
const inputSlotsKey = ['prefix', 'suffix', 'prepend', 'append']

const radioGroupAttrsKey = ['size', 'disabled', 'text-color', 'fill', 'validate-event']
const radioAttrsKey = ['label', 'disabled', 'border', 'size', 'name']
const radioButtonAttrsKey = ['label', 'disabled', 'name']

const checkboxGroupAttrsKey = [
  'disabled',
  'size',
  'min',
  'max',
  'label',
  'text-color',
  'fill',
  'validate-event',
]
const checkboxAttrsKey = [
  'true-label',
  'false-label',
  'disabled',
  'border',
  'size',
  'name',
  'checked',
  'indeterminate',
  'validate-event',
]
const checkboxButtonAttrsKey = ['true-label', 'false-label', 'disabled', 'name', 'checked']

const selectAttrsKey = [
  'multiple',
  'disabled',
  'value-key',
  'size',
  'clearable',
  'collapse-tags',
  'collapse-tags-tooltip',
  'multiple-limit',
  'name',
  'effect',
  'autocomplete',
  'placeholder',
  'filterable',
  'allow-create',
  'filter-method',
  'remote',
  'remote-method',
  'loading',
  'loading-text',
  'no-match-text',
  'no-data-text',
  'popper-class',
  'reserve-keyword',
  'default-first-option',
  'teleported',
  'persistent',
  'automatic-dropdown',
  'clear-icon',
  'fit-input-width',
  'suffix-icon',
  'tag-type',
  'validate-event',
]
const selectSlotsKey = ['prefix', 'empty']

const csacaderAttrsKey = [
  'props',
  'size',
  'placeholder',
  'disabled',
  'clearable',
  'show-all-levels',
  'collapse-tags',
  'collapse-tags-tooltip',
  'separator',
  'filterable',
  'filter-method',
  'debounce',
  'before-filter',
  'popper-class',
  'teleported',
  'tag-type',
  'validate-event',
]

const treeAttrsKey = [
  'empty-text',
  'node-key',
  'props',
  'render-after-expand',
  'load',
  'render-content',
  'highlight-current',
  'default-expand-all',
  'expand-on-click-node',
  'check-on-click-node',
  'auto-expand-parent',
  'default-expanded-keys',
  'show-checkbox',
  'check-strictly',
  'default-checked-keys',
  'current-node-key',
  'filter-node-method',
  'accordion',
  'indent',
  'icon',
  'lazy',
  'draggable',
  'allow-drag',
  'allow-drop',
]

const treeSelectAttrsKey = [...selectAttrsKey, ...treeAttrsKey]

const switchAttrsKey = [
  'disabled',
  'loading',
  'size',
  'width',
  'inline-prompt',
  'active-icon',
  'inactive-icon',
  'active-text',
  'inactive-text',
  'active-value',
  'inactive-value',
  'active-color',
  'inactive-color',
  'border-color',
  'name',
  'validate-event',
  'before-change',
]

const timePickerAttrsKey = [
  'readonly',
  'disabled',
  'editable',
  'clearable',
  'size',
  'placeholder',
  'start-placeholder',
  'end-placeholder',
  'is-range',
  'arrow-control',
  'popper-class',
  'range-separator',
  'format',
  'default-value',
  'id',
  'name',
  'prefix-icon',
  'clear-icon',
  'disabled-hours',
  'disabled-minutes',
  'disabled-seconds',
  'teleported',
]

const datePickerAttrsKey = [
  'readonly',
  'disabled',
  'size',
  'editable',
  'clearable',
  'placeholder',
  'start-placeholder',
  'end-placeholder',
  'type',
  'format',
  'popper-class',
  'range-separator',
  'default-value',
  'default-time',
  'value-format',
  'id',
  'name',
  'unlink-panels',
  'prefix-icon',
  'clear-icon',
  'validate-event',
  'disabled-date',
  'shortcuts',
  'cell-class-name',
  'teleported',
]

const timeDatePickerAttrsKey = [
  'readonly',
  'disabled',
  'editable',
  'clearable',
  'size',
  'placeholder',
  'start-placeholder',
  'end-placeholder',
  'time-arrow-control',
  'type',
  'format',
  'popper-class',
  'range-separator',
  'default-value',
  'default-time',
  'value-format',
  'id',
  'name',
  'unlink-panels',
  'prefix-icon',
  'clear-icon',
  'disabled-date',
  'shortcuts',
  'cell-class-name',
  'teleported',
]
