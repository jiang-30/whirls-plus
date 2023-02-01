<route lang="yaml">
  meta:
    enabled: true
    constant: true
    name: Error
    requireAuth: false
</route>

<template>
  <div class="b-notpermission">
    <el-result  sub-title="您没有权限访问当前资源">
      <template #icon>
        <img class="b-notpermission-img" src="/static/images/404.png" alt="">
      </template>

      <template #extra>
        <el-button type="primary" @click="onBack">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const onBack = () => {
  router.back();
}
</script>

<style scoped>
.b-notpermission {
  padding-top: 80px;
}
.b-notpermission-img {
  width: 400px;
  height: auto;
}
</style>
