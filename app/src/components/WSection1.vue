<template>
  <section class="w-section">
    <header class="w-section-header" v-if="title">
      <div class="w-section-header-title__icon"></div>
      <div class="w-section-header-title">{{ title }}</div>
    </header>
    <main class="w-section-main">
      <slot></slot>
    </main>
  </section>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title?: string
  }>()

</script>

<style scoped>
.w-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
}

.w-section-header {
  padding: 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}
.w-section-header-title {
  margin-right: auto;
}

.w-section-header-title__icon {
  width: 5px;
  height: 12px;
  background-color: #409eff;
  border-radius: 5px;
  margin-right: 3px;
}

.w-section-main {
  flex: 1 0 0;
  min-width: 0;
}
</style>