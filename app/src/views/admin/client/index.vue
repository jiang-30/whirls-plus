<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 客户端管理
  icon: ic:round-person
  layout: admin
  isTab: true
  parentName: System
  isShow: true
  sort: 4
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api"> </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from "./model";

const { option, api } = useModel();
</script>
