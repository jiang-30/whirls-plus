import { request } from '@/utils/request'
import type { AxiosProgressEvent } from 'axios'
import type { ITest, ITestQuery } from './types'


// 查询字典列表
export function fetchDict() {
  return request({
    method: 'get',
    url: '/admin/dict/detail/all',
  })
}

// 文件上传
export function fetchUpload(file: File, progress?: (percentage: number, event?: AxiosProgressEvent) => void) {
  const formData = new FormData()
  formData.append('file', file)

  return request({
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress(progressEvent) {
      if (progress && progressEvent.total) {
        const percent = (progressEvent.loaded / progressEvent.total) * 100
        progress(percent, progressEvent)
      }
    },
    url: '/admin/file/upload',
    data: formData,
  })
}
