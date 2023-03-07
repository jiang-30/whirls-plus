<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :disabled="loading"
    v-bind="__formAttrs"
  >
    <!-- 分区域、分步骤、分TAB -->
    <section>
      <el-row :gutter="10">
        <el-col
          v-for="field in _formFields"
          :key="field.prop"
          :span="field.span"
        >
          <FormItem :field="field" :form-model="formModel" />
        </el-col>
      </el-row>
    </section>

    <footer style="text-align: right; margin-top: 30px">
      <el-button
        type="primary"
        :icon="CircleCheck"
        :loading="loading"
        @click="_onConfirm"
      >
        确定
      </el-button>
      <el-button
        type="warning"
        :icon="RefreshLeft"
        :disabled="loading"
        @click="_onReset"
      >
        重置
      </el-button>
      <el-button
        v-if="onCancel"
        type="default"
        :icon="CircleClose"
        :disabled="loading"
        @click="_onCancel"
      >
        取消
      </el-button>
    </footer>
  </el-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { FormInstance } from "element-plus";
import { RefreshLeft, CircleClose, CircleCheck } from "@element-plus/icons-vue";
import FormItem from "./form-item.vue";
import { formProps, formEmits } from "./form";
import { useFormOption } from "./utils";

defineOptions({ name: "WForm" });
const props = defineProps(formProps);
const emits = defineEmits(formEmits);

// 组件数据
const loading = ref(false);
const formRef = ref<FormInstance>();
const { __formFields, __formAttrs } = useFormOption(props.option);

// 设置默认值 --- 初始化还是监听
watch(
  __formFields,
  (fields) => {
    fields.forEach((field) => {
      if (props.formModel) {
        props.formModel[field.prop] =
          props.formModel[field.prop] ?? field.default;
      }
    });
    console.log("watch form option change");
  },
  {
    deep: true,
    immediate: true,
  }
);
// 动态条件过滤
const _formFields = computed(() => {
  return __formFields.value.filter((field) => {
    if (field.listen) {
      if (field.listen.show) {
        return Object.keys(field.listen.show).every(
          (key) => field.listen.show[key] === props.formModel[key]
        );
      }

      if (field.listen.hide) {
        return !Object.keys(field.listen.hide).every((key) => {
          return field.listen.hide[key] == props.formModel[key];
        });
      }
    }

    return true;
  });
});

// watch(_formFields.value.length, () => {})
// 结束loading
const done = (flag: boolean) => {
  loading.value = false;
  if (flag && props.onSuccess) {
    props.onSuccess();
  }
};

// 取消
const _onCancel = () => {
  if (props.onCancel) {
    props.onCancel();
  }
};

// 重置
const _onReset = () => {
  formRef.value?.resetFields();
  if (props.onReset) {
    props.onReset();
  }
};

// 确认
const _onConfirm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (props.onConfirm) {
        loading.value = true;
        props.onConfirm(props.formModel, done);
      } else {
        console.error("onConfirm");
      }
    }
  });
};
</script>
