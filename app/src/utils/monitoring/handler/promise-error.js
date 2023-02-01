import formatStack from '../utils/format-stack'

/**
 * 捕获未处理的 Promise 错误，当 Promise 被 reject 且没有 reject 处理器时触发
 * 想阻止异常打印，可以用上面的 error.preventDefault() 方法。
 */
export default function () {
  window.addEventListener('unhandledrejection', function (event) {
    console.log('unhandledrejection', event)
    //处理响应数据，只抽取重要信息
    //  var response = event.reason.response;
    let message
    let filename
    let position
    let stack
    const reason = event.reason

    if (typeof reason === 'string') {
      message = reason
    } else if (typeof reason === 'object') {
      if (reason.stack) {
        const matchResult = reason.stack.match(/at\s+(.+?):(\d+):(\d+)/)
        filename = matchResult[1]
        position = `${matchResult[2]}:${matchResult[3]}`
        stack = formatStack(reason.stack)
        message = reason.message
      }
    }
    const data = {
      kind: 'stability',
      type: 'error',
      errorType: 'promiseError',
      message,
      filename,
      position, //行列
      stack,
      // selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : '',
    }
  })
}
