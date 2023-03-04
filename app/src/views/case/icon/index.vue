<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 图标
  icon: ic:baseline-font-download
  layout: admin
  isTab: true
  isShow: true
  parentName: Case
  sort: 1
</route>

<template>
  <PageContainer>
    <div class="grid grid-cols-8">
      <div
        class="h-32 flex flex-col justify-center items-center border hover:bg-slate-200 hover:cursor-pointer text-light"
        v-for="item in icons"
        :key="item"
        @click="onClick(item)"
      >
        <AppIcon :icon="item"></AppIcon>
        <div class="mt-2">{{ item }}</div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { listIcons } from "@iconify/vue";
import { useClipboard } from "@vueuse/core";
import { ElMessage } from "element-plus";

const icons = listIcons(undefined, "w");
const { copy } = useClipboard();

function onClick(iconName: string) {
  copy(iconName).then(() => {
    ElMessage.success(`已拷贝  ${iconName}`);
  });
}
</script>
