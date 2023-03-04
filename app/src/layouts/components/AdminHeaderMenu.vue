<template>
  <AppMenu
    v-if="showMenu"
    :menuList="menuList"
    :collapse="false"
    :bg-color="bgColor"
    :text-color="textColor"
    mode="horizontal"
  ></AppMenu>
</template>

<script lang="ts" setup>
import AppMenu from "./AppMenu.vue";
import { useSettingStore, useMenuStore } from "@/stores";

defineProps<{
  bgColor: string;
  textColor: string;
}>();

const settingStore = useSettingStore();
const menuStore = useMenuStore();

// 是否展示
const showMenu = computed(() => {
  return settingStore.showTopMenu || settingStore.showTopMenuNav;
});

// 菜单数据
const menuList = computed(() => {
  if (settingStore.showTopMenu) {
    return menuStore.getMenuTree();
  } else {
    return menuStore.getMenuTree().map((item) => ({ ...item, children: [] }));
  }
});
</script>
