<template>
  <div class="app-title" @click="$router.push({ name: useRouteStore().indexPageName })">
    <img class="app-title-logo" src="/logo.png" alt="logo" />
    <h1 class="app-title-text">{{ useSettingStore().appTitle }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRouteStore, useSettingStore } from '@/stores'

defineProps<{
  textColor: string
}>()
</script>

<style scoped>
.app-title {
  display: flex;
  align-items: center;
  height: 48px;
  min-width: 200px;
  padding-left: 10px;
}

.app-title:hover {
  cursor: pointer;
}

.app-title-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.app-title-text {
  word-break: keep-all;
  margin-left: 15px;
  line-height: 1;
  font-size: 16px;
  font-weight: 600;
  color: v-bind(textColor);
}
</style>
