<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 语句管理
  icon: mdi:speaker-multiple
  layout: admin
  isTab: true
  parentName: Case
  isShow: true
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
