<route lang="yaml">
  meta:
    enabled: true,
    constant: true,
    title: 个人中心
    icon: ic:round-person
    name: UserCenter
    layout: admin
</route>

<template>
  <ElContainer class="h-full">
    <ElAside>
      <PageContainer>
        <div class="flex flex-col items-center py-10">
          <el-avatar :size="100" :src="userInfo.avatar" />
          <div class="mt-10 text-lg font-bold text-gray-500">{{ userInfo.username }}</div>
        </div>
      </PageContainer>
    </ElAside>
    <ElMain>
      <PageContainerFull>aside</PageContainerFull>
    </ElMain>
  </ElContainer>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores'

const userInfo = useUserStore().userInfo

</script>
