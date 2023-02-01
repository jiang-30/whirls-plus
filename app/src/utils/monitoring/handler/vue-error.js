export default function (app) {
  app.config.errorHandler = (err, instance, info) => {
    console.log('error', err, instance, info)
  }
  app.config.warnHandler = (msg, instance, trace) => {
    console.log('warn', msg, instance, trace)
  }
  Vue.config.errorHandler = function (error, vm, info) {
    const { message, name, script, lineno, column, stack } = error
    console.log(message, name, script, lineno, column, stack)
    // console.log(vm)
    console.log(error, info)

    const data = {
      title: '前端监控系统',
      url: '页面URL',
      timeStamp: '访问时间戳',
      userAgent: '',
      kind: '分类大类',
      type: '分类小类',
      errorType: 'jsError',
      message: error.message,
      // filename: error.filename, // 那个文件报错
      position: '行列信息',
      stack: '堆栈信息',
      selector: '选择器', // 最后一个交互事件的元素 // 最后一个交互的事件对象的 path值
    }
    console.log(data)
  }
}

//   let metaData = {
//     message:error.message,
//     stack:error.stack,
//     info:info,
// };
// if(Object.prototype.toString.call(vm) === '[object Object]'){
//     metaData.componentName = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
//     metaData.propsData = vm.$options.propsData;
// }
// this.level = ErrorLevelEnum.WARN;
// this.msg = JSON.stringify(metaData);
// this.category = ErrorCategoryEnum.VUE_ERROR;
// this.recordError();

// Vue.config.errorHandler = function(err, vm, info) {
//   Vue.nextTick(() => {
//     store.commit('ADD_LOGS', {
//       type: 'error',
//       message: err.message,
//       stack: err.stack,
//       info
//     })
//     if (process.env.NODE_ENV === 'development') {
//       console.group('>>>>>> 错误信息 >>>>>>')
//       console.log(info)
//       console.groupEnd()
//       console.group('>>>>>> Vue 实例 >>>>>>')
//       console.log(vm)
//       console.groupEnd()
//       console.group('>>>>>> Error >>>>>>')
//       console.log(err)
//       console.groupEnd()
//     }
//   })
// }
