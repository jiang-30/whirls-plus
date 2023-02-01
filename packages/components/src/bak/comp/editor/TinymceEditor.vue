<!--
  TinyMCE - 富文本编辑器里的 Word ，功能想不到的丰富
kcf6qu9rtmpg2p14rjj09x3u3880mtou30mys21yby1djw42
  插件：
  工具栏：使用toolbar来配置工具栏上可用的按钮，多个控件使用空格分隔，使用“|”来创建分组; 参数为数组逗号分隔可以多行; false, //隐藏工具栏
  菜单栏：menu：影响菜单上放置的项目（其还提供创建自定义标题菜单的方法）。menubar：影响菜单下拉列表中显示的项目。menubar也可以传入自定义菜单项，通过在menu内配置title值可以创建自定义菜单的名称，items可配置下拉列表的项目，用空格分隔

================= toolbar ===============
lineheight（行高 5.5新增）
newdocument（新文档）
bold（加粗）
italic（斜体）
underline（下划线）
strikethrough（删除线）
alignleft（左对齐）
aligncenter（居中对齐）
alignright（右对齐）
alignjustify（两端对齐）
styleselect（格式设置; 包含formatselect，）
formatselect（段落格式）
fontselect（字体选择）
fontsizeselect（字号选择）
cut（剪切）
copy（复制）
paste（粘贴）
bullist（项目列表UL）
numlist（编号列表OL）
outdent（减少缩进）
indent（增加缩进）
blockquote（引用）
undo（撤销）
redo（重做/重复）
removeformat（清除格式）
subscript（下角标）
superscript（上角标）

=== menubar ====
lineheight（行高 5.5新增）
newdocument（新文档））
undo（撤销））
redo（重做/重复）
visualaid（网格线）
cut（剪切）
copy（复制））
paste（粘贴））
selectall（全选）
bold（加粗））
italic（斜体））
underline（下划线））
strikethrough（删除线））
subscript（下角标））
superscript（上角标））
removeformat（清除格式））
formats（格式）

============ plugins =============
code (源代码工具栏中使用 code)
lists （列表插件， 工具栏中 bullist numlist）
lists,advlist (对lists的加强 高级列表插件, 有自定义配置项)
image （图片，没有上传选项的，只能添加图片地址； images_upload_url images_upload_base_path: '/demo',返回格式 { location : "/demo/image/1.jpg" }）
link (文件上传， file_picker_callback 只是触发类型，选择文件的逻辑需要自定义)
media （）
print 打印
preview 预览
autolink 自动识别链接
// toolbar: 'undo redo | styleselect | bold italic alignleft aligncenter alignright alignjustify outdent indent| link image'
// 模式： plugins加入quickbars开启沉浸模式inline为true；
// 主题（Themes）编辑器的框架构建
// 皮肤（Skins）更改编辑器的外观
 -->
<template>
  <Editor 
    api-key="kcf6qu9rtmpg2p14rjj09x3u3880mtou30mys21yby1djw42" 
    :init="option"
    :modelValue="modelValue"
    @update:modelValue="onChange"
  />
</template>

<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import { fetchUpload } from '@/service/base/common'
import "tinymce/themes/silver";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  setting: {
    type: Object,
    default: () => {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])


function onChange(value: string) {
  emit('update:modelValue', value)
}

const option = {
  deprecation_warnings: false,
  placeholder: '请输入内容',
  custom_undo_redo_levels: 30,
  branding: false,  //水印
  language_url : '/static/tinymce/langs/zh_CN.js',
  language: 'zh_CN', //调用放在langs文件夹内的语言包
  skin_url: "/static/tinymce/skins/ui/oxide",
  // content_style: 'img {width: 100%; height; auto;}', // 自定义样式
  width: '100%',
  min_height: 350,
  resize: true,
  statusbar: true, // 底部状态栏
  // content_css: '/static/tinymce/skins/content/default/content.min.css', premium imagetools
  plugins: ['help', 'autoresize', 'lists', 'wordcount', 'table', 'link', 'image', 'imagetools', 'preview', 'code'],
  menubar: 'edit format insert view help ',
  toolbar: 'styleselect | forecolor backcolor lineheight | bold italic indent| bullist numlist table link image',
  paste_data_images: true, //允许粘贴图片
  images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
  file_picker_types: 'image', // 'file image media' 指定允许上传的类型 三个参数分别对应三个插件【link，image，media】
  images_upload_handler(blobInfo: any, success: (location: string) => void, failure: (message: string, option: {remove: boolean}) => void, progress: (num: number) => void) {
    console.log(blobInfo)
    fetchUpload(blobInfo.blob(), progress).then(res => {
      success(res.data.url)
    }).catch(() => {
      failure('上传失败', { remove: true })
    })
  },
  // setup(editor){
  //       editor.ui.registry.addButton('meeting',{
  //           text:'套用模板',
  //           icon:'accessibility-check',
  //           onAction:function(){
  //               editor.windowManager.openUrl({
  //                   title:"选择会议模板",
  //                   url:'https://www.163.com',
  //                   width:840,
  //                   height:300
  //               });
  //           }
  //       });
  //   }
}

</script>

<style>
  .tox-tinymce-aux {
    z-index: 99999 !important;
  }
</style>