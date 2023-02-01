<template>
    <el-upload
        class="b-upload-image"
        action=""
        :accept="accept"
        :show-file-list="false" 
        :on-success="onSuccess" 
        :on-error="onError" 
        :before-upload="beforeUpload"
        :http-request="handlerUpload"
    >
        <template #default>
            <div :style="{width: width + 'px', height: height + 'px', position: 'relative' }">
                <template  v-if="modelValue" >
                    <el-image
                        class="b-upload-image__cover"
                        :src="prefix + modelValue"
                        fit="cover"
                    >
                        <template #placeholder>
                            <div style="width: 100%; height: 100%;" v-loading="true"></div>
                        </template>
                    </el-image>
                    <!-- <div class="b-upload-image__action" @click.stop>
                        <el-icon  @click="onPreview"><View /></el-icon>
                        <el-icon @click="onDownload"><Download /></el-icon>
                        <el-icon  @click="onPreview"><Delete /></el-icon>
                    </div> -->
                </template>
            
                <el-icon v-else class="b-upload-image__trigger">
                    <Plus />
                </el-icon>
                <transition name="el-fade-in-linear">
                    <el-progress
                        v-show="uploading"
                        class="b-upload-image__progress"
                        type="circle"
                        :percentage="percentage"
                    ></el-progress>
                </transition>
            </div>
        </template>

        <template #tip v-if="tip">
            <div class="b-upload-image__tip">
                <span>{{ tip }}</span>
            </div>
        </template>
    </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, View, Download, Delete } from '@element-plus/icons-vue'
import type { UploadProps, UploadRequestOptions, UploadProgressEvent, UploadUserFile } from 'element-plus'
import { fetchUpload } from '@/service/base/common'


const props = withDefaults(defineProps<{
    modelValue: string | undefined
    accept?: string
    prefix?: string
    tip?: string
    width?: number
    height?: number
    size?: number
    circle?: boolean
}>(),{
    size: 2,
    accept: 'image/*',
    prefix: '',
    width: 178,
    height: 178,
    circle: false
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const borderRadius = computed(() => {
    if(props.circle) {
        return '50%'
    } else {
        return '6px'
    }
})

const uploading = ref(false)
const percentage = ref(0)

function onPreview(){}
function onDownload() {}
function onDelete() {}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (props.size && rawFile.size / 1024 / 1024 > props.size) {
        ElMessage.error(`上传文件大小不能超过 ${props.size} MB`)
        return false
    }
    return true
}


const onSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    uploading.value = false
    emit('update:modelValue', response.data.url)
}

const onError: UploadProps['onError'] = (error, uploadFile) => {
    uploading.value = false
    ElMessage.error('上传失败')
}

function handlerUpload(options: UploadRequestOptions) {
    percentage.value = 0
    uploading.value = true
    return fetchUpload(options.file, (percent) => {
        percentage.value = Math.floor(percent)
    })
}

</script>

<style scoped>
.b-upload-image .b-upload-image__cover {
    width: 100%;
    height: 100%;
    display: block;
}
.b-upload-image .b-upload-image__action {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 10px;
    color: #fff;
}
.b-upload-image .b-upload-image__trigger {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    text-align: center;
}
.b-upload-image .b-upload-image__progress {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.5);
}
.b-upload-image .b-upload-image__tip {
	font-size: 12px;
	color: #999;
}
</style>

<style>

.b-upload-image .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: v-bind(borderRadius);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.b-upload-image .el-upload:hover {
    border-color: var(--el-color-primary);
}
</style>
