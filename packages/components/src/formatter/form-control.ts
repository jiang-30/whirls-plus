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
  'validate-event'
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
  'input-style'
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
  'validate-event'
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
  'validate-event'
]
const checkboxButtonAttrsKey = [
  'true-label',
  'false-label',
  'disabled',
  'name',
  'checked',
]


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
  'validate-event'
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

const treeSelectAttrsKey = [
  ...selectAttrsKey,
  ...treeAttrsKey
]

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
  'before-change'
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
  'teleported'
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
  'teleported'
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
  'teleported'
]




export function useInputAttrsFormatter(field: any, defaultConfig: any = {}): any {

  const attrs: any = {
    ...defaultConfig,
  }

  inputAttrsKey.forEach(key => {
    if(key in field) {
      attrs[key] = field.key
    }
  })

  return attrs
}
