<template>
  <el-form
    v-if="isShow"
    ref="formRef"
    :model="searchModel"
    :disabled="loading"
    v-bind="__searchFormAttrs"
    inline
  >
    <FormItem
      v-for="field in __searchFormFields"
      :key="field.prop"
      :field="field"
      :form-model="searchModel"
    />
    <el-form-item>
      <el-button type="primary" :icon="Search" :loading="loading" @click="_onSearch">
        查询
      </el-button>
      <el-button type="warning" :icon="RefreshLeft" @click="_onReset"> 重置 </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { searchFormProps, searchFormEmits } from './search-form'
import FormItem from './form-item.vue'
import { useSearchFormOption } from './utils'

defineOptions({ name: 'WSearchForm' })
const props = defineProps(searchFormProps)
const emits = defineEmits(searchFormEmits)

const isShow = ref(false)
const formRef = ref<FormInstance>()

const { __searchFormFields, __searchFormAttrs } = useSearchFormOption(props.option!)

// 判断搜索栏是否显示
watch(
  __searchFormFields,
  fields => {
    if (fields.length) {
      isShow.value = true
    } else {
      isShow.value = false
    }
    emits('show', isShow.value)

    fields.forEach(field => {
      if (props.searchModel) {
        props.searchModel[field.prop] = props.searchModel[field.prop] ?? field.searchDefault
      }
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

// 初始化
onBeforeMount(() => {
  emits('init', props.searchModel)
})

// 查询
const _onSearch = () => {
  emits('search', props.searchModel)
}

// 重置
const _onReset = () => {
  formRef.value?.resetFields()
  emits('reset', props.searchModel)
}
</script>
