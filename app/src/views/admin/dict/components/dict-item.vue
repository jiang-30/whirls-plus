<template>
  <el-dialog v-model="visible" title="字典项" width="800px" destroy-on-close>
    <section class="w-dialog-wrapper">
      <WCrud
        :option="option"
        :api="api"
        :table-loading="tableLoading"
        :table-data="tableData"
        :before-save="beforeSaveHandler"
        @query="onQuery"
      ></WCrud>
    </section>
  </el-dialog>
</template>

<script setup lang="ts">
import type { ICrudOption } from "@whirls/components";
import { fetchItemList } from "@/api/admin/dict";
import { useDictStore } from "@/stores";

type IDictDataType = "list" | "tree";

const visible = ref(false);
const dictDataType = ref<IDictDataType>("list");
let dictId = "";
const api = ref({
  create: "/admin/dict-item",
  update: "/admin/dict-item",
  delete: "/admin/dict-item/",
});
const tableLoading = ref(false);
const tableData = ref<Record<string, any>[]>([]);
const option = computed<ICrudOption>(() => {
  return {
    rowKey: "id",
    border: true,
    labelWidth: 80,
    dialogWidth: 600,
    fields: [
      {
        label: "上级",
        prop: "parentId",
        type: "tree",
        dictData: tableData.value,
        isForm: dictDataType.value === "tree",
        isTable: false,
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
        label: "状态",
        prop: "isEnabled",
        type: "radio",
        default: "1",
        dictData: useDictStore().items("SYS_ENABLED"),
      },
      { label: "排序", prop: "sort", type: "inputNumber", default: 1 },
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
        isTable: false,
      },
    ],
  };
});

const beforeSaveHandler = (record: any, type: any) => {
  if (type == "create") {
    record.dictId = dictId;
  }
  return record;
};

const onQuery = () => {
  tableLoading.value = true;
  fetchItemList(dictId)
    .then(({ data }) => {
      tableData.value = data;
    })
    .finally(() => {
      tableLoading.value = false;
    });
};

// 打开 赋默认值
const open = (id: string, dictType: IDictDataType = "list") => {
  dictId = id;
  dictDataType.value = dictType;
  visible.value = true;
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
