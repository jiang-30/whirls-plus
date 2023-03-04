<template>
  <el-popover
    v-if="useSetting.showMessageBtn"
    placement="bottom"
    :width="300"
    trigger="hover"
  >
    <template #default>
      <div class="text-center mb-1 text-lg text-dark">消息通知</div>
      <div class="flex justify-between items-center p-3 hover:bg-slate-200">
        <span>分类一消息</span>
        <span>3</span>
      </div>
      <div class="flex justify-between items-center p-3 hover:bg-slate-200">
        <span>分类二消息</span>
        <span>3</span>
      </div>
    </template>
    <template #reference>
      <el-badge is-dot>
        <el-button link @click="onNav('UserMessage')">
          <el-icon :size="26" :color="textColor">
            <icon-mdi-bell-outline />
          </el-icon>
        </el-button>
      </el-badge>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
import { useSettingStore } from "@/stores";

defineProps<{
  textColor: string;
}>();

const router = useRouter();
const useSetting = useSettingStore();

function onNav(pageName: string) {
  router.push({ name: pageName });
}
</script>
