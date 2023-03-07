import { computed } from "vue";
import type { FormProps, FormItemProps } from "element-plus";
import type {
  IFormOption,
  IFormAttrs,
  ISearchFormOption,
  ISearchFormAttrs,
} from "./type";

// 表单数据(属性和事件) - 用户数据 - 默认数据 - 用户默认数据
export const useFormOption = (option: IFormOption) => {
  const __formAttrs = computed<Partial<FormProps>>(() => {
    return {
      inline: option.inline,
      labelPosition: option.labelPosition,
      labelWidth: option.labelWidth,
      labelSuffix: option.labelSuffix,
      hideRequiredAsterisk: option.hideRequiredAsterisk,
      showMessage: option.showMessage,
      inlineMessage: option.inlineMessage,
      statusIcon: option.statusIcon,
      validateOnRuleChange: option.validateOnRuleChange,
      size: option.size,
      scrollToError: option.scrollToError,
    };
  });

  const __formFields = computed<
    {
      [key: string]: any;
      _attrs: Partial<FormItemProps>;
    }[]
  >(() => {
    const fields: any[] = [];

    option.fields.forEach((field) => {
      if (field.isForm !== false) {
        fields.push({
          prop: field.prop,
          label: field.label,
          type: field.type,
          span: field.span,
          hint: field.hint,
          listen: field.listen,
          default: field.default,
          __dictData: field.dictData,
          _attrs: {
            labelWidth: field.labelWidth,
            required: field.required,
            rules: field.rules,
            error: field.error,
            showMessage: field.showMessage,
            inlineMessage: field.inlineMessage,
            size: field.size,
          },
        });
      }
    });

    return fields;
  });

  return {
    __formAttrs,
    __formFields,
  };
};

export const useSearchFormOption = (option: ISearchFormOption) => {
  // 搜索表单属性
  const _searchFormAttrs = computed<Partial<FormProps>>(() => {
    return {
      inline: true,
    };
  });

  // 搜索表单项
  const _searchFormFields = computed(() => {
    const fields: { [key: string]: any; _itemAttrs: Partial<FormItemProps> }[] =
      [];

    option.fields.forEach((field) => {
      if (field.isSearch === true) {
        fields.push({
          prop: field.prop,
          label: field.label,
          type: ["radio", "radioButton"].includes(field.type)
            ? "select"
            : field.type,
          hint: field.hint,
          default: field.searchDefault ?? field.default,
          __dictData: field.dictData,
          _itemAttrs: {
            labelWidth: field.labelWidth!,
            required: field.required,
            error: field.error,
            size: field.size,
          },
        });
      }
    });

    return fields;
  });

  return {
    _searchFormAttrs,
    _searchFormFields,
  };
};
