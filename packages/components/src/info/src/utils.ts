import { computed } from "vue";
import type { IInfoOption } from "./type";

export const useInfoOption = (option: IInfoOption) => {
  // 属性
  const __infoAttrs = computed(() => {
    return {
      border: option.border,
      // column?: number;
      // direction?: "vertical" | "horizontal";
      // size?: "large" | "default" | "small";
      // title?: string;
      // extra?: string;
    };
  });

  // 数据项
  const __infoFields = computed(() => {
    const fields: any[] = [];
    option.fields.forEach((field) => {
      if (field.isInfo !== false) {
        fields.push({
          label: field.label,
          prop: field.prop,
          type: field.type,
          span: field.span ?? option.span ?? 24,
          __itemAttrs: {
            // span?: number;
            width: option.labelWidth,
            // minWidth: 100,
            // align?: "left" | "center" | "right";
            labelAlign: field.labelAlign ?? "right",
            // className?: string;
            // labelClassName?: string;
          },
        });
      }
    });

    return fields;
  });

  return {
    __infoAttrs,
    __infoFields,
  };
};
