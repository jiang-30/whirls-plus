<!-- 页面容器, 扩展到100%; -->

<template>
  <section class="page-container" :class="{'page-container__aside': hasAside}">
    <aside class="page-aside" :style="_asideStyle" v-if="hasAside">
      <div class="page-title" v-if="props.asideTitle">
        <el-space>
          <el-icon><icon-ic-round-line-weight /></el-icon>
          <div>{{ props.asideTitle }}</div>
        </el-space>
      </div>
      <div class="page-wrapper">
        <div class="page-scroll">
          <slot name="aside"></slot>
        </div>
      </div>
    </aside>

    <main class="page-main">
      <div class="page-title" v-if="props.title">
        <el-space>
          <el-icon><icon-ic-round-line-weight /></el-icon>
          <div>{{ props.title }}</div>
        </el-space>
      </div>
      <div class="page-wrapper page-wrapper__main">
        <div class="page-scroll">
          <slot></slot>
        </div>
      </div>
    </main>
    <el-backtop target=".page-wrapper__main .page-scroll" :right="50" :bottom="50" />
  </section>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue'

const props = defineProps<{
  title?: string
  asideTitle?: string
  asideWidth?: string
  asideStyle?: Record<string, any>
}>()

const hasAside = !!useSlots().aside
const _asideStyle = {
  ...props.asideStyle ?? {},
  width: props.asideWidth
}

</script>

<style scoped>
  .page-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .page-container.page-container__aside {
    gap: 10px;
  }

  .page-container .page-aside,
  .page-container .page-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }

  .page-container .page-main {
    flex: 1 0 0;
  }

  .page-container .page-title {
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 16px;
    font-weight: bold;
    color: #444;
    background-color: #fff;
  }

  .page-container .page-wrapper {
    flex: 1 0 0;
    width: 100%;
    min-width: 0;
    min-height: 0;
    padding: 10px 0;
    box-sizing: border-box;
    border-radius: 0 0 8px 8px;
    background-color: #fff;
  }

  .page-container .page-scroll {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 15px;
    overflow: auto;
  }

</style>
