<template>
  <el-dialog v-model="visible" title="图表" width="800px">
    <section class="grid grid-cols-10">
      <div
        class="h-20 flex justify-center items-center border hover:bg-slate-200 hover:cursor-pointer text-light text-lg"
        v-for="item in icons"
        :key="item"
        @click="onClick(item)"
      >
        <AppIcon :icon="item"></AppIcon>
      </div>
    </section>

    <template #footer>
      <el-button type="default" @click="close">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { listIcons } from '@iconify/vue'

const icons = listIcons(undefined, 'w')
const visible = ref(false)
let resolveHandler: any = null

const close = () => {
  visible.value = false
}

const onClick = (iconName: string) => {
  resolveHandler(iconName)
  close()
}

const choose = () => {
  visible.value = true
  return new Promise<string>((resolve, reject) => {
    resolveHandler = resolve
  })
}

defineExpose({
  choose,
})
</script>
