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
      <template #deptId="{ row }">
        {{ row.dept.name }}
      </template>

      <template #row-action="{ row }">
        <el-button text size="small" type="primary">修改密码</el-button>
      </template>
    </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
import { fetchQueryRoleList } from '@/api/admin/role'

const roleList = ref([])
fetchQueryRoleList().then(({ data }) => {})

const { option, api } = useModel()
</script>
