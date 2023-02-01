interface IInfoAttrs {
  border?: boolean
  column?: number
  direction?: 'vertical' | 'horizontal'
  size?: 'large' | 'default' | 'small'
  title?: string
  extra?: string
}

interface IInfoItemAttrs {
  label?: string
  span?: number
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  labelAlign?: 'left' | 'center' | 'right'
  className?: string
  labelClassName?: string
}

// interface IInfoItemField {
//   label: string
//   prop: string
//   isInfo: boolean
//   infoItemAttrs?: IInfoItemAttrs
// }

const infoAttrsKey: (keyof IInfoAttrs)[] = [
  "border",
  "column",
  'direction',
  'size',
  // 'title',
  'extra',
]

const infoItemAttrsKey: (keyof IInfoItemAttrs)[] = [
  // "label",
  // 'span',
  // 'width',
  // 'minWidth',
  // 'align',
  'labelAlign',
  // 'className',
  // 'labelClassName',
]

/**
 * 属性
 * column: 24
 */
export function useInfoAttrsFormatter(option: any, defaultConfig: IInfoAttrs = {}): IInfoAttrs {
  const infoAttrs: IInfoAttrs = {
    ...defaultConfig
  }
  if(option.span) {
    infoAttrs.column = 24 / option.span
  }
  infoAttrsKey.forEach(key => {
    if(key in option) {
      infoAttrs[key] = option[key]
    }
  })


  return infoAttrs
}

/**
 * 字段
 */
export function useInfoFieldsFormatter(option: any, defaultConfig: IInfoItemAttrs = {}): any {
  const infoitemFields: any[] = []
  option.fields.forEach((item: any) => {
    if(item.isInfo !== false) {
      const infoItemAttrs: IInfoItemAttrs = {
        ...defaultConfig
      }

      infoItemAttrsKey.forEach(key => {
        if(key in item) {
          infoItemAttrs[key] = item[key]
        }
      })
      if(option.labelAlign) {
        infoItemAttrs.labelAlign = option.labelAlign ?? item.labelAlign
      }

      infoitemFields.push({
        ...item,
        __infoItemAttrs: infoItemAttrs
      })
    }
  })
  return infoitemFields
}
