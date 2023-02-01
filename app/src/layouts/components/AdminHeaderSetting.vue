<template>
  <el-tooltip content="系统设置" placement="bottom-end">
    <el-button v-if="settingStore.showSettingBtn" class="app-setting-btn" link @click="onOpen">
      <el-icon :color="textColor" :size="22">
        <Tools />
      </el-icon>
    </el-button>
  </el-tooltip>

  <el-drawer v-model="visible" class="app-setting-drawer" title="风格设置" direction="rtl" append-to-body size="420px">
    <section class="h-full flex flex-col">
      <el-scrollbar class="grow" view-style="padding: 20px;">
        <ul>
          <li class="app-setting-item">
            <span>主题色</span>
            <el-color-picker v-model="settingStore.themeColor" />
          </li>
          <li class="app-setting-item">
            <span>灰色模式</span>
            <el-switch v-model="settingStore.grayModel" />
          </li>
          <li>
            <el-divider>
              <span>导航栏布局</span>
            </el-divider>
          </li>
          <li class="app-setting-mode">
            <div
              v-for="item in layoutList"
              :key="item"
              class="app-setting-mode-item"
              :class="{ ['app-setting-mode-item-' + item]: true, active: settingStore.adminLayout == item }"
              @click="settingStore.adminLayout = item"
            ></div>
          </li>
          <li>
            <el-divider>
              <span>界面功能</span>
            </el-divider>
          </li>
          <li class="app-setting-item">
            <span>TAB 标签栏</span>
            <el-switch v-model="settingStore.showTab" />
          </li>
          <li class="app-setting-item">
            <span>面包屑</span>
            <el-switch v-model="settingStore.showBreadcrumb" />
          </li>
        </ul>
      </el-scrollbar>
      <footer class="p-2">
        <el-button class="w-full" plain @click="onClear">清空缓存并退出</el-button>
      </footer>
    </section>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { IAdminLayout } from '@/typings'
import { useSettingStore, useUserStore } from '@/stores'
import { Tools } from '@element-plus/icons-vue'

// 清空缓存
// 页脚
// 灰色模式
// 页面切换动画
// 导航栏模式
// 国际化
// 屏幕适配

defineProps<{
  textColor: string
}>()

const settingStore = useSettingStore()
const visible = ref(false)
const layoutList: IAdminLayout[] = ['aside', 'top', 'topAside']

// 打开
const onOpen = () => {
  visible.value = true
}

// 清除缓存并退出
const onClear = () => {
  ElMessageBox.confirm('确定清空缓存并退出系统吗', { type: 'warning' })
    .then(() => {
      useUserStore().logoutHandler(true)
    })
    .catch(() => {})
}
</script>

<style scoped>
.app-setting-btn {
  height: 100%;
  padding: 0 5px;
  border-left: 1px dashed #999;
  font-size: 22px;
}
</style>
<style>
.app-setting-drawer .el-drawer__header {
  margin-bottom: 15px;
}

.app-setting-drawer .el-drawer__body {
  border-top: 1px solid #f1f1f1;
  padding: 0;
}

.app-setting-drawer .app-setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  color: var(--el-text-color-regular);
  font-size: 14px;
}

.app-setting-drawer .app-setting-mode {
  display: flex;
  gap: 20px;
  padding-bottom: 30px;
}

.app-setting-drawer .app-setting-mode-item {
  position: relative;
  flex: 1 0 0;
  height: 80px;
  min-width: 0;
  background-color: #f1f1f1;
  border: 2px solid #f1f1f1;
  border-radius: 4px;
  overflow: hidden;
}

.app-setting-drawer .app-setting-mode-item.active,
.app-setting-drawer .app-setting-mode-item:hover {
  border-color: var(--el-color-primary);
  cursor: pointer;
}

.app-setting-drawer .app-setting-mode-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 12px;
  background-color: #242f42;
}

.app-setting-drawer .app-setting-mode-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 20px;
  background-color: #324157;
}

.app-setting-drawer .app-setting-mode-item-aside::before {
  background-color: transparent;
}

.app-setting-drawer .app-setting-mode-item-top::after {
  background-color: transparent;
}
</style>
