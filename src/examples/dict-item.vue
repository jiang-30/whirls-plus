<template>
  <el-dialog v-model="visible" title="字典项" width="800px" destroy-on-close>
    <section class="w-dialog-wrapper">
      <WCrud :option="option" :table-data="tableData" @query="onQuery"></WCrud>
    </section>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import {
  WCrud,
  type ICrudOption,
  type IDictData,
} from "@/packages/components/src/index";

const visible = ref(false);

const open = (dictId: string, dictType: string) => {
  visible.value = true;
};

const tableData = ref<Record<string, any>[]>([]);
const option = ref<ICrudOption>({
  border: true,
  indexColumn: false,
  rowKey: "id",
  dialogWidth: 600,
  appendToBody: true,
  destroyOnClose: true,
  closeOnClickModal: false,
  fields: [
    {
      label: "上级",
      prop: "parentId",
      type: "tree",
      isTable: false,
      dictData: tableData as unknown as IDictData[],
    },
    { label: "名称", prop: "label", type: "input" },
    { label: "标识", prop: "value", type: "input" },
    { label: "备注", prop: "remark", type: "input" },
  ],
});

const onQuery = () => {
  console.log("item onQuery");

  setTimeout(() => {
    tableData.value = [
      {
        id: "1",
        parentId: "",
        label: "名称",
        value: "value1",
        remark: "备注",
        children: [
          {
            id: "1-1",
            parentId: "1",
            label: "名称",
            value: "value1-1",
            remark: "备注",
          },
          {
            id: "1-2",
            parentId: "1",
            label: "名称",
            value: "value1-2",
            remark: "备注",
          },
        ],
      },
      { id: "2", parentId: "", label: "名称", value: "value2", remark: "备注" },
    ];
  }, 1000);
};

defineExpose({
  open,
});
</script>

<style>
.el-dialog__header {
  border-bottom: 1px solid #ddd;
}
/* .el-dialog__body {
  padding: 0;
}

.w-dialog-wrapper {
  padding: 20px;
  max-height: 60vh;
  box-sizing: border-box;
  overflow: hidden auto;
} */
</style>
