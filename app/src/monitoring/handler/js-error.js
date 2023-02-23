import formatStack from '../utils/format-stack'

/**
 * 需要排除 资源加载错误
 */
export default function () {
  window.addEventListener(
    'error',
    function (event) {
      // let lastEvent = getLastEvent();
      // 过滤掉与业务无关的错误
      // if (event.message === 'Script error.' || !event.filename) {
      //   return
      // }
      // if (
      //   errorTarget !== window &&
      //   errorTarget.nodeName &&
      //   LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]
      // ) {
      //   handleError(formatLoadError(errorTarget));
      // }
      const data = {
        kind: 'stability', // 监控指标的大类
        errorType: 'jsError', //jsError
        // errorType: event.error.name,
        type: 'jsError',
        // type: 'error', //error
        url: '页面URL', // 访问那个路径报错了
        filename: event.filename, // 那个文件报错event
        message: event.error.message, //报错信息  event.message,
        position: `${event.lineno}:${event.columnno}`, // 行列信息
        stack: formatStack(event.error.stack), // 堆栈信息 格式化后的
        // selector: lastEvent
        //   ? getSelector(lastEvent.path || lastEvent.target)
        //   : "",
      }

      console.log('jsError', data)
    },
    true,
  )
}
