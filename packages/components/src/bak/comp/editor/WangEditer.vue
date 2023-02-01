<!--
 * @Author: jiang
 * @Date: 2021-07-29 09:38:59
 * @Description: wangEditor 编辑器
 * 设置内容
 *  - 设置到标签内
 *  - 使用 editor.txt.html() \ clear() \ append()
 * event
 *  - input - html
 *  - focus - html
 *  - blur - html
 * attrs
 *  - height: number
 *  - value: string
 *  - image-type: string
-->

<template>
  <div ref="editor"></div>
</template>

<script>
import E from 'wangeditor'

export default {
  props: {
    value: String,
    height: {
      type: Number,
      default: 400,
    },
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    imageType: {
      type: String,
      default: 'base64',
    },
  },
  data() {
    return {
      editor: null,
      editorContent: '',
    }
  },
  watch: {
    value(val) {
      if (this.editor) {
        this.handlerSetContent(val || '')
      }
    },
  },
  mounted() {
    this.init()
    this.$once('hook:beforeDestroy', () => {
      this.destroy()
    })
  },
  methods: {
    // 设置内容，编辑器onchange触发有一个 200ms 的延迟
    handlerSetContent(value) {
      if (value !== this.editorContent) {
        this.editor.txt.html(value)
      }
    },
    // 上传图片
    handlerUpload(file, done) {},
    // 销毁编辑器
    destroy() {
      if (this.editor) {
        this.editor.destroy()
        this.editor = null
      }
    },
    init() {
      this.destroy()
      this.editor = new E(this.$refs.editor)

      // 高度
      this.editor.config.height = this.height

      // z-index 默认值 10000
      this.editor.config.zIndex = 1

      // 提示文字
      this.editor.config.placeholder = this.placeholder

      // focus 默认 true
      this.editor.config.focus = false

      // 全局 alter
      this.editor.config.customAlert = (s, t) => {
        switch (t) {
          case 'success':
            this.$message.success(s)
            break
          case 'info':
            this.$message.info(s)
            break
          case 'warning':
            this.$message.warning(s)
            break
          case 'error':
            this.$message.error(s)
            break
          default:
            this.$message.info(s)
            break
        }
      }

      /**
       * 菜单
       * excludeMenus 定义忽略的菜单, 不能和menus同时使用
       * 颜色（文字颜色、背景色）、字体、字号、行高、表情图标、代码高亮、代码 等可以进一步配置
       */
      // editor.config.excludeMenus = ["emoticon", "video"];
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 字体加粗
        'fontSize', // 字体尺寸
        'fontName', // 字体
        'italic', // 字体斜体
        'underline', // 下划线
        'strikeThrough', // 中划线
        'indent', // 首行缩进
        'lineHeight', // 行高
        'foreColor', // 文字颜色
        'backColor', // 文字背景颜色
        'link', // 添加链接
        'list', // 列表，无序列表和有序列表
        'todo', // 待办事项
        'justify', // 对其方式
        'quote', // 引用
        'emoticon', // 字体图标
        'image', // 图片
        // 'video', // 视频
        'table', // 表格
        'code', // 代码
        'splitLine', // 分割线
        'undo', // 撤销
        'redo', // 恢复
      ]

      // 全屏 - 默认: true
      this.editor.config.showFullScreen = true

      // ======================================== 粘贴相关 也可以自定义处理方式 ========================================
      // 过滤文本的样式； 默认：true
      this.editor.config.pasteFilterStyle = false
      // 忽略内容中的图片; 默认：false
      // this.editor.config.pasteIgnoreImg = true;

      // ======================================== 视频 也可以自定义上传 ========================================
      // 插入视频的回调
      // editor.config.onlineVideoCallback = function (video) {
      //   // 自定义回调内容，内容成功插入后会执行该函数
      //   console.log('插入视频内容', video)
      // }

      // ======================================== 图片 ========================================
      // 自定义选择 img，配置后本地上传失效
      // this.editor.config.uploadImgFromMedia = function () {
      //   console.log(333);
      // };
      // 本地图片转换成 base64
      this.editor.config.uploadImgShowBase64 = this.imageType === 'base64'
      // 一次上传的图片数量； 默认：100
      this.editor.config.uploadImgMaxLength = 1
      // 图片大小 默认：5M
      this.editor.config.uploadImgMaxSize = 1 * 1024 * 1024
      // 图片类型 默认：['jpg', 'jpeg', 'png', 'gif', 'bmp']；设为[]不限制
      this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
      /**
       * 自定义上传, 上传一张
       * @param {array} resultFiles - input 中选中的文件列表
       * @param {array} insertImgFn - 获取图片 url 后，插入到编辑器的方法
       */
      this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        this.handlerUpload(resultFiles[0], (imgUrl, error) => {
          if (error) {
            this.$message.error(error)
          } else {
            insertImgFn(imgUrl)
          }
        })
      }

      // 显示网络图片的功能；默认：true
      this.editor.config.showLinkImg = true
      // 网络图配置alt选项；默认：true
      this.editor.config.showLinkImgAlt = true
      // 网络图配置超链接；默认：true
      this.editor.config.showLinkImgHref = true
      // 网络图片插入的回调
      // this.editor.config.linkImgCallback = function (src,alt,href) {
      //     console.log('图片 src ', src)
      //     console.log('图片文字说明',alt)
      //     console.log('跳转链接',href)
      // }

      // ======================================== 内容 ========================================
      // onchange 的时间频率；默认：200 ms
      this.editor.config.onchangeTimeout = 500
      // 内容变化
      this.editor.config.onchange = html => {
        this.editorContent = html
        this.$emit('input', html)
      }

      // 编辑区域失去焦点
      this.editor.config.onblur = newHtml => {
        this.$emit('blur', newHtml)
      }
      // 编辑区域聚焦
      this.editor.config.onfocus = newHtml => {
        this.$emit('focus', newHtml)
      }

      // 创建编辑器
      this.editor.create()
      if (this.value) {
        this.editorContent = this.value
        this.editor.txt.html(this.value)
      }

      // 创建编辑器后重新设置编辑器内容、可以在容器内添加内容
      // this.editor.txt.html('<p>用 JS 设置的内容</p>')
      // this.editor.txt.append('<p>追加的内容</p>')

      // 获取html
      // this.editor.txt.html()
      // 获取text
      // this.editor.txt.text()
      // 获取json内容
      // editor.txt.getJSON()
      // 清空内容
      // this.editor.txt.clear()
    },
  },
}
</script>
