<template>
  <el-breadcrumb
    v-if="showBreadcrumb && isShow"
    style="padding: 10px 10px 0"
    separator="/"
  >
    <el-breadcrumb-item
      class="app-breadcrumb-item"
      v-for="item in menuStore.menuStack"
      :key="item.name"
      :to="getTo(item)"
    >
      <AppIcon v-if="item.icon" :icon="item.icon"></AppIcon>
      <span>{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useMenuStore, useSettingStore } from "@/stores";
const menuStore = useMenuStore();

const showBreadcrumb = computed(() => {
  return useSettingStore().showBreadcrumb;
});

const isShow = computed(() => {
  return menuStore.menuStack.length && menuStore.menuStack.length > 1;
});

function getTo(item: any) {
  if (item.type == "page") {
    return { name: item.name };
  } else {
    return {};
  }
}
</script>

<style scoped>
.app-breadcrumb-item :deep(.el-breadcrumb__inner) {
  display: inline-flex;
  align-items: center;
}
</style>
