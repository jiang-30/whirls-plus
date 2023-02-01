<!-- 页面容器, 扩展到100%; -->

<template>
  <div class="h-full p-3">
    <section class="bg-block rounded-md h-full flex flex-col">
      <!-- 头部 -->
      <header v-if="!!title" class="border-light border-b px-3 py-2 shrink-0 flex items-center">
          <div class="flex items-center">
            <el-icon class="mr-2"><Grid /></el-icon>
            <h2>{{ title }}</h2>
          </div>
          <div class="ml-auto">
            <slot name="header"></slot>
          </div>
      </header>

      <!-- 内容 -->
      <main class="grow basis-0 min-h-0">
        <el-scrollbar wrap-class="j-page-container-full-scroll-wrapper" view-class="p-3">
            <slot></slot>
        </el-scrollbar>
        <el-backtop target=".j-page-container-full-scroll-wrapper" :right="40" :bottom="40" />
      </main>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { Grid } from '@element-plus/icons-vue'

  defineProps<{
    /**
     * 标题
     */
    title?: string
  }>()
</script>
