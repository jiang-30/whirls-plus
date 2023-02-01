<route lang="yaml">
meta:
  enabled: true
  constant: true
  title: 配色
  icon: ic:round-color-lens
  layout: admin
  tabBar: true
  showMenu: true
  parentMenuName: Case
  sort: 3
</route>

<template>
  <PageContainer>
    <section class="grid grid-cols-4 gap-4">
      <div
        v-for="item in list"
        :key="item.color"
        class="h-32 flex flex-col justify-center items-center rounded-md text-white"
        :style="{ background: item.color }"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.color }}</span>
      </div>
    </section>
  </PageContainer>
</template>

<script setup lang="ts">
import { useData } from './index'

const { list } = useData()
</script>
