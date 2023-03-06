<template>
  <el-dialog v-model="visible" title="字典项" width="800px" destroy-on-close>
    <section class="w-dialog-wrapper">
      <WCrud :option="option" :table-data="tableData" @query="onQuery"></WCrud>
    </section>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import type { ICrudOption } from "@whirls/components";

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
  dialogAppendToBody: true,
  fields: [
    {
      label: "上级",
      prop: "parentId",
      type: "tree",
      isTable: false,
      dictData: [],
    },
    {
      label: "名称",
      prop: "label",
      type: "input",
      rules: [
        { required: true, message: "请输入名称", trigger: "blur" },
        {
          type: "string",
          max: 30,
          message: "最多输入30个字符",
          trigger: "blur",
        },
      ],
    },
    {
      label: "值",
      prop: "value",
      type: "input",
      rules: [
        { required: true, message: "请输入名称", trigger: "blur" },
        {
          type: "string",
          max: 30,
          message: "最多输入30个字符",
          trigger: "blur",
        },
      ],
    },
    {
      label: "备注",
      prop: "remark",
      type: "textarea",
      rules: [
        {
          type: "string",
          max: 255,
          message: "最多输入255个字符",
          trigger: "blur",
        },
      ],
    },
    { label: "排序", prop: "sort", type: "inputNumber" },
    { label: "状态", prop: "isEnabled", type: "input" },
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
