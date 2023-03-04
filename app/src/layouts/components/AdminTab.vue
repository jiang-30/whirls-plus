<template>
  <div class="app-tab border-light border-b bg-block" v-if="showTab">
    <div class="app-tab-tabs">
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-remove="onTabRemove"
        @tab-click="onTabClick"
      >
        <el-tab-pane
          v-for="tab in tabStore.tabs"
          :key="tab.name"
          :name="tab.name"
          closable
        >
          <template #label>
            <AppIcon
              style="margin-right: 5px"
              v-if="tab.icon"
              :size="16"
              :icon="tab.icon"
            />
            <span>{{ tab.title }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dropdown class="app-tab-dropdown" trigger="click" @command="onCommand">
      <el-button type="primary" size="small">
        <span>更多</span>
        <el-icon>
          <ArrowDown />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="all">关闭全部</el-dropdown-item>
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="right">关闭到右侧</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useTabStore, useSettingStore } from "@/stores";
import type { TabsPaneContext } from "element-plus";

const router = useRouter();
const tabStore = useTabStore();
const activeTab = ref("");

// 路由变化时修改选中项
watch(
  () => router.currentRoute.value.name,
  (val) => (activeTab.value = val as unknown as string),
  { immediate: true }
);

const showTab = computed(() => {
  return useSettingStore().showTab && tabStore.tabs && tabStore.tabs.length;
});

function onTabClick(tab: TabsPaneContext) {
  router.push({ name: tab.paneName as string });
}
function onTabRemove(RouteName: string) {
  tabStore.closeTab(RouteName);
}
function onCommand(command: string) {
  tabStore.operationTab(command);
}
</script>

<style scoped>
.app-tab {
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

.app-tab-tabs {
  flex: 1 1 0;
  min-width: 0;
}

.app-tab-tabs .el-tabs {
  --el-tabs-header-height: 30px;
}

.app-tab :deep(.el-tabs__header) {
  margin: 0;
  border-bottom: 0;
  border-radius: 4px 4px 0 0;
}

.app-tab :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border-radius: 0;
  border-top: none;
}

.app-tab :deep(.el-tabs__nav-wrap::after) {
  height: 0;
}

.app-tab :deep(.el-tabs__nav-next),
.app-tab :deep(.el-tabs__nav-prev) {
  line-height: 34px;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
}

.app-tab :deep(.el-tabs__nav-wrap.is-scrollable) {
  padding: 0 30px;
}

.app-tab .el-tabs--top :deep(.el-tabs__item.is-top) {
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
}

.app-tab-dropdown {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
