<template>
  <button class="w-button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { buttonProps, buttonEmits } from './button'
// import type { CSSProperties } from 'vue' // css style
// import type { ZIndexProperty } from 'csstype'

const COMPONENT_NAME = 'ElAffix'

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

</script>

<style scoped>
.w-button {
  appearance: none;
  padding: 5px 10px;
  background: lightskyblue;
  border: none;
  border-radius: 4px;
  color: #fff;
}
</style>
