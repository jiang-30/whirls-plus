<template>
  <el-dialog v-model="dialogVisible" custom-class="b-button-dialog" draggable :fullscreen="isFullscreen" append-to-body width="600px">
    <template v-for="item in option.children">
      <!-- 表单 -->
      <b-form v-if="item.type === 'form'" :option="item" :default-data="defaultData"></b-form>

      <!-- 信息展示 -->
      <b-info v-if="item.type === 'info'"></b-info>
    </template>

    <!-- <div style="height: 800px;"></div> -->
    <template #title>
      <span>新建</span>
      <button class="b-button-dialog__icon" @click="isFullscreen = !isFullscreen">[]</button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const {
  option,
  titleValue = false,
  defaultData,
} = defineProps<{
  titleValue: boolean
  option: any
  defaultData?: any
}>()

const isFullscreen = ref(false)

const dialogVisible = ref(false)

const openDialog = () => {
  dialogVisible.value = true
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
