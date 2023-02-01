import type { FormItemRule } from 'element-plus'
import { handlerDict } from './dict'

interface IFormAttrs {
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSuffix?: string
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  inlineMessage?: boolean
  statusIcon?: boolean
  validateOnRuleChange?: boolean
  size?: 'large' | 'default' | 'small'
  scrollToError?: boolean
}

interface IFormItemAttrs {
  labelWidth?: string | number
  required?: boolean
  rules?: FormItemRule | FormItemRule[]
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  size?: 'large' | 'default' | 'small'
}

const formAttrsKey: (keyof IFormAttrs)[] = [
  "inline",
  "labelPosition",
  "labelWidth",
  "labelSuffix",
  "hideRequiredAsterisk",
  "showMessage",
  "inlineMessage",
  "statusIcon",
  "validateOnRuleChange",
  "size",
  "scrollToError",
]
const formItemAttrsKey: (keyof IFormItemAttrs)[] = ['labelWidth', 'required', 'rules', 'error', 'showMessage', 'inlineMessage', 'size']
// const formItemSlots

/**
 * 搜索项
 */
export function useSearchFormFieldsFormatter(fields: any[], defaultConfig: Partial<IFormItemAttrs> = {}): any[] {
  /**
   * { type, prop, formItemAttrs: {} }
   */
  const searchFormFields: any[] = []

  // type input | select | date | daterange |
  fields.forEach(item => {
    if (item.search === true) {
      const attrs: Partial<IFormItemAttrs> = {
        ...defaultConfig,
      }

      formItemAttrsKey.forEach(key => {
        if (key in item) {
          attrs[key] = item[key]
        }
      })

      searchFormFields.push({
        ...item,
        __dictData: item.dictData,
        __formItemAttrs: attrs,
      })
    }
  })

  return searchFormFields
}

/**
 * 属性
 */
export function useFormAttrsFormatter(prefix: string, option: any, defaultConfig: any = {}): any {
  const attrs: IFormAttrs = {}
  formAttrsKey.forEach(key => {
    if(key in option) {
      attrs[key] = option[key]
    }
  })

  return attrs
}

/**
 * 表单项
 */
export function useFormFieldsFormatter(prefix: string, option: any, defaultConfig: any = {}): any {
  const fields = option.fields.filter((item: any) => {
    if (item[prefix + 'Form'] === false) {
      return false
    }
    if (item.form === false) {
      return false
    }
    return true
  })

  return fields.map((field: any) => {
    // 表单项 form-item 属性
    const formItemAttrs: IFormItemAttrs = {}
    formItemAttrsKey.forEach(key => {
      if (key in field) {
        formItemAttrs[key] = field[key]
      }
    })

    return {
      ...field,
      __disabled: field[prefix + 'Disabled'] ?? field['disabled'] ?? false,
      __span: field.formSpan ?? field.span ?? option.span,
      __formItemAttrs: formItemAttrs,
      __defaultValue: field.updateDefault ?? field.formDefault ?? field.defaultValue,
      __dictData: handlerDict(field),
    }
  })
}

export function useFormSlotsFormatter(prefix: string, option: any) {
  const formSlots: string[] = []

  option.fields.forEach((item: any) => {
    if (item.formSlot === true) {
      formSlots.push(item.prop + 'Form')
    }
  })

  return formSlots
}
