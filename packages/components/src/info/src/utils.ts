import { computed } from 'vue'
import type { IInfoOption } from './type'
import { omitProperty, tools, fetchDict, dictData } from '../../utils'

export const useInfoOption = (option: IInfoOption) => {
  const defaultAttrs = tools.defaultAttrs
  const defaultFieldAttrs = tools.defaultFieldAttrs

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
    console.log('generate info fields')
    const fields: any[] = []
    option.fields.forEach(field => {
      if (field.isInfo !== false) {
        let _dictData = field.dictData
        if (field.dictUrl) {
          fetchDict(field.dictUrl, defaultFieldAttrs.props ?? field.props)
          _dictData = field.dictData ?? dictData(field.dictUrl).value
        }

        fields.push({
          label: field.label,
          prop: field.prop,
          type: field.type,
          span: field.span ?? option.span ?? 24,
          multiple: field.multiple,
          __props: {
            ...(defaultFieldAttrs.props ?? {}),
            ...(field.props ?? {}),
          },
          __dictData: _dictData,
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
