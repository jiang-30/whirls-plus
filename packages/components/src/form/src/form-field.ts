import { defineComponent, h, resolveComponent } from "vue";

export default defineComponent({
  name: "FormField",
  props: {
    field: {
      type: Object,
      required: true,
    },
    formModel: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    // const prop = props.field.prop;
    // const type = props.field.type;

    switch (props.field.type) {
      case "input": // ElInput
        const attrs = {
          placeholder: `请输入${props.field.label}`,
          modelValue: props.formModel[props.field.prop],
          "onUpdate:modelValue": (value: string) => {
            console.log(props.field.prop, value);
            props.formModel[props.field.prop] = value;
          },
        };
        return () => h(resolveComponent("ElInput"), attrs);
      case "select": // ElSelect
        return () =>
          h(resolveComponent("ElSelect"), {
            modelValue: props.formModel[props.field.prop],
            "onUpdate:modelValue": (value: string) => {
              console.log(value);
              props.formModel[props.field.prop] = value;
            },
          });
      default:
        return () => h(resolveComponent("ElSelect"));
    }
  },
});
