<template>
  <el-tabs>
    <el-tab-pane label="个人资料">
      <section class="w-[500px] p-10">
        <el-form :model="formModel" :rules="formRules" label-position="top">
          <el-form-item label="用户名">
            <el-input v-model="formModel.password" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formModel.password"></el-input>
            <!-- <el-button type="primary" @click="onSubmit">保存</el-button> -->
          </el-form-item>
        </el-form>
      </section>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { encrypt } from '@/utils/crypto-utils'

const formModel = ref({
  password: '',
  newPassword: '',
  rePassword: '',
})

const formRules = {
  oldPassword: [],
  newPassword: [],
  confirmPassword: [],
}

function onSubmit() {
  if (formModel.value.newPassword != formModel.value.rePassword) {
    ElMessage.warning('俩次密码输入不一致')
    return
  }
  const args = {
    oldPassword: encrypt(formModel.value.rePassword),
    newPassword: encrypt(formModel.value.newPassword),
  }
}
</script>
