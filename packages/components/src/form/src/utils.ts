import { computed } from "vue";
import type { IFormProps, IFormAttrs } from "./type";

// 表单数据(属性和事件) - 用户数据 - 默认数据 - 用户默认数据
export const useFormOption = (
  option: Exclude<IFormProps["option"], undefined>
) => {
  // 搜索表单属性
  const _searchFormAttrs = computed<IFormAttrs>(() => {
    return {
      inline: true,
    };
  });

  const _searchFormFields = computed(() => {
    const fields: any[] = [];

    option.fields.forEach((field) => {
      if (field.isSearch === true) {
        fields.push({
          prop: field.prop,
          label: field.label,
          type: field.type,
          span: field.span,
          hint: field.hint,
          default: field.searchDefault ?? field.default,
          _attrs: {
            labelWidth: field.labelWidth,
            required: field.required,
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

  const _formAttrs = computed<IFormAttrs>(() => {
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

  const _formFields = computed(() => {
    const fields: any[] = [];

    option.fields.forEach((field) => {
      fields.push({
        prop: field.prop,
        label: field.label,
        type: field.type,
        span: field.span,
        hint: field.hint,
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
    });

    return fields;
  });

  return {
    _formAttrs,
    _formFields,
    _searchFormAttrs,
    _searchFormFields,
  };
};
