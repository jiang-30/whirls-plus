<template>
  <section class="layout-container bg-page">
    <!-- 状态栏 -->
    <header class="layout-header"><AdminHeader /></header>
    <!-- 侧边栏 -->
    <AdminiAside style="height: 100%" class="layout-aside" />
    <!-- tab栏和面包屑 -->
    <nav class="layout-nav">
      <AdminTab />
      <AdminBreadcrumb />
    </nav>
    <!-- 内容区 -->
    <main class="layout-main" ref="mainRef">
      <RouterView v-slot="{ Component, route }">
        <transition name="main" mode="out-in" appear>
          <keep-alive :max="10" :include="routeStore.keepAliveList">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </RouterView>
    </main>
    <!-- 脚注 -->
    <footer class="layout-footer"><AdminFooter /></footer>
  </section>
</template>

<script lang="ts" setup>
import AdminiAside from './components/AdminAside.vue'
import AdminHeader from './components/AdminHeader.vue'
import AdminBreadcrumb from './components/AdminBreadcrumb.vue'
import AdminTab from './components/AdminTab.vue'
import AdminFooter from './components/AdminFooter.vue'
import { useMenuStore, useRouteStore, useSettingStore } from '@/stores'
import { useEventBus, useResizeObserver } from '@vueuse/core'

const menuStore = useMenuStore()
const routeStore = useRouteStore()
const settingStore = useSettingStore()
const mainRef = ref()
const eventBus = useEventBus('container-resize')
// const viewStyle = computed(() => {
//   return {
//     // 'width': settingStore.containerWidth + 'px',
//     // 'height': settingStore.containerHeight + 'px',
//     'min-width': settingStore.minWidth + 'px',
//     'min-height': settingStore.minHeight + 'px'
//   }
// })

watch(menuStore.menus, () => {
  console.log('useMenuStore menus change')
})

// 监听 main 区域的 resize
useResizeObserver(mainRef, event => {
  const { width, height } = event[0].contentRect
  settingStore.containerWidth = width
  settingStore.containerHeight = height
  eventBus.emit('container-resize')
})
// 监听 body 区域的 resize
useResizeObserver(document.body, event => {
  const { width } = event[0].contentRect
  if (width <= settingStore.minWidth && !settingStore.asideCollapse) {
    settingStore.asideCollapse = true
  }
})

onBeforeUnmount(() => {
  eventBus.reset()
})
</script>

<style scoped>
.layout-container {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template:
    'header header' auto
    'aside nav' auto
    'aside main' 1fr
    'aside footer' auto / auto 1fr;
  overflow: hidden;
}

.layout-header {
  grid-area: header;
  overflow: hidden;
}

.layout-aside {
  grid-area: aside;
}

.layout-nav {
  grid-area: nav;
  min-width: 0;
}

.layout-main {
  grid-area: main;
  min-width: 0;
  overflow: hidden;
}

.layout-footer {
  grid-area: footer;
  min-width: 0;
}

.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
