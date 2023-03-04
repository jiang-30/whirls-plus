import { request } from "@/plugin/request";
import type { AxiosProgressEvent } from "axios";
// import type { ITest, ITestQuery } from "./types";

// 查询字典列表
export function fetchDict() {
  return request({
    method: "get",
    url: "/admin/dict/detail/all",
  });
}

// 文件上传
export function fetchUpload(
  file: File,
  progress?: (percentage: number, event?: AxiosProgressEvent) => void
) {
  const formData = new FormData();
  formData.append("file", file);

  return request({
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress(progressEvent) {
      if (progress && progressEvent.total) {
        const percent = (progressEvent.loaded / progressEvent.total) * 100;
        progress(percent, progressEvent);
      }
    },
    url: "/admin/file/upload",
    data: formData,
  });
}

/**
 * 文件保存
 */
// function saveFile(name, content) {
//   axios.request({
//       url: link,
//       responseType: 'blob' //关键代码，让axios把响应改成blob
//   }).then(res => {
// const link=URL.createObjectURL(res.data)
//       download(link, fileName)
//   })
//   if (typeof name == 'undefined') {
//       throw new Error('The first parameter name is a must')
//   }
//   if (typeof content == 'undefined') {
//       throw new Error('The second parameter content is a must')
//   }
//   if (!(content instanceof Blob)) {
//       content = new Blob([content])
//   }
//   const link = URL.createObjectURL(content)
//   download(link, name)
// }
