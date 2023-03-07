<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 字典管理
  icon: mdi:dip-switch
  layout: admin
  isTab: true
  parentName: System
  isShow: true
  sort: 5
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api">
      <template #row-action="{ row }">
        <el-button type="primary" text size="small" @click="onOpenItems(row)">
          字典项
        </el-button>
      </template>
    </WCrud>

    <DictItem ref="itemRef" />
  </PageContainer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DictItem from "./components/dict-item.vue";
import { useModel } from "./model";

const { api, option, pageModel, tableLoading, tableData } = useModel();
const itemRef = ref<InstanceType<typeof DictItem>>();

// 打开字典项
const onOpenItems = (row: any) => {
  console.log(row);
  itemRef.value?.open(row.id, row.dataType);
};
</script>
