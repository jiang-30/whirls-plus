<template>
  <el-button @click="onClick">click</el-button>
  <WTable :option="option" :table-data="tableData"></WTable>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { WTable } from "@/packages/components/src/table";

const option = ref({
  fields: [
    { prop: "test", label: "test" },
    { prop: "index", label: "index" },
    { prop: "name", label: "名称" },
  ],
});
const tableData = ref([{ test: 111 }, { test: 223 }]);

const onClick = () => {
  option.value.fields.push({ prop: "age", label: "年龄" });
};
</script>
