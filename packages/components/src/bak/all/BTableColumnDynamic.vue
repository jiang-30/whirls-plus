<template>
  <el-button @click="tableColumnFilterVisible = true">显隐</el-button>
        <!-- <el-button circle>
        <el-icon><icon-ic-twotone-list /></el-icon>
      </el-button> -->
  <!-- 动态表格列 -->
  <el-dialog v-model="tableColumnFilterVisible" title="表格列">
    <el-checkbox v-model="filterCheckAll" :indeterminate="isIndeterminate" @change="onFilterChange">全选</el-checkbox>
    <el-checkbox-group v-model="checked" @change="handlerCheckedColumnsChange">
      <el-checkbox v-for="column in columns" :key="column.prop" :label="column.prop">
        {{ column.label }}
      </el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" @click="tableColumnFilterVisible = false"> 确定 </el-button>
      <el-button @click="tableColumnFilterVisible = false">取消</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
// const props =defineProps<{
//   columns: any[],
//   checked: any[],
//   visible: boolean
// }>()
const tableColumnFilterVisible = ref(false)
interface Props {
  columns: any[]
  checked: any[]
  visible: boolean
}
const props = withDefaults(
  defineProps<{
    columns: any[]
    checked: any[]
    visible: boolean
  }>(),
  {
    visible: false,
    labels: () => ['one', 'two'],
  },
)
// const checkedColumns = ref(tableColumnFields.value.filter((column: any) => column.prop).map((column: any) => column.prop))

// /**
//  * 当前显示的表格列
//  */
// const tableColumns = computed(() => {
//   return tableColumnFields.value.filter((column: any) => checkedColumns.value.includes(column.prop))
// })

const filterCheckAll = ref(false)
const isIndeterminate = ref(false)
const onFilterChange = (val: boolean) => {
  // filterCheckAll.value = val ? props.columns.map((column: any) => column.prop) : []
  isIndeterminate.value = false
}

const handlerCheckedColumnsChange = (val: any) => {
  const checkedCount = val.length
  filterCheckAll.value = checkedCount === props.columns.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.columns.length
}
</script>
