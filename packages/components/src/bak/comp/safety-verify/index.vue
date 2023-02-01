<template>
  <wrap-view ref="wrapView">
    <div class="valid-box-header">
      <span>请完成安全验证</span>
      <el-button
        type="primary" link
        icon="el-icon-close"
        size="medium"
        @click="hide"
      ></el-button>
    </div>

    <drag-img
      ref="dragVerify"
      :is-passing.sync="isPassing"
      :check="onCheck"
      :img="img"
      :move-img="moveImg"
      :showRefresh="true"
      @refresh="fetchCodeImg"
    >
    </drag-img>
  </wrap-view>
</template>

<script>
import DragImg from './drag-img'
import { getVerifyImg, checkVerifyImg } from '@/api/admin/code'
import WrapView from './wrap'

export default {
  components: {
    WrapView,
    DragImg,
  },
  props: {
    value: String,
    /**
     * 安全校验类型 -- blockPuzzle：图片拖动；
     */
    type: {
      type: String,
      default: 'blockPuzzle',
    },
  },
  data() {
    return {
      typeMap: {
        blockPuzzle: 'blockPuzzle',
      },
      isPassing: false,
      img: '',
      moveImg: '',
    }
  },
  created() {
    if (this.type === 'blockPuzzle') {
      this.fetchCodeImg()
    }
  },
  methods: {
    fetchCodeImg() {
      const params = {
        captchaType: 'clickWord' || this.typeMap[this.type],
      }
      getVerifyImg(params).then((res) => {
        const data = res.data
        if (data.repCode === '0000') {
          this.img = 'data:image/png;base64,' + data.repData.originalImageBase64
          this.moveImg = 'data:image/png;base64,' + data.repData.jigsawImageBase64
          this.token = data.repData.token
          this.key = data.repData.secretKey
        }
      })
    },
    onCheck(distance, done) {
      checkVerifyImg({
        captchaType: this.typeMap[this.type],
        secretKey: this.key,
        distance,
        token: this.token,
      })
        .then((res) => {
          this.$emit('input', res)
          done()
          this.onSuccess(res)
          this.hide()
        })
        .catch(() => {
          this.fetchCodeImg()
          done(false)
        })
    },
    show() {
      this.$refs.wrapView.show()
    },
    hide() {
      this.$refs.wrapView.hide()
      this.fetchCodeImg()
    },
    onSuccess(code) {
      this.$emit('success', code)
    },
  },
}
</script>
<style lang="scss">
.valid-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}
</style>
