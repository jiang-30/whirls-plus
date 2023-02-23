<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 嵌套路由
  icon: mdi:view-list-outline
  layout: admin
  parentName: Case
  isShow: true
  isTab: true
  sort: 10
</route>

<template>
  <PageContainer>
    <div class="text-primary">list view</div>

    <ElButton>
      <router-link to="/case/nest/list/item1">item1</router-link>
    </ElButton>
    <ElButton>
      <router-link to="/case/nest/list/item2">item2</router-link>
    </ElButton>
    <div>
      <router-view></router-view>
    </div>
  </PageContainer>
</template>
<script lang="ts" setup></script>
