<template>
    <div class="b-upload-file">
        <el-upload
            action=""
            v-model:file-list="fileList"
            list-type="text"
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
        >
            <template #default>
                <div @click="onEmit">
                    <el-button type="primary" :disabled="disabled" >
                        <el-icon><Upload /></el-icon>
                        <span>点击上传</span>
                    </el-button>
                </div>
            </template>
            <template #tip v-if="tip">
                <div class="b-upload-file__tip">
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
import { Upload, View, Download, Delete } from '@element-plus/icons-vue'
import type { UploadProps, UploadRequestOptions, UploadProgressEvent, UploadUserFile } from 'element-plus'
import { fetchUpload } from '@/service/base/common'

const props = withDefaults(defineProps<{
    modelValue: Record<string, string> | null | undefined
    accept?: string
    prefix?: string
    tip?: string
    size?: number
}>(),{
	size: 2,
    prefix: '',
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: Record<string, string>): void
}>()



const fileList = ref<any>([])
const limit = ref(1)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = computed(() => {
    return fileList.value.length >= limit.value
})

watch(() => props.modelValue, (val) => {
	const old = fileList.value.map((item: any) => item.__url).join(',')
	console.log('modelValue', val)
	console.log('oldmodelValue', old)
	if(val) {
        if(val.url != old) {
            fileList.value = {
                name: val.name,
                url: props.prefix + val.url,
                __name: val.name,
                __type: val.type,
                __size: val.size,
                __url: val.url,
            }
        }
	} else {
        fileList.value = []
    }
}, {immediate: true})

function onEmit(e: Event) {
    if (disabled.value) {
        e.stopPropagation();
    }
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
	emit('update:modelValue', {} )
}

const onSuccess: UploadProps['onSuccess'] = (response, uploadFile: any) => {
    uploadFile.url = props.prefix + response.data.url
    uploadFile.__url = response.data.url
    uploadFile.__type = response.data.contentType
    uploadFile.__size = response.data.size
    uploadFile.__name = response.data.originFilename
    emit('update:modelValue', {
        url:  response.data.url,
        type:  response.data.contentType,
        size:  response.data.size,
        name:  response.data.originFilename,
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

// 预览
const onPreview: UploadProps['onPreview'] = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url!
//   dialogVisible.value = true
}

</script>

<style scoped>
.b-upload-file {
    width: 100%;
}
.b-upload-file .b-upload-file__tip {
	font-size: 12px;
	color: #999;
}
</style>
