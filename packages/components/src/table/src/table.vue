<template>
  <!-- 
    表格操作区域
    create import export
   -->
  <div class="">
    <el-space>
      <el-button type="primary">
        <span>新增</span>
      </el-button>
    </el-space>
  </div>

  <!--
    表格
    type列：selection / index / expand
    loading
   -->
  <el-table :data="tableData">
    <!--
      selection / index / expand
     -->
    <!-- <el-table-column type="expand" />
    <el-table-column type="selection" />
    <el-table-column type="index" label="序号" width="60" align="center" /> -->

    <!--
      动态列
      slot 插槽、格式化值
     -->
    <el-table-column
      v-for="column in _tableFields"
      :key="column.prop"
      v-bind="column"
    >
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { tableProps } from "./table";

const props = defineProps(tableProps);

console.log(props);

const __tableAttrs = computed(() => {
  return props.option?.fields;
});

const _tableFields = computed(() => {
  return props.option?.fields;
});
</script>
