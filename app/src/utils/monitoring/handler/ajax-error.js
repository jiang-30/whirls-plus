/**
 * {
 *  url: 访问url地址
 *  type: 'xhr,
 *  eventType: ''load // 事件类型
 *  pathname： 访问路径
 *  status 200 ok 状态码
 *  duration 200 持续时间
 *  response 响应内容
 *  params 参数
 * }
 */
/**
 * {
  "title": "前端监控系统", //标题
  "url": "http://localhost:8080/", //url
  "timestamp": "1590817024490", //timestamp
  "userAgent": "Chrome", //浏览器版本
  "kind": "stability", //大类
  "type": "xhr", //小类
  "eventType": "load", //事件类型
  "pathname": "/success", //路径
  "status": "200-OK", //状态码
  "duration": "7", //持续时间
  "response": "{\"id\":1}", //响应内容
  "params": "" //参数
}

  重写xhr的open、send方法
  监听load、error、abort事件
 */
export default function () {
  if (!window.XMLHttpRequest) {
    return
  }
  const oldOpen = XMLHttpRequest.prototype.open

  XMLHttpRequest.prototype.open = function (method, url, async) {
    this.logData = {
      method,
      url,
      async,
    }
    return oldOpen.apply(this, arguments)
  }

  const oldSend = XMLHttpRequest.prototype.send
  // let startTime

  XMLHttpRequest.prototype.send = function () {
    if (this.logData) {
      // startTime = Date.now()
      if (this.addEventListener) {
        this.addEventListener('error', _handleEvent, false)
        this.addEventListener('load', _handleEvent, false)
        this.addEventListener('abort', _handleEvent, false)
      }
      // else {
      //     const tempStateChange = this.onreadystatechange
      //     this.onreadystatechange = function (event) {
      //         tempStateChange.apply(this, arguments)
      //         if (this.readyState === 4) {
      //             _handleEvent(event)
      //         }
      //     }
      // }
    }
    return oldSend.apply(this, arguments)
  }
  const _handleEvent = event => {
    try {
      if (event && event.currentTarget && event.currentTarget.status !== 200) {
        // this.level = ErrorLevelEnum.WARN
        // this.category = ErrorCategoryEnum.AJAX_ERROR
        this.msg = event.target.response
        this.url = event.target.responseURL
        this.errorObj = {
          status: event.target.status,
          statusText: event.target.statusText,
        }
        this.recordError()
      }
    } catch (error) {
      console.log(error)
    }
  }
  XMLHttpRequest.prototype.send = function () {
    if (this.addEventListener) {
      this.addEventListener('error', _handleEvent)
      this.addEventListener('load', _handleEvent)
      this.addEventListener('abort', _handleEvent)
    } else {
      const tempStateChange = this.onreadystatechange
      this.onreadystatechange = function (event) {
        tempStateChange.apply(this, arguments)
        if (this.readyState === 4) {
          _handleEvent(event)
        }
      }
    }
    // return xhrSend.apply(this, arguments)
  }
}
