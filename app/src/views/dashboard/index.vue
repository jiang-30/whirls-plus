<route lang="yaml">
meta:
  enabled: true
  constant: true
  title: 首页
  icon: mdi:home
  name: Home
  path: /
  layout: admin
  tabBar: true
  showMenu: true
  sort: -1
</route>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <span class="text-5xl text-orange-500"> 欢迎使用管理系统</span>
  </div>
</template>

<script lang="ts" setup>
defineOptions({})
</script>
