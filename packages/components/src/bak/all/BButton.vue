<!--
  确认按钮 - 弹出确认框然后执行一个操作
  操作按钮 - 执行一个操作
  弹窗按钮 - 打开一个弹窗
-->
<template>
  <!-- 弹窗 -->
  <el-dialog
    v-if="config.type === 'dialog'"
    v-model="dialogVisible"
    custom-class="b-button-dialog"
    draggable
    :fullscreen="isFullscreen"
    append-to-body
    width="600px"
  >
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

  <!-- 按钮 -->
  <el-button v-bind="config.attrs" @click="onClick">{{ config.text }}</el-button>
</template>

<script lang="ts" setup>
const { option, config, defaultData } = withDefaults(
  defineProps<{
    option: any
    config: any
    defaultData?: any
  }>(),
  {},
)

const isFullscreen = ref(false)
const dialogVisible = ref(false)

/**
 * loading、disabled
 */
const loading = ref(false)
const disabled = ref(false)

/**
 * 按钮点击事件
 */
function onClick() {
  switch (config.type) {
    case 'dialog':
      handlerDialog(config)
      break
    case 'confirm':
      handlerConfirm()
      break
    default:
  }
}

/**
 * 打开弹窗
 * @param config
 */
function handlerDialog(config: any) {
  console.log(option)
  dialogVisible.value = true
}

/**
 * 确认按钮
 */
function handlerConfirm() {
  ElMessageBox.confirm('确定要执行操作吗', '提示', { type: 'warning' })
    .then(() => {
      // emit('confirm')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })
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
