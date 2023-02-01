<template>
  <el-table :data="data">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"> </el-table-column>

    <el-table-column label="操作" width="200" align="center">
      <template #default="{ row }"> </template>
    </el-table-column>
  </el-table>

  <!-- <b-pagination :page="page"></b-pagination> -->
</template>

<script lang="ts" setup>
const { option, data } = defineProps<{
  option: any
  page: any
  data: any[]
}>()

const columns = computed(() => {
  console.log(option)
  return option.fields
})

// const formatTableDataHandler = (list: any): void => {
//   list.forEach((row: any) => {
//     tableColumnFields.value.forEach((column: IColumn) => {
//       const prop = column.prop
//       if (column.type == 'select') {
//         if (column.dictData) {
//           const dictData = column.dictData.find(dict => dict.value === row[prop])
//           row['_' + prop] = dictData?.label
//           return
//         }

//         if (column.dictUrl) {
//           // 1. 判断bStore; 2. 远程请求; 3. 赋值给dictData; 4. 同步到bStore;
//           // bStore[column.dictUrl] =
//           // remote().then(() => {
//           // })
//         }
//       }

//       if (column.type == 'selectmul') {
//       }
//     })
//   })
//   tableData.value = list
// }
</script>
