<template>
  <section>
    <!-- 
    表格操作区域
    create import export
   -->
    <section class="w-table-action">
      <div class="w-table-action-left">
        <el-button type="primary" @click="onCreate">
          <span>新增</span>
        </el-button>
      </div>
      <div class="w-table-action-right">
        <el-button circle @click="onCreate">刷</el-button>
      </div>
    </section>

    <!--
    表格
    type列：selection / index / expand
    loading
   -->
    <el-table :data="tableData" v-bind="_tableAttrs">
      <!--       
      selection / index / expand
     -->
      <!-- <el-table-column type="expand" />
    <el-table-column type="selection" /> -->
      <el-table-column type="index" label="序号" width="60" align="center" />

      <!-- 动态列 -->
      <el-table-column
        v-for="column in _tableFields"
        :key="column.prop"
        v-bind="column"
      >
      </el-table-column>

      <el-table-column v-bind="_tableColumnActionAttrs">
        <template #default="{ row }">
          <el-button text type="info" @click="onInfo(row)">详情</el-button>
          <el-button text type="primary" @click="onUpdate(row)">修改</el-button>
          <el-button text type="danger" @click="onDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="pageModel"
      v-model:current-page="pageModel.current"
      v-model:page-size="pageModel.size"
      :total="pageModel.total"
      v-bind="_pageAttrs"
      @current-change="onPageCurrentChange"
      @size-change="onPageSizeChange"
    >
    </el-pagination>
  </section>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";
import { tableProps, tableEmits, type TableEmits } from "./table";
import { useTableOption } from "./utils";

// const attrs = useAttrs();
// console.log(attrs.onRowClick);

// const tableListeners = {
//   onRowClick: attrs.onRowClick,
// };

const props = defineProps(tableProps);
const emits = defineEmits(tableEmits);

// 格式化数据
const { _tableFields, _tableColumnActionAttrs, _tableAttrs, _pageAttrs } =
  useTableOption(props.option);

// 分页事件
const onPageCurrentChange = (current: number) => {
  const _page = { current: current, size: props.pageModel?.size };
  emits("pageSizeChange", _page);
  emits("pageChange", _page);
};
const onPageSizeChange = (size: number) => {
  const _page = { current: props.pageModel?.current, size: size };
  emits("pageSizeChange", _page);
  emits("pageChange", _page);
};

// 操作按钮事件
const onCreate = () => {
  emits("create");
};

const onInfo = (row: any) => {
  emits("rowInfo", row);
};

const onUpdate = (row: any) => {
  emits("rowUpdate", row);
};

const onDelete = (row: any) => {
  emits("rowDelete", row);
};
</script>

<style scoped>
.w-table-action {
  display: flex;
  padding: 15px 0;
}
.w-table-action-left {
  margin-right: auto;
}
.w-table-action-right {
  margin-left: auto;
}

.el-pagination {
  margin-top: 15px;
}
</style>
