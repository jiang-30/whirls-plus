<template>
  <div>
    <template v-if="showModel === '1'">
      <el-dialog
        :visible.sync="visible"
        append-to-body
        top="0"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        custom-class="valid-dialog-box"
        destroy-on-close
      >
        <slot></slot>
      </el-dialog>
    </template>
    <template v-else-if="showModel === '2'">
      <el-popover
        v-model="visible"
        placement="top"
        :visible-arrow="false"
        popper-class="valid-popover-box"
        trigger="manual"
      >
        <slot></slot>
        <div slot="reference"></div>
      </el-popover>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    showModel: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      setTimeout(() => {
        this.visible = false
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.valid-dialog-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  padding: 0 5px;
  margin: 0;
  transform: translate(-50%, -50%);

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 0;
  }
}

.valid-popover-box {
  &.el-popper[x-placement^='top'] {
    padding: 5px;
  }
}
</style>
