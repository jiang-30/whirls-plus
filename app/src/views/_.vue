<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  name: NotFound
  isAuth: false
</route>

<template>
  <div class="b-notfound">
    <el-result sub-title="您访问的资源未找到">
      <template #icon>
        <img class="b-notfound-img" src="/static/images/404.png" alt="" />
      </template>

      <template #extra>
        <el-button type="primary" @click="onBack">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts" name="NotFound">
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// console.log(route.params.pathMatch, route)

const onBack = () => {
  router.back();
};
</script>

<style scoped>
.b-notfound {
  padding-top: 80px;
}
.b-notfound-img {
  width: 400px;
  height: auto;
}
</style>
