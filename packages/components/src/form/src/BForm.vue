<template>
  <el-form
    class="b-form"
    ref="formRef"
    :model="formData"
    :disabled="loading"
    v-bind="formAttrs"
  >
    <el-row :gutter="10">
      <template v-for="field in formFields" :key="field.prop">
        <el-col v-if="itemVisibleHandler(field, formData)" :span="field.__span">
          <el-form-item
            :prop="field.prop"
            :label="field.label"
            v-bind="field.__formItemAttrs"
          >
            <template #label="{ label }">
              <span>{{ label }}</span>
            </template>
            <template #default>
              <template v-if="field.formSlot">
                <slot
                  :name="field.prop + 'Form'"
                  :model="formData"
                  :field="field"
                ></slot>
              </template>
              <template v-else>
                <b-form-field
                  :field="field"
                  :formData="formData"
                ></b-form-field>
              </template>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>

    <el-form-item>
      <el-space class="ml-auto">
        <el-button type="warning" @click="onReset">
          <el-icon><icon-ic-outline-rotate-90-degrees-cw /></el-icon>
          <span>重置</span>
        </el-button>
        <!-- <el-button type="default" @click="onCancel">
          <el-icon><icon-ic-round-close /></el-icon>
          <span>取消</span>
        </el-button> -->
        <el-button type="primary" :loading="loading" @click="onConfirm">
          <el-icon><icon-ic-round-add /></el-icon>
          <span>保存</span>
        </el-button>
      </el-space>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch } from "vue";
import type { FormInstance, FormProps } from "element-plus";
import {
  useFormAttrsFormatter,
  useFormFieldsFormatter,
} from "../../formatter/form";

interface IField {
  // 类型。比如 input 、 select 、 radio 等等
  type: "input" | "select" | "radio";

  // 表单项的名称/描述
  label: string;

  // key 提交数据到后段的字段名
  prop: string;

  // 存放表单值。表单上 v-model 所绑定的值
  value: any;

  // multiple 、 disabled 、

  // 是否显示
  // vIf: [
  //       // 表示：当 form.area === 'area1'，才显示
  //       { relationKey: 'area', value: 'area1' }
  //     ]
}
interface IOption {
  attrs: FormProps;
  fields: any[];
  action: any;
}

const props = withDefaults(
  defineProps<{
    type?: any;
    option: any;
    model?: any;
  }>(),
  {
    type: "",
    model: reactive({}),
  }
);
const emit = defineEmits<{
  (e: "confirm", data: any, cb: () => void): void;
  (e: "cancel"): void;
}>();

const loading = ref(false);

const formRef = ref<FormInstance>();
const formAttrs = computed(() => {
  return useFormAttrsFormatter(props.type, props.option);
});

const formFields = computed(() => {
  return useFormFieldsFormatter(props.type, props.option);
});

/**
 * 表单数据
 */
formFields.value.forEach((item: any) => {
  props.model[item.prop] = props.model[item.prop] ?? item.__defaultValue;
});

const formData = ref(props.model);

/**
 * 监听用户操作
 */
watch(props.model, (val) => {
  console.log("formData change: ", val);
});

/**
 * 关闭加载动画
 */
function loadingFn() {
  loading.value = false;
}

/**
 * 确认
 */
const onConfirm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      loading.value = true;
      emit("confirm", props.model, loadingFn);
    }
  });
};

/**
 * 取消
 */
function onCancel() {
  emit("cancel");
}

/**
 * 重置
 */
function onReset() {
  formRef.value?.resetFields();
}

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

<style>
.b-form {
  position: relative;
}
</style>
