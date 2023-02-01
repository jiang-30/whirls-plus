<template>
  <div>
    <el-input style="margin-bottom: 10px;" v-model="filterText" clearable :prefix-icon="Search" placeholder="请输入搜索关键字" />
    <el-tree
      ref="treeRef"
      :data="props.treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="props.defaultProps"
      v-bind="$attrs"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <span :class="{item: true, disabled: data.disabled, active: selectedId == data.id }">{{ node.label }}</span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

interface Tree {
  id: string
  label: string
  disabled?: boolean
  children?: Tree[]
}

const props =  defineProps<{
  treeData: any,
  defaultProps?: any
}>()

const emit = defineEmits<{
  (e: 'change', current: string ): void
}>()

defineExpose({

})

/**
 * node-key default-expand-all default-expanded-keys current-node-key
 */
const selectedId = ref('')
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()


watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const handleNodeClick = (data: Tree, node: Node) => {
  // console.log('click: ', data, node)
  if(data.disabled) return
  if(selectedId.value == data.id) {
    selectedId.value = ''
  } else {
    selectedId.value = data.id
  }
  emit('change', selectedId.value)
}

const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.name.includes(value)
}



</script>

<style scoped>
.item {
  flex: 1 0 0;
}
.item.disabled {
  color: #999;
  cursor: default;
}
.item.active {
  color: #409eff;
}
</style>
