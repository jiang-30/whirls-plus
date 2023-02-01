export interface IItem {
    // 监控指标的大类
    kind: 'stability',
    //jsError
    errorType: 'jsError', 
    // errorType: event.error.name,
    type: 'jsError',
    // 访问那个路径报错了
    url: '页面URL', 
    // 那个文件报错event
    filename: string
    //报错信息  event.message,
    message: string
    // 行列信息
    position: string
    // 堆栈信息 格式化后的
    stack: string
    // selector
    // selector: lastEvent
    //   ? getSelector(lastEvent.path || lastEvent.target)
    //   : "",
}