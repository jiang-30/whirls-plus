import type { App } from 'vue'
// import Vue from 'vue'
// import vueError from './error/vue-error'
// // import axios from '@/api/axios'
// import jsError from './error/js-error'
// // import formatSelector from '../utils/format-selector'
// // import getLastEvent from '../utils/last-event'
// // import store from './store'

// function captureInfo(data) {
//   if (process.env.NODE_ENV === 'development') {
//     console.error(data)
//   } else {
//     console.log(data)
//     // title: '前端监控系统',
//     // timeStamp: Date.now(),
//     // userAgent: window.navigator.userAgent,
//     // selector: formatSelector(getLastEvent().path) // '选择器' // 最后一个交互事件的元素 // 最后一个交互的事件对象的 path值
//     // url: window.localtion.href
//     // ip
//     // address
//   }
// }

interface IOption {
  id: string
  //   debug: false,
  //   storageKey: '',
  //   offlineLog: true, // 开启离线日志（默认关闭）
  //   enabledError: false,
  //   performance: false, 首屏时间，（DNS、TCP、SSL、request、Response、DOM、Load）（ LCP、FID 、CLS）
  //   business: false, // pv uv ip分布
}

/**
 * 注入 Vue axios router
 * axios - axios 接口异常
 * router - 环境信息
 */
class Monitor {
  constructor(option: IOption) {
    console.log('monitor start:')
  }

  /**
   * 添加vue监控
   */
  install(app: App) {
    console.log('vue install', app)
  }
}
export default Monitor
