<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 角色管理
  icon: ic:round-person
  layout: admin
  isTab: true
  parentName: Permission
  isShow: true
  sort: 2
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
