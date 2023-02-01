<template>
  <el-form
    v-if="searchFields.length"
    ref="formRef"
    :model="model"
    inline
    :disabled="loading"
  >
    <el-form-item
      v-for="field in searchFields"
      :key="field.prop"
      :prop="field.prop"
      :label="field.label"
      v-bind="field.formItemAttrs"
    >
      <b-form-field :field="field" :formData="model"></b-form-field>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="onQuery">
        <el-icon><icon-ic-round-search /></el-icon>
        <span>查询</span>
      </el-button>
      <el-button type="default" @click="onReset">
        <el-icon><icon-ic:round-delete-outline /></el-icon>
        <span>清空</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { useSearchFormFieldsFormatter } from "../../formatter/form";

const props = withDefaults(
  defineProps<{
    option: any;
    model: any;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);
const emit = defineEmits<{
  (e: "init", searchModel: any): void;
  (e: "query", searchModel: any): void;
  (e: "reset", searchModel: any): void;
  (e: "search", searchModel: any): void;
  (e: "change", searchModel: any): void;
}>();
const formRef = ref<FormInstance>();
const searchFields = ref<any[]>([]);

watch(
  props.option,
  () => {
    searchFields.value = useSearchFormFieldsFormatter(props.option.fields);
    searchFields.value.forEach((item: any) => {
      props.model[item.prop] =
        props.model[item.prop] ?? item.searchDefault ?? item.default;
    });
  },
  { immediate: true }
);

watch(props.model, () => {
  // console.log('searchModel change: ', props.model)
  emit("change", props.model);
});

onMounted(() => {
  emit("init", props.model);
  handlerSearch();
});

/**
 * 查询
 */
function onQuery() {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit("query", props.model);
      handlerSearch();
    }
  });
}

/**
 * 重置
 */
function onReset() {
  formRef.value?.resetFields();
  emit("reset", props.model);
}

/**
 * 请求
 */
function handlerSearch() {
  emit("search", props.model);
}
</script>
