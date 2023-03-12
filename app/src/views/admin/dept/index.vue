<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 部门管理
  icon: ic:round-person
  layout: admin
  isTab: true
  parentName: Permission
  isShow: true
  sort: 4
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api" v-model:table-data="tableData"> </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
const tableData = ref<any[]>([])
const { option, api } = useModel(tableData)
</script>
