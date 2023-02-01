import { onMounted } from 'vue'
import type { RequestError } from '@/utils/request/error'

interface IOption<T> {
  refetch: boolean
  immediate?: boolean
  page?: false
  args: T

  // searchForm 默认查询参数
  // api 接口
  // queryParameters 查询参数
  //
}

// 加载状态
// 防抖、节流
// 轮询
// 离开页面取消请求
export function useApi<Q, R>(requestFn: (args: Q) => Promise<R>, option?: IOption<Q>) {
  const loading = ref(false)
  // 分页数据 sizeChange currentChange
  // const page = ref({
  //   current: 1,
  //   size: 10,
  //   total: 0,
  // })
  // 响应数据
  const data = ref<R>()

  // 异常
  const error = ref<RequestError>()

  // const canAbort
  // const statusCode: 200
  // const header = ref()
  //   if (canAbort.value)
  //     abort()
  // }, 100
  // getData

  // 请求资源
  const request = async (args: Q) => {
    loading.value = true

    // const params = Object.assign({
    //   current: page.value.current,
    //   size: page.value.size
    // },
    // )

    requestFn(args)
      .then(res => {
        data.value = res
      })
      .catch(err => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  if (option?.immediate) {
    onMounted(() => {
      // getData()
    })
  }

  return {
    loading,
    data,
    error,
    request,
  }
}
