<template>
  <el-form
    v-if="isShow"
    ref="formRef"
    :model="formModel"
    :disabled="loading"
    v-bind="_searchFormAttrs"
  >
    <FormItem
      v-for="field in _searchFormFields"
      :key="field.prop"
      :field="field"
      :form-model="formModel!"
    />
    <el-form-item>
      <el-button
        type="primary"
        :icon="Search"
        :loading="loading"
        @click="onSearch"
      >
        查询
      </el-button>
      <el-button type="warning" :icon="RefreshLeft" @click="onReset">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Search, RefreshLeft } from "@element-plus/icons-vue";
import FormItem from "./form-item.vue";
import { formSearchProps, formSearchEmits } from "./form";
import { useFormOption } from "./utils";
import type { FormInstance } from "element-plus";

const props = defineProps(formSearchProps);
const emits = defineEmits(formSearchEmits);

const isShow = ref(false);
const formRef = ref<FormInstance>();

const { _searchFormFields, _searchFormAttrs } = useFormOption(props.option!);

// 判断搜索栏是否显示
watch(
  _searchFormFields,
  (fields) => {
    if (fields.length) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
    emits("show", isShow.value);

    fields.forEach((field) => {
      if (props.formModel) {
        props.formModel[field.prop] =
          props.formModel[field.prop] ?? field.default;
      }
    });

    console.log("watch");
  },
  {
    deep: true,
    immediate: true,
  }
);

// 查询
const onSearch = () => {
  emits("search", props.formModel);
};

// 重置
const onReset = () => {
  formRef.value?.resetFields();
  emits("reset", props.formModel);
};

console.log("init");
onSearch();
</script>
