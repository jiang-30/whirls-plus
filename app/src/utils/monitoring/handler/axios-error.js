// 我们首先要判断是否存在 error.response，存在就说明接口有响应，也就是接口通了，但是返回错误；不存在则说明接口没通，请求一直挂起，多数是接口崩溃了。

// 如果没有响应，可以看作是接口超时异常，调用异常处理函数时传一个 null 即可。
/**
 * code：http 状态码
url：接口请求地址
method：接口请求方法
params：接口请求参数
error：接口报错信息
    let { url, method, params, data } = error.config
    let err_data = {
       url, method,
       params: { query: params, body: data },
       error: error.data?.message || JSON.stringify(error.data),
    })
 */