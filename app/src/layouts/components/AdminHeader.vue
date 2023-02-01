<template>
  <header class="app-header shadow-light">
    <AppLogo :text-color="headerTextColor" />
    <div class="app-header-nav">
      <AdminHeaderMenu :bg-color="headerBgColor" :text-color="headerTextColor"></AdminHeaderMenu>
    </div>
    <div class="app-header-divider"> </div>
    <div class="app-header-btns">
      <AdminHeaderButton :text-color="headerTextColor" />
      <AdminHeaderMessage :text-color="headerTextColor" />
      <AdminHeaderUser :text-color="headerTextColor" />
      <AdminHeaderSetting :text-color="headerTextColor" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppLogo from './AppLogo.vue'
import AdminHeaderMenu from './AdminHeaderMenu.vue'
import AdminHeaderButton from './AdminHeaderButton.vue'
import AdminHeaderSetting from './AdminHeaderSetting.vue'
import AdminHeaderMessage from './AdminHeaderMessage.vue'
import AdminHeaderUser from './AdminHeaderUser.vue'
import { useSettingStore } from '@/stores'

const { headerBgColor, headerTextColor } = storeToRefs(useSettingStore())
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: v-bind(headerBgColor);
  color: v-bind(headerTextColor);
}

.app-header-divider {
  margin-left: auto;
}

.app-header-nav {
  flex: 1 0 0;
  min-width: 0;
  margin-right: 100px;
}

.app-header-btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-header-btns :deep(.el-button) {
  margin-left: 0;
}
</style>
