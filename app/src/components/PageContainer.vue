<template>
  <el-scrollbar wrap-class="j-page-container-scroll-wrapper" view-class="p-3">

    <section class="bg-block p-3 rounded-md">
      <slot></slot>
    </section>

    <el-backtop target=".j-page-container-scroll-wrapper" :right="40" :bottom="40" />
  </el-scrollbar>
</template>

<script lang="ts" setup>
  const props = defineProps<{}>()
</script>