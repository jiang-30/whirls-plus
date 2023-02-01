<route lang="yaml">
meta:
  enabled: true
  constant: true
  title: 语句管理
  icon: mdi:speaker-multiple
  layout: admin
  tabBar: true
  parentMenuName: Case
  showMenu: true
  sort: 15
</route>

<template>
  <PageContainer>
    <ElButton type="primary">type</ElButton>
    <ElButton type="primary">content</ElButton>
    <ElButton type="primary">author</ElButton>
    <ElButton type="primary">from</ElButton>
  </PageContainer>
</template>

<script setup lang="ts"></script>
