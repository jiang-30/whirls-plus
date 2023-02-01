<template>
  <el-form ref="formRef" :model="formData" :rules="formRules">
    <el-form-item prop="username">
      <el-input v-model="formData.username" type="primary" link :prefix-icon="User" placeholder="请输入登录用户名" clearable></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="formData.password"
        type="password"
        :prefix-icon="Lock"
        placeholder="请输入登录密码"
        show-password
        clearable
        @keyup.enter="onSubmit(formRef)"
      >
      </el-input>
    </el-form-item>
    <el-button class="w-full" type="primary" @click="onSubmit(formRef)" :loading="loading">登录</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { fetchLogin } from '@/api/account'
import { encrypt } from '@/utils/crypto-utils'
import type { ILoginInfo } from '../index';

const emit = defineEmits<{
  (event: 'success', data: ILoginInfo): void
}>()

const formData = ref({
  username: 'admin',
  password: '123456',
})
const formRules = ref<FormRules>({
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
})

const loading = ref(false)
const formRef = ref<FormInstance>()
const onSubmit = (form: FormInstance | undefined) => {
  if (!form) return
  
  form.validate(valid => {
    if (valid) {
      loading.value = true
      const params = {
        ...formData.value,
        password: encrypt(formData.value.password),
      }
      fetchLogin(params)
        .then(res => {
          emit('success', {
            accessToken: res.accessToken,
            expires: res.expires,
            refreshToken: res.refreshToken,
            userInfo: res.userInfo
          })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      return false
    }
  })
}
</script>
