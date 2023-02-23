<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :disabled="loading"
    v-bind="_formAttrs"
  >
    <section>
      <el-row :gutter="10">
        <el-col
          v-for="field in _formFields"
          :key="field.prop"
          :span="field.span"
        >
          <FormItem :field="field" :form-model="formModel!" />
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
import { ref, watch } from "vue";
import { RefreshLeft, CircleClose, CircleCheck } from "@element-plus/icons-vue";
import FormItem from "./form-item.vue";
import { formProps, formEmits } from "./form";
import { useFormOption } from "./utils";
import type { FormInstance } from "element-plus";

const props = defineProps(formProps);
const emits = defineEmits(formEmits);

const loading = ref(false);
const formRef = ref<FormInstance>();
const { _formFields, _formAttrs } = useFormOption(props.option!);

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

function itemVisibleHandler(field: any, formData: any) {
  if (field.listen) {
    if (field.listen.show) {
      const keys = Object.keys(field.listen.show);
      return keys.every((key) => {
        return field.listen.show[key] == formData[key];
      });
    }

    if (field.listen.hide) {
      const keys = Object.keys(field.listen.hide);
      return !keys.every((key) => {
        return field.listen.hide[key] == formData[key];
      });
    }
  }

  return true;
}
</script>
