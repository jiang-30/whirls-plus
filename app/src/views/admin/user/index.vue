<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 用户管理
  icon: ic:round-person
  layout: admin
  isTab: true
  parentName: Permission
  isShow: true
  sort: 1
  permissions:
    - ROLE:ADMIN
</route>

<template>
  <PageContainer>
    <WCrud :option="option" :api="api">
      <template #row-action="{ row }">
        <el-button text size="small" type="primary" @click="onResetPassword(row)">
          重置密码
        </el-button>
      </template>
    </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
import { fetchQueryRoleList } from '@/api/admin/role'
import { fetchUpdatePassword } from '@/api/admin/user'
import { ElMessageBox, ElNotification } from 'element-plus'

const roleList = ref([])

const { option, api } = useModel()

const onResetPassword = (row: any) => {
  ElMessageBox({
    title: '提示',
    message: `确定重置【${row.username}】用户密码吗`,
    type: 'warning',
  })
    .then(() => {
      return fetchUpdatePassword(row.id)
    })
    .then(() => {
      ElNotification({
        title: '提示',
        message: '密码重置成功',
        type: 'success',
      })
    })
    .catch(() => {})
}
</script>
