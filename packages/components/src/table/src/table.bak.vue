<template>
  <!-- 搜索 -->
  <!-- <BSearch v-show="searchVisible" :model="searchModel" :option="props.option" @search="onSearch" @init="onSearchInit"></BSearch> -->

  <!--
    - 表格操作区域
    - create import export
   -->
  <div class="flex mb-3">
    <el-space>
      <el-button type="primary" @click="onCreateAction">
        <el-icon><icon-ic-round-add /></el-icon>
        <span>新增</span>
      </el-button>
      <!-- <el-button type="primary" @click="onCreateAction">
        <el-icon><icon-ic-outline-print /></el-icon>
        <span>打印</span>
      </el-button>
      <el-button type="primary" @click="onCreateAction">
        <el-icon><icon-ic-sharp-upload /></el-icon>
        <span>导入</span>
      </el-button>
      <el-button type="primary" @click="onCreateAction">
        <el-icon><icon-ic-sharp-file-download /></el-icon>
        <span>导出</span>
      </el-button>
      <el-button type="primary" @click="onCreateAction">
        <el-icon><icon-ic-outline-file-download /></el-icon>
        <span>模板下载</span>
      </el-button> -->
    </el-space>
    <el-space class="ml-auto">
      <el-button circle @click="searchVisible = !searchVisible">
        <el-icon><icon-ic-round-search /></el-icon>
      </el-button>
      <el-button circle @click="onRefreshAction">
        <el-icon><icon-ic-round-refresh /></el-icon>
      </el-button>
      <el-button circle @click="onRefreshAction">
        <el-icon><icon-ic-sharp-menu /></el-icon>
      </el-button>
    </el-space>
  </div>

  <!--
    表格
    type列：selection / index / expand
    loading
   -->
  <el-table :data="props.tableData" v-bind="tableAttrs">
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
      v-for="column in tableColumnsFields"
      :key="column.prop"
      v-bind="column"
    >
      <template #default="{ row }">
        {{ row["_" + column.prop] ?? row[column.prop!] }}
      </template>
    </el-table-column>

    <!--
      - 表格行操作区域
     -->
    <el-table-column label="操作" width="250" align="center">
      <template #default="{ row, $index }">
        <el-button type="primary" link @click="onInfoRowAction(row, $index)"
          >查看</el-button
        >
        <el-button type="primary" link @click="onUpdateRowAction(row, $index)"
          >编辑</el-button
        >
        <el-button type="primary" link @click="onDeleteRowAction(row, $index)"
          >删除</el-button
        >
        <slot name="row-action"></slot>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <BPagination :model="pageModel" @change="handlerFetch"></BPagination>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { ElTableColumn } from "element-plus";
import {
  useTableAttrsFormatter,
  useTableFieldsFormatter,
} from "../../formatter/table";

interface ITableOption {
  attrs: {};
  fields: any[];
  action: any;
}

type IAction = "info" | "update" | "delete";

const props = defineProps<{
  option: any;
  tableData: any[];
  pageModel?: any;
  searchModel?: any;
}>();

/**
 * fetch、action
 * searchInit、searchQuery、searchReset、searchChange
 * tableRefresh、tablePageCurrentChange、tablePageSizeChange
 */
const emit = defineEmits<{
  (e: "fetch"): void;
  (e: "create"): void;
  (
    e: "row-action",
    action: IAction,
    row: Record<string, any>,
    index: number
  ): void;
  (e: "row-info"): void;
  (e: "row-update"): void;
  (e: "row-delete"): void;
}>();

/**
 * getRef() 获取 ref 对象 search、table、page
 */
// defineExpose({
//   get: (val: string) => any
// })

/**
 * 表格属性
 */
const tableAttrs = computed(() => {
  return useTableAttrsFormatter(props.option);
});

/**
 * 表格列
 */
const tableFields = computed(() => {
  return useTableFieldsFormatter(props.option.fields);
});

/**
 * 操作按钮
 */
const tableAction = computed(() => {
  return useTableFieldsFormatter(props.option.fields);
});

/**
 * 行操作按钮
 */
const tableRowAction = computed(() => {
  return useTableFieldsFormatter(props.option.fields);
});

/**
 * selection 列
 */
const tableColumnSelection = {};

/**
 * index 列
 */
const tableColumnIndex = {};

/**
 * expand 列
 */
const tableColumnExpand = {};

/**
 * action 列
 */
const tableColumnActionInfo = {};
const tableColumnActionUpdate = {};
const tableColumnActionDelete = {};

/**
 * 显示的表格列
 * tableFields 和 showFieldKeys
 */
const tableColumnsFields = computed(() => {
  return tableFields.value.filter((item) => item.isShow !== false);
});

/**
 * 基础数据
 */
const searchVisible = ref(true);
// const searchOption = getSearchOption(props.option)
// const tableData = valueFormatter(props.data, tableColumnFields)

function onSearchInit(data: any) {
  console.log("init", data);
}
/**
 * 搜索加载数据
 */
function onSearch() {
  props.pageModel.current = 1;
  handlerFetch();
}

/**
 * 刷新
 */
function onRefreshAction() {
  // emit('refresh')
  handlerFetch();
}

function handlerFetch() {
  emit("fetch");
}

/**
 * 新增
 */
function onCreateAction() {
  emit("create");
}

/**
 * 行 查看
 */
function onInfoRowAction(row: any, index: number) {
  emit("row-info");
}

/**
 * 行 更新
 */
function onUpdateRowAction(row: any, index: number) {
  emit("row-update");
}

/**
 * 行 删除
 */
function onDeleteRowAction(row: any, index: number) {
  emit("row-delete");
}
</script>
