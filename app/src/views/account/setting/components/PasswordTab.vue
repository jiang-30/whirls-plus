<template>
  <el-tabs>
    <el-tab-pane label="密码设置">
      <section class="w-[500px] p-10">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-position="top">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="formModel.oldPassword" type="password" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="formModel.password" type="password" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input v-model="formModel.rePassword" type="password" placeholder="请输入确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="w-full" type="primary" @click="onSubmit" :loading="loading">保存</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores'
import { fetchUpdatePassword } from '@/api/account'
import { encrypt } from '@/utils/crypto-utils'
import type { FormInstance, FormRules, FormItemRule } from 'element-plus'

const loading = ref(false)
const formRef = ref<FormInstance>()
const formModel = ref({
  oldPassword: '',
  password: '',
  rePassword: '',
})

const passwordValidator: FormItemRule['validator'] = (rule, value, callback) => {
  if (formModel.value.password && formModel.value.rePassword && formModel.value.password !== formModel.value.rePassword) {
    callback(new Error('俩次密码输入不一致'))
  }
  callback()
}
const formRules: FormRules = {
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: passwordValidator, trigger: 'blur' },
  ],
  rePassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: passwordValidator, trigger: 'blur' },
  ],
}

// 密码修改成功后退出登录
const onSubmit = () => {
  formRef.value?.validate(valid => {
    if (valid) {
      const params = {
        oldPassword: encrypt(formModel.value.oldPassword),
        password: encrypt(formModel.value.password),
      }

      loading.value = true
      fetchUpdatePassword(params)
        .then(() => {
          useUserStore().logoutHandler()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}
</script>
