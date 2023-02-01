<template>
  <el-dialog v-model="dialogVisible" custom-class="b-button-dialog" draggable :fullscreen="isFullscreen" append-to-body width="600px">
    <!-- 表单 -->
    <b-form v-if="dialogType === 'form'" :option="option" :default-data="defaultData" @save="onSave"></b-form>

    <!-- 信息展示 -->
    <b-info v-if="dialogType === 'info'"></b-info>

    <!-- <div style="height: 800px;"></div> -->
    <template #title>
      <span>新建</span>
      <button class="b-button-dialog__icon" @click="isFullscreen = !isFullscreen">[]</button>
    </template>
  </el-dialog>

  <el-button @click="openDialog" link>按钮</el-button>
</template>

<script lang="ts" setup>
const { option, dialogType } = defineProps<{
  option: any
  dialogType: string
  defaultData?: any
}>()

const isFullscreen = ref(false)

const dialogVisible = ref(false)

const openDialog = () => {
  dialogVisible.value = true
}

function onSave(...args: any[]) {
  console.log(args)
}
</script>

<style>
/* .el-overlay-dialog {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
} */

/* .b-button-dialog {
  margin: 50px auto;
} */

.b-button-dialog .b-button-dialog__icon {
  position: absolute;
  top: 3px;
  right: 54px;
  padding: 0;
  width: 30px;
  height: 54px;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}

.b-button-dialog .el-dialog__footer {
  padding: 0;
}
.b-button-dialog .el-dialog__header {
  border-bottom: 1px solid #f1f1f1;
  margin-right: 0;
}

.b-button-dialog .el-dialog__body {
  padding: 30px;
}
</style>
