
/**
 * // 在 node.js 用GET请求获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });

    // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

    // `onUploadProgress` 允许为上传处理进度事件
  // 浏览器专属
  onUploadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  // 浏览器专属
  onDownloadProgress: function (progressEvent) {
    // 处理原生进度事件
  },

  // 响应结构
  {
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
 */


 
      // "000": "操作太频繁，请勿重复请求",
      // "401": "当前操作没有权限",
      // "403": "当前操作没有权限",
      // "404": "资源不存在",
      // "417": "未绑定登录帐号，请使用密码登录后绑定",
      // "423": "演示环境不能操作，如需了解联系我们",
      // "426": "用户名不存在或密码错误",
      // "428": "验证码错误,请重新输入",
      // "429": "请求过频繁",
      // "479": "演示环境，没有权限操作",
      // default: "系统未知错误,请反馈给管理员"




      
/**
 * 包含加载、错误处理、去抖、节流、轮询、离开页面取消未完成的请求
 */
export function useApi(api: (params: any) => Promise<any>) {
  const loading = ref(false)
  const result = ref(null)
  const error = ref(null)

  const fetch = async (params: any) => {
    loading.value = true
    return api(params)
      .then(res => {
        result.value = res
      })
      .catch(err => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    loading,
    result,
    error,
    fetch,
  }
}

// export function useDept() {
//   const { loading, error, result, fetchResource } = useApi(fetchPage)

//   onMounted(() => {
//     fetchResource('3')
//   })

//   return {
//     loading,
//     list: result,
//     error,
//   }
// }


interface IParams {}

interface IRes {}

// export function fetch(params: IParams) {
//   return request<IRes>({
//     method: 'get',
//     url: 'url',
//     params,
//   })
// }

// fetch({})
//   .then(res => {
//     res.data
//   })
//   .catch(error => {})

/**
 * 取消请求
 */
// export const cancelRequest = (url: string | string[]) => {
//   return instance.cancelRequest(url)
// }

/**
 * 取消全部请求
 */
// export const cancelAllRequest = () => {
//   return instance.cancelAllRequest()
// }
