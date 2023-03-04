<template>
  <WCrud
    :option="option"
    :table-loading="tableLoading"
    :tableData="tableData"
    :searchModel="searchModel"
    :page-model="pageModel"
    @query="onQuery"
    @create-save="onCreateSave"
    @update-save="onUpdateSave"
  ></WCrud>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { WCrud, type ICrudOption } from "@/packages/components/src/index";

const tableLoading = ref(false);
const searchModel = ref({});
const formModel = ref({});
const tableData = ref<any[]>([]);
const pageModel = ref({
  current: 1,
  size: 10,
  total: 87,
});

const onQuery = () => {
  tableLoading.value = true;
  // tableData.value = [];

  setTimeout(() => {
    tableData.value.push({ test: 111 }, { test: 223 });
    tableLoading.value = false;
  }, 2000);
  console.log("onQuery", searchModel.value, pageModel.value);
};

const onCreateSave = (record: any, done: any) => {
  console.log("onCreateSave", record);
  done(true);
};

const onUpdateSave = (record: any, done: any) => {
  console.log("onUpdateSave", record);
};

const option = ref<ICrudOption>({
  rowKey: "id",
  border: true,
  stripe: true,
  labelWidth: "100px",

  title: "操作",
  width: 700,
  draggable: true,
  appendToBody: true,
  // rowMenuAlign: "center",
  // column: 2,
  // rowMenu: true,
  // rowMenuWidth: 190,
  // createBtn: true,
  // infoBtn: false,
  // span: 24,

  fields: [
    {
      prop: "title",
      label: "名称",
      type: "input",
      rules: [
        { required: true, message: "请输入名称", trigger: "change" },
        {
          type: "string",
          max: 20,
          message: "20个字符以内",
          trigger: "change",
        },
      ],
      headerAlign: "center",
      isSearch: true,
      default: "dsf",
      searchDefault: "dsf",
    },
    {
      prop: "type",
      label: "类型",
      type: "radioButton",
      dictKey: "SYS_MENU_TYPE",
      default: "page",
      width: 100,
      align: "center",
      span: 12,
    },
    {
      prop: "parentId",
      label: "上级",
      type: "tree",
      span: 12,
      isTable: false,
      formSlot: true,
    },
    {
      prop: "icon",
      label: "图标",
      type: "input",
      formSlot: true,
      tableSlot: true,
      width: 80,
      align: "center",
    },
    {
      prop: "path",
      label: "访问路径",
      type: "input",
      rules: [
        { required: true, message: "请输入访问路径", trigger: "change" },
        {
          type: "string",
          max: 100,
          message: "100个字符以内",
          trigger: "change",
        },
      ],
      listen: {
        hide: { type: "button" },
      },
    },
    {
      prop: "component",
      label: "组件路径",
      type: "input",
      listen: {
        show: { type: "page" },
      },
      rules: [
        { required: true, message: "请输入组件路径", trigger: "change" },
        {
          type: "string",
          max: 100,
          message: "100个字符以内",
          trigger: "change",
        },
      ],
    },
    {
      prop: "permission",
      label: "权限标识",
      type: "input",
      isTable: false,
      rules: [
        {
          type: "string",
          max: 255,
          message: "255个字符以内",
          trigger: "change",
        },
      ],
    },
    {
      prop: "target",
      label: "打开位置",
      type: "radio",
      dictKey: "SYS_MENU_TARGET",
      default: "_self",
      isTable: false,
      listen: {
        show: { type: "page" },
      },
      span: 12,
    },
    {
      prop: "pageLayout",
      label: "布局方式",
      type: "select",
      dictKey: "SYS_MENU_LAYOUT",
      default: "admin",
      isTable: false,
      listen: {
        show: { type: "page" },
      },
      span: 12,
    },
    {
      prop: "keepAlive",
      label: "是否缓存",
      type: "radio",
      dictKey: "SYS_FLAG",
      default: "0",
      isTable: false,
      listen: {
        show: { type: "page" },
      },
      span: 12,
    },
    {
      prop: "showMenu",
      label: "是否展示",
      type: "radio",
      dictKey: "SYS_FLAG",
      default: "1",
      listen: {
        show: { type: "page" },
      },
      span: 12,
    },
    {
      prop: "tabBar",
      label: "是否标签页",
      type: "radio",
      dictKey: "SYS_FLAG",
      default: "1",
      isTable: false,
      listen: {
        show: { type: "page" },
      },
      span: 12,
    },
    {
      prop: "sort",
      label: "排序",
      type: "inputNumber",
      default: 1,
      span: 12,
      width: 100,
      align: "center",
    },
    {
      prop: "enabled",
      label: "状态",
      type: "radio",
      dictKey: "SYS_ENABLED",
      default: "1",
      width: 80,
      align: "center",
      span: 12,
    },
    {
      prop: "note",
      label: "备注",
      type: "textarea",
      isTable: false,
      rules: [
        {
          type: "string",
          max: 255,
          message: "255个字符以内",
          trigger: "change",
        },
      ],
    },
  ],
});

const onUpdateOpen = (row: any, done: any) => {
  row.title = "权限管理";
  console.log(row);
  done();
};

const onClick = () => {
  // option.value.fields.push({ prop: "age", label: "年龄" });
  // option.value.fields[0].isTable = !option.value.fields[0].isTable;
};

const onCreate = () => {
  console.log("onCreate table");
};

const onRowClick = () => {
  console.log("onRowClick table");
};
</script>
