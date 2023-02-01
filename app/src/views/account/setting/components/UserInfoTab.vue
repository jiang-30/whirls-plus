<template>
  <el-tabs>
    <el-tab-pane label="个人资料">
      <section class="w-[500px] p-10">
        <el-form label-position="top">
          <el-form-item label="头像">
            <el-avatar :size="120"></el-avatar>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userInfo.nickname" placeholder="请输入用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="userInfo.description" type="textarea" placeholder="请输入用户简介"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="w-full" type="primary" @click="onConfirm" :loading="loading">保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { fetchUpdateInfo } from '@/api/account'

const userStore = useUserStore()
const loading = ref(false)
const userInfo = ref({
  username: userStore.userInfo.username,
  avatar: userStore.userInfo.avatar,
  nickname: userStore.userInfo.nickname,
  description: userStore.userInfo.description,
  email: userStore.userInfo.email,
})

const onConfirm = () => {
  loading.value = true
  fetchUpdateInfo(userInfo.value)
    .then(() => {
      ElMessage.success("保存成功")
      userStore.fetchUserInfo()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
