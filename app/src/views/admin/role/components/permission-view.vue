<template>
  <el-dialog
    v-model="visible"
    title="角色权限"
    width="800px"
    close-on-click-modal
    append-to-body
    destroy-on-close
  >
    <template #default>
      <el-tree
        ref="treeRef"
        :data="treeData"
        node-key="id"
        :props="{ label: 'title' }"
        show-checkbox
        @check-change="handleCheckChange"
      >
        <template #default="{ data }">
          <div>
            <span>{{ data.title }}</span>
          </div>
        </template>
      </el-tree>
    </template>
    <template #footer>
      <el-button type="primary" @click="onConfirm">保存</el-button>
      <el-button type="default" @click="visible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { fetchQueryRoleMenuTree, fetchQueryRoleMenus, fetchUpdateRoleMenus } from '@/api/admin/role'
import { ElNotification, type ElTree } from 'element-plus'
import { treeForEach } from '@/utils/tree-utils'

let roleId = ''
const visible = ref(false)
const treeRef = ref<InstanceType<typeof ElTree>>()
const loading = ref(false)
const treeData = ref([])

const handleCheckChange = () => {}

function queryTree() {
  treeData.value = []
  loading.value = true
  Promise.all([fetchQueryRoleMenuTree(), fetchQueryRoleMenus(roleId)])
    .then(([menuTree, checkedIds]) => {
      const checkedMenuIds: string[] = []

      treeForEach(menuTree.data, (item: any) => {
        item.disabled = item.isEnabled !== '1'
        if (!item.children && item.type !== 'menu' && checkedIds.data.includes(item.id)) {
          checkedMenuIds.push(item.id)
        }
      })
      treeData.value = menuTree.data
      nextTick(() => {
        treeRef.value?.setCheckedKeys(checkedMenuIds)
      })
    })
    .finally(() => {
      loading.value = false
    })
}

function onConfirm() {
  const checkedKeys = treeRef.value?.getCheckedKeys()
  const halfCheckedKeys = treeRef.value?.getHalfCheckedKeys()
  const checkedMenuIds = []

  if (checkedKeys && halfCheckedKeys) {
    checkedMenuIds.push(...checkedKeys, ...halfCheckedKeys)
  }

  loading.value = true
  fetchUpdateRoleMenus({
    roleId: roleId,
    menuIds: checkedMenuIds,
  })
    .then(() => {
      ElNotification({
        title: '提示',
        message: '修改成功',
        type: 'success',
      })
      visible.value = false
    })
    .finally(() => {
      loading.value = false
    })
}

// 打开 赋默认值
const open = (id: string) => {
  roleId = id
  queryTree()
  visible.value = true
}

defineExpose({
  open,
})
</script>
