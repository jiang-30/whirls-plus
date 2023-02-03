<template>
  <section class="b-roll">
    <!-- header -->
    <div class="b-roll__header">
      <slot name="header">
        <div class="b-roll__default-title">{{ title }}</div>
      </slot>
    </div>
    <!-- body -->
    <div
      class="b-roll__body"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="b-roll__wrap" v-if="flag" ref="containerRef">
        <div class="b-roll__list" ref="bodyRef">
          <slot>
            <div
              class="b-roll__default-item"
              v-for="(item, index) in list"
              :key="index"
              @click="onItemClick(item)"
            >
              {{ item }}
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { rollProps } from "./roll";
import { ref, nextTick, onMounted, onUpdated } from "vue";

const props = defineProps(rollProps);
const flag = ref(false);
let startTop = 0;
let speed = 30;
const containerRef = ref<HTMLElement>();
const bodyRef = ref<HTMLElement>();
let timer: number;
let updatedTimer: number;

const autoScroll = () => {
  if (containerRef.value && bodyRef.value) {
    const boxH = containerRef.value.offsetHeight ?? 0;
    const H = bodyRef.value.offsetHeight ?? 0;

    clearTimeout(timer);

    if (H > boxH + 5) {
      const fun = () => {
        timer = setTimeout(() => {
          if (containerRef.value) {
            startTop = containerRef.value.scrollTop;
            startTop += 1;
            if (speed === 2000) {
              startTop = 0;
              speed = 40;
            } else if (Math.abs(startTop) >= H - boxH) {
              speed = 2000;
            }
            containerRef.value.scrollTop = startTop;
            fun();
          }
        }, speed);
      };

      fun();
    }
  }
};
const onItemClick = (record: any) => {
  // this.$emit("click", record);
};
const onMouseEnter = () => {
  clearTimeout(timer);
};
const onMouseLeave = () => {
  autoScroll();
};

onMounted(() => {
  flag.value = true;
  speed = 2000;
  nextTick(() => {
    autoScroll();
    if (props.scroll && containerRef.value) {
      containerRef.value.style.overflowY = "auto";
    }
  });
});

onUpdated(() => {
  if (flag.value) {
    if (updatedTimer) {
      clearTimeout(updatedTimer);
    }
    updatedTimer = setTimeout(() => {
      autoScroll();
    }, 500);
  }
});
</script>

<style scoped>
.b-roll {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.b-roll__default-title {
  font-size: 17px;
  font-weight: 500;
  line-height: 36px;
  color: rgba(0, 0, 0, 1);
}

.b-roll__body {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.b-roll__wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}

.b-roll__wrap::-webkit-scrollbar {
  display: none;
}

.b-roll__list {
  width: 100%;
}
</style>
