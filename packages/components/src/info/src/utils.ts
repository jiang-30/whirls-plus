import { computed } from 'vue'
import type { IInfoOption } from './type'
import { omitProperty, tools } from '../../utils'

export const useInfoOption = (option: IInfoOption) => {
  const defaultAttrs = tools.defaultAttrs
  // 属性
  const __infoAttrs = computed(() => {
    return omitProperty({
      border: option.infoBorder ?? defaultAttrs.infoBorder,
      direction: option.infoDirection ?? defaultAttrs.infoDirection,
      size: option.infoSize ?? defaultAttrs.infoSize,
      title: option.infoTitle ?? defaultAttrs.infoTitle,
      extra: option.infoExtra ?? defaultAttrs.infoExtra,
    })
  })

  // 数据项
  const __infoFields = computed(() => {
    const fields: any[] = []
    option.fields.forEach(field => {
      if (field.isInfo !== false) {
        fields.push({
          label: field.label,
          prop: field.prop,
          type: field.type,
          span: field.span ?? option.span ?? 24,
          // __dictData: field.dictData,
          __itemAttrs: {
            // span?: number;
            width: field.infoWidth ?? option.labelWidth,
            // minWidth: 100,
            align: field.infoAlign,
            labelAlign: field.infoLabelAlign ?? option.labelAlign ?? 'right',
            // className?: string;
            // labelClassName?: string;
          },
        })
      }
    })

    return fields
  })

  return {
    __infoAttrs,
    __infoFields,
  }
}
