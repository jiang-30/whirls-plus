<template>
  <el-icon :size="size" :color="color">
    <!-- <Icon :icon="icon"></Icon> -->
  </el-icon>
</template>
<script lang="ts" setup>
// import { Icon } from '@iconify/vue'
const { size, color } = defineProps<{
  size?: number
  color?: string
  icon: string
}>()
defineOptions({})
</script>
