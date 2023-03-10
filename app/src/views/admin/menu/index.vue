<route lang="yaml">
meta:
  isEnabled: true
  isStatic: true
  title: 菜单管理
  icon: ic:round-person
  layout: admin
  isTab: true
  parentName: Permission
  isShow: true
  sort: 3
</route>

<template>
  <PageContainer>
    <WCrud ref="crudRef" :option="option" :api="api" v-model:table-data="tableData">
      <template #row-action="{ row }">
        <el-button style="order: -1" size="small" text type="primary" @click="onAdd(row)">
          新增
        </el-button>
      </template>
    </WCrud>
  </PageContainer>
</template>

<script setup lang="ts">
import { useModel } from './model'
import type { ICrud } from '@whirls/components'

const crudRef = ref<ICrud>()
const tableData = ref([])

const { option, api } = useModel(tableData)

const onAdd = (record: any) => {
  crudRef.value?.openCreate({ parentId: record.id })
}
</script>
