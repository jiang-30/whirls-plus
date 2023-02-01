<route lang="yaml">
meta:
  enabled: true
  constant: true
  title: 用户注册
  icon: ic:round-login
  requireAuth: false
</route>

<template>
  <div class="register-page">
    <el-card shadow="hover">
      <template #header>
        <div>注 册</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item prop="username">
          <el-input v-model="formData.username" type="primary" link :prefix-icon="'User'" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            :prefix-icon="'Key'"
            placeholder="请输入登录密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            :prefix-icon="'Key'"
            placeholder="请输入登录密码"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <div class="mb-2">
          <el-button block type="primary" @click="onSubmit(formRef)">注册</el-button>
        </div>
        <div class="flex justify-end">
          <el-space>
            <RouterLink class="text-xs hover:text-blue-500" :to="{ name: 'Login' }">登录</RouterLink>
          </el-space>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import type { ElForm } from 'element-plus'
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
const formData = reactive({
  username: 'user',
  password: '123456',
})
const formRules = {
  username: [
    {
      required: true,
      message: '请输入登录名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入登录密码',
      trigger: 'blur',
    },
  ],
}

const onSubmit = (form: FormInstance | undefined) => {
  if (!form) return
  form.validate(valid => {
    if (valid) {
      // fetchLogin(formData).then(res => {
      //   console.log(res)
      // })
      console.log('submit!')
      // login(formData)
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<style scoped>
.register-page {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -90%);
  width: 330px;
}
</style>
