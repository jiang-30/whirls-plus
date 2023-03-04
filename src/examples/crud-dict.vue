<template>
  <WCrud :option="option" :api="api">
    <template #row-action="{ row }">
      <el-button type="primary" text size="small" @click="onOpenItems(row)">
        字典项
      </el-button>
    </template>
  </WCrud>

  <DictItem ref="itemRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  ICrudApi,
  WCrud,
  type ICrudOption,
  type IPageModel,
} from "@/packages/components/src/index";
import DictItem from "./dict-item.vue";

const itemRef = ref<InstanceType<typeof DictItem>>();

const api = ref<ICrudApi>({
  page: "admin/dict/page",
});
const option = ref<ICrudOption>({
  border: true,
  stripe: true,
  dialogWidth: 600,
  align: "center",
  labelWidth: "100px",
  rowActionWidth: 230,
  fields: [
    {
      label: "字典名称",
      prop: "name",
      type: "input",
      width: 100,
      rules: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
      isSearch: true,
    },
    {
      label: "字典标识",
      prop: "code",
      type: "input",
      rules: [{ required: true, message: "请输入字典标识", trigger: "blur" }],
      isSearch: true,
    },
    {
      label: "字典类型",
      prop: "type",
      type: "select",
      default: "biz",
      rules: [{ required: true, message: "请选择字典类型", trigger: "blur" }],
      dictData: [
        { label: "业务类型", value: "biz" },
        { label: "系统类型", value: "sys" },
      ],
      isSearch: true,
    },
    {
      label: "数据类型",
      prop: "dataType",
      type: "select",
      default: "list",
      rules: [{ required: true, message: "请选择数据类型", trigger: "blur" }],
      dictData: [
        { label: "列表", value: "list" },
        { label: "树形", value: "tree" },
      ],
    },
    {
      label: "备注",
      prop: "remark",
      type: "input",
      isTable: false,
    },
  ],
});
const tableLoading = ref(false);
const pageModel = ref<IPageModel>({
  current: 1,
  size: 10,
  total: 0,
});
const tableData = ref<Record<string, any>[]>([]);

const onQuery = () => {
  console.log("onQuery", pageModel);
  tableLoading.value = true;

  setTimeout(() => {
    tableData.value = [
      {
        id: "1",
        name: "名称",
        code: "SYS_ENABLED",
        type: "sys",
        dataType: "tree",
        remark:
          "备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息",
      },
      {
        id: "2",
        name: "名称",
        code: "SYS_ENABLED",
        type: "sys",
        dataType: "tree",
        remark: "备注信息备注信息备注信息备注信息",
      },
      {
        id: "3",
        name: "名称",
        code: "SYS_ENABLED",
        type: "sys",
        dataType: "tree",
        remark: "备注信息备注信息备注信息备注信息",
      },
    ];
    pageModel.value.total = tableData.value.length * 4;
    tableLoading.value = false;
  }, 1000);
};

// 新建请求
const onCreate = (record: any, done: any) => {
  console.log(record);
  done();
};

// 更新请求
const onUpdate = (record: any, done: any) => {
  console.log(record);
  done();
};

// 删除请求
const onDelete = (row: any) => {
  console.log(row);
};

// 打开字典项
const onOpenItems = (row: any) => {
  itemRef.value?.open(row.id, row.type);
};
</script>
