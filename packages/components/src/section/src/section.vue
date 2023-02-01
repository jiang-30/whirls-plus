<template>
  <section class="w-section w-border-1" style="height: 400px; width: 600px">
    <header class="w-section-header">
      <h4 class="w-section-header-title">{{ title }}</h4>
      <!-- <div class="w-section-header-extend">
            <slot name="header"></slot>
          </div> -->
    </header>

    <main class="w-section-main">
      <slot></slot>
    </main>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
const backgroundColor = "transparent";
const width = 600;
const height = 400;
const mergedColor: string[] = ["#4fd2dd", "#235fa7"];
const border = ["left-top", "right-top", "left-bottom", "right-bottom"];

const lWidth = 600;
const lHeight = 4;
const x = 0;
const y = lHeight / 2;

const w = lWidth;
const h = 2;
const dur = 6;

const reverse = false;
</script>

<style scoped>
.w-section {
  padding: 15px;
}

.w-section-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px 10px 10px;
}
.w-section-header-title {
  flex: 1 0 0;
  min-width: 0;
  margin-right: auto;
  line-height: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}

.w-section-main {
  position: relative;
  width: 100%;
  height: 100%;
}

.w-border-1 {
  position: relative;
  width: 100%;
  height: 100%;
}

.w-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.w-border {
  position: absolute;
}
.left-top {
  left: 0;
  top: 0;
}

.right-top {
  right: 0;
  top: 0;
  transform: rotateY(180deg);
}

.left-bottom {
  left: 0;
  bottom: 0px;
  transform: rotateX(180deg);
}

.right-bottom {
  right: 0px;
  bottom: 0px;
  transform: rotateX(180deg) rotateY(180deg);
}
</style>
