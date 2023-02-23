// import formatStack from '../utils/format-stack'
/**
 * 因为资源加载的异常只会在当前元素触发，异常不会冒泡到 window，因此监听 window 上的异常是捕捉不到的
 * 原本以为脚本、样式和图像在无响应时，也会触发 error 事件，但事与愿违，并不是这样。

得用 performance.getEntriesByType("resource") 读取到资源列表（由PerformanceResourceTiming组成），然后循环列表。

当数据项的decodedBodySize属性为0时，就可判断无法读取这个资源；或者没有该属性，可认为当前资源缓存在浏览器中。
 */

export default function () {
  window.addEventListener(
    'error',
    function (event) {
      // var ERROR_SCRIPT = 'script'
      // var ERROR_STYLE = 'style'
      // var ERROR_IMAGE = 'image'
      // var ERROR_AUDIO = 'audio'
      // var ERROR_VIDEO = 'video'
      if (event.target !== window && event.target.nodeName && LOAD_ERROR_TYPE[event.target.nodeName.toUpperCase()]) {
        // handleError(formatLoadError(errorTarget));
        //   type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
        // desc: errorTarget.baseURI + "@" + (errorTarget.src || errorTarget.href),
        // stack: "no stack"
      }
      // 有 e.target.src(href) 的认定为资源加载错误
      if (event.target && (event.target.src || event.target.href)) {
        const data = {
          kind: 'stability', // 监控指标的大类 稳定性指标
          errorType: 'resourceError',
          // errorType: event.error.name,
          type: 'error',
          filename: event.target.src || event.target.href,
          tagName: event.target.tagName,
          // timeStamp: formatTime(event.timeStamp),
          selector: getSelector(event.path || event.target), //选择器
          // message: event.error.message,
          // position: `${event.lineno}:${event.columnno}`, // 行列信息
          // stack: formatStack(event.error.stack) // 堆栈信息 格式化后的
        }

        console.log('jsError', data)
      }
    },
    true,
  )
}

/**
   * 监控资源异常，即无法响应的资源
   * duration 大于20秒，就认为请求超时了。

在日志中会将各个阶段的时间参数都保存，便于后期的校验。
   */
window.addEventListener(
  'load',
  function () {
    // 罗列资源列表，PerformanceResourceTiming类型
    var resources = performance.getEntriesByType('resource')
    // 映射initiatorType和错误类型
    var hashError = {
      script: ERROR_SCRIPT,
      link: ERROR_STYLE,
      // img: ERROR_IMAGE
    }
    resources &&
      resources.forEach(function (value) {
        var type = hashError[value.initiatorType]
        /**
         * 非监控资源、响应时间在20秒内、监控资源是ma.gif或shin.js，则结束当前循环
         */
        if (
          !type || //非监控资源
          value.duration < 20000 || //20秒内
          value.name.indexOf('ma.gif') >= 0 ||
          value.name.indexOf('shin.js') >= 0
        ) {
          return
        }
        // 若是CSS文件，则过滤脚本文件
        if (type === ERROR_STYLE && value.name.indexOf('.js') >= 0) {
          return
        }
        handleError({
          type: type,
          desc: handleNumber(value.toJSON()),
        })
      })
  },
  false,
)
