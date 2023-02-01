<template>
<div>
	<el-upload
		class="b-upload-images"
		action=""
		v-model:file-list="fileList"
		list-type="picture-card"
		multiple
		:accept="accept"
		:show-file-list="true"
		:on-success="onSuccess" 
		:on-error="onError" 
		:before-upload="beforeUpload"
		:http-request="handlerUpload"
		:on-preview="onPreview"
		:before-remove="beforeRemove"
		:on-remove="onRemove"
		:limit="limit"
		:on-exceed="onExceed"
	>
		<template #default>
			<el-icon><Plus /></el-icon>
		</template>
		<template #tip v-if="tip">
			<div class="b-upload-images__tip">
				<span>{{ tip }}</span>
			</div>
		</template>
	</el-upload>

	  <el-dialog v-model="dialogVisible" title="图片预览">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, View, Download, Delete } from '@element-plus/icons-vue'
import type { UploadProps, UploadRequestOptions, UploadProgressEvent, UploadUserFile } from 'element-plus'
import { fetchUpload } from '@/service/base/common'

const props = withDefaults(defineProps<{
    modelValue: string | null | undefined
	limit: number
    accept?: string
    prefix?: string
    tip?: string
    width?: number
    height?: number
    size?: number
}>(),{
	size: 2,
    prefix: '',
    width: 178,
    height: 178,
	accept: 'image/*'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

watch(() => props.modelValue, (val) => {
	//  name
  	//  url
	const old = fileList.value.map(item => item.__url).join(',')
	if(val && val != old) {
		fileList.value = val.split(',').map(item => {
			return {
					name: item,
					url: props.prefix + item,
					__url:item,
			}
		})
	} else if(!val) {
		fileList.value = []
	}
}, {immediate: true})

// 限制数量
const onExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(`最多上传 ${props.limit} 个文件`)
}

// 限制大小
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (props.size && rawFile.size / 1024 / 1024 > props.size) {
        ElMessage.error(`文件大小不能超过 ${props.size} MB`)
        return false
    }
    return true
}

// 删除前提示
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
	return ElMessageBox.confirm(
    `确定要删除吗 ?`
  ).then(
    () => true,
    () => false
  )
}

const onRemove: UploadProps['onRemove'] = () => {
		emit('update:modelValue', fileList.value.map(item => item.__url).join(',') )
}

const onSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
		uploadFile.url = props.prefix + response.data.url
		uploadFile.__url = response.data.url
		nextTick(() => {
			// console.log(uploadFile, fileList.value)
			emit('update:modelValue', fileList.value.map(item => item.__url).join(',') )
		})
		
}

const onError: UploadProps['onError'] = (error, uploadFile) => {
    ElMessage.error('上传失败')
}

function handlerUpload(options: UploadRequestOptions) {
    return fetchUpload(options.file, (percent) => {
       options.onProgress({percent} as UploadProgressEvent)
    })
}

// 下载
function onDownload() {}

// 预览
const onPreview: UploadProps['onPreview'] = (uploadFile) => {
	console.log(uploadFile)
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

</script>

<style scoped>
.b-upload-images .b-upload-images__tip {
	font-size: 12px;
	color: #999;
}
</style>
