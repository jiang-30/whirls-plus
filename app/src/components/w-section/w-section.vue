<template>
  <section class="w-section w-border-1" style="height: 400px; width: 600px">
    <!-- 背景 -->
    <svg class="w-bg" :width="width" :height="height">
      <polygon
        :fill="backgroundColor"
        :points="`10, 27 10, ${height - 27} 13, ${height - 24} 13, ${height - 21} 24, ${height - 11}
              38, ${height - 11} 41, ${height - 8} 73, ${height - 8} 75, ${height - 10} 81, ${height - 10}
              85, ${height - 6} ${width - 85}, ${height - 6} ${width - 81}, ${height - 10} ${width - 75}, ${height - 10}
              ${width - 73}, ${height - 8} ${width - 41}, ${height - 8} ${width - 38}, ${height - 11}
              ${width - 24}, ${height - 11} ${width - 13}, ${height - 21} ${width - 13}, ${height - 24}
              ${width - 10}, ${height - 27} ${width - 10}, 27 ${width - 13}, 25 ${width - 13}, 21
              ${width - 24}, 11 ${width - 38}, 11 ${width - 41}, 8 ${width - 73}, 8 ${width - 75}, 10
              ${width - 81}, 10 ${width - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`"
      />
    </svg>

    <!-- 边框 -->
    <svg width="150px" height="150px" :key="item" v-for="item in border" :class="`${item} w-border`">
      <polygon
        :fill="mergedColor[0]"
        points="6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon :fill="mergedColor[1]" points="27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8">
        <animate
          attributeName="fill"
          :values="`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`"
          dur="0.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon
        :fill="mergedColor[0]"
        points="9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54"
      >
        <animate
          attributeName="fill"
          :values="`${mergedColor[0]};${mergedColor[1]};transparent`"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>

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
  title?: string
}>()
const backgroundColor = 'transparent'
const width = 600
const height = 400
const mergedColor: string[] = ['#4fd2dd', '#235fa7']
const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom']

const lWidth = 600
const lHeight = 4
const x = 0
const y = lHeight / 2

const w = lWidth
const h = 2
const dur = 6

const reverse = false
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
