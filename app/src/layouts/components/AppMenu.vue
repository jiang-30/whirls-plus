<template>
  <el-menu
    class="app-menu"
    :mode="mode"
    :collapse="collapse"
    :default-active="defaultActive"
    :background-color="bgColor"
    :text-color="textColor"
    unique-opened
    @select="onSelect"
  >
    <AppMenuItem v-for="menu in menuList" :key="menu.name" :menu="menu"></AppMenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import AppMenuItem from './AppMenuItem.vue'
import { useMenuStore } from '@/stores'
import type { IMenu } from '@/typings'

defineProps<{
  mode: 'horizontal' | 'vertical'
  menuList: IMenu[]
  collapse: boolean
  bgColor?: string
  textColor?: string
}>()

const menuStore = useMenuStore()
const router = useRouter()
const defaultActive = ref('')

watchEffect(() => {
  defaultActive.value = router.currentRoute.value.name as string
})

function onSelect(index: string) {
  menuStore.navTo(index)
}
</script>

<style scoped>
.app-menu.el-menu {
  border-right: none;
}

.app-menu.el-menu--horizontal {
  border-bottom: none;
}

.app-menu.el-menu--horizontal > :deep(.el-menu-item),
.app-menu.el-menu--horizontal > :deep(.el-sub-menu .el-sub-menu__title) {
  border-bottom: none;
  line-height: 60px;
}

.app-menu :deep(.el-menu-item.is-active) {
  background-color: rgb(0, 0 ,0, 10%);
}
.app-menu.el-menu--vertical :deep(.el-menu-item.is-active) {
  border-left: 2px solid var(--el-menu-active-color);
}

.app-menu :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: var(--el-menu-active-color) !important;
}

.app-menu :deep(.el-sub-menu__title:hover),
.app-menu :deep(.el-menu-item:hover) {
  background-color: var(--el-menu-hover-bg-color) !important;
}
</style>
