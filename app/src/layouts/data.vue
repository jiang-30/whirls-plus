<template>
  <ElContainer class="w-layout-data w-screen h-screen bg-[url('/static/images/ny.jpg')] bg-center bg-cover bg-no-repeat">
    <!-- 头部 -->
    <ElHeader
      class="bg-[url('/static/images/title-bg.png')] bg-center bg-cover bg-no-repeat flex justify-center items-center"
      height="70px"
    >
      <div class="text-white text-xl font-bold"> title </div>
    </ElHeader>

    <!-- 内容 -->
    <ElMain class="p-0">
      <RouterView />
    </ElMain>
  </ElContainer>

  <!-- 导航 -->
  <el-popover
    placement="right"
    :offset="-32"
    :show-arrow="false"
    :hide-after="0"
    trigger="click"
    :width="220"
    popper-class="w-layout-data-menu"
  >
    <template #default>
      <ElScrollbar class="h-[80vh]">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" default-active="2" text-color="#fff">
          <el-sub-menu index="1">
            <template #title>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </ElScrollbar>
    </template>

    <template #reference>
      <ElButton class="fixed left-px top-1/2 px-2 py-6" type="primary" :icon="DArrowRight"></ElButton>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { DArrowRight } from '@element-plus/icons-vue'
</script>

<style>
/**
  重置基础样式
 */
.w-layout-data {
  color: #fff;
}

.w-layout-data-menu {
  padding: 0 !important;
  border: none !important;
  background-color: #545c64 !important;
}
.w-layout-data-menu .el-menu {
  border-right: none;
}
</style>
