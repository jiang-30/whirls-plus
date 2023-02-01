import type { FormItemRule } from 'element-plus'

interface ISearchFormField {
  prop: string | string[]
  label: string
  labelWidth: string | number
  required: boolean
  rules: FormItemRule | FormItemRule[]
  error: string
  showMessage: boolean
  inlineMessage: boolean
  size: 'large' | 'default' | 'small'
  isSearch?: boolean
  searchType?: string
  type?: string
}

export function searchFormFieldsFormatter(fields: any[], defaultConfig: Partial<ISearchFormField> = {}): any[] {
  /**
   * { formItemAttrs: {}, type, prop, formControlAttrs: {} }
   */
  const searchFormFields: Partial<ISearchFormField>[] = []
  const keys: (keyof ISearchFormField)[] = [
    'prop',
    'label',
    'labelWidth',
    'required',
    'rules',
    'error',
    'showMessage',
    'inlineMessage',
    'size',
  ]
  // formItemKeys
  // type input | select | date | daterange |
  // formControlKeys

  fields.forEach(item => {
    if (item.isSearch === true) {
      const field: Partial<ISearchFormField> = {
        ...defaultConfig,
      }

      keys.forEach(key => {
        if (key in item) {
          field[key] = item[key]
        }
      })

      searchFormFields.push(field)
    }
  })

  return searchFormFields
}
