<template>
  <el-button link @click="open">
    <slot></slot>
  </el-button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const open = () => {
  ElMessageBox.confirm('确定要执行操作吗', '提示', { type: 'warning' })
    .then(() => {
      emit('confirm')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })
}
</script>
