interface ITarget {
  [key: string]: any
}

// const fun = <T, K extends keyof T>(obj: T, key: K): T[K] => {
//   return obj[key]
// }
/**
 * 通过逗号风格获取对象属性
 */

//  export function get (object: object, path: string|string[], def?: any): any;
//  export function set (object: object, path: string|string[], val: any): any;
export function get(object: ITarget, path: string, def?: any): any {
  return (object = path.split('.').reduce(function (obj, p) {
    return obj && obj[p]
  }, object)) === undefined
    ? def
    : object
}

// /**
//  * 通过逗号风格设置对象属性
//  */
// export function set(object: ITarget, path: string, val: any) {
//   let keys = path.split('.')
//   if (keys.length == 0) return
//   let obj
//   if (keys.length > 0) {
//     !/^(__proto__|constructor|prototype)$/.test(path) &&
//       (keys.slice(0, -1).reduce(function (obj, p) {
//         return (obj[p] = obj[p] || {})
//       }, (obj = object))[keys.pop()] = val),
//       object
//   }

//   return
// }

/**
 * 生成随机id
 */
//  export function uuid(length, chars) {
//   chars =
//       chars ||
//       '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   length = length || 8
//   var result = ''
//   for (var i = length; i > 0; --i)
//       result += chars[Math.floor(Math.random() * chars.length)]
//   return result
// }
// /**
//  * 生成随机len位数字
//  */
// export const randomLenNum = (len, date) => {
//   let random = ''
//   random = Math.ceil(Math.random() * 100000000000000)
//     .toString()
//     .substr(0, len || 4)
//   if (date) random = random + Date.now()
//   return random
// }
/**
 * 随机颜色
 */
export const generateColor = () => {
  ;`#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

/**
 * 复制到剪切板
 */
export const copyToClipboard = (text: string) => {
  return navigator.clipboard.writeText(text)
}

/**
 * 浏览器黑暗模式
 */
export const isDarkMode = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 全屏
 */
export function fullscreen(element: HTMLElement) {
  // 全屏则返回当前调用全屏的元素,不全屏返回null
  // || document.mozFullscreenElement
  // || document.webkitFullscreenElement;
  var fullscreenElement = document.fullscreenElement

  // 判断是否支持全屏
  // || document.mozFullscreenEnabled
  // || document.webkitFullscreenEnabled;
  var fullscreenEnabled = document.fullscreenEnabled

  // function launchFullscreen(element) {
  //   if (element.requestFullscreen) {
  //     element.requestFullscreen()
  //   } else if (element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen()
  //   } else if (element.msRequestFullscreen) {
  //     element.msRequestFullscreen()
  //   } else if (element.webkitRequestFullscreen) {
  //     element.webkitRequestFullScreen()
  //   }
  // }

  // function exitFullscreen() {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen()
  //   } else if (document.msExitFullscreen) {
  //     document.msExitFullscreen()
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen()
  //   } else if (document.webkitExitFullscreen) {
  //     document.webkitExitFullscreen()
  //   }
  // }
}
// export const getObjType = obj => {
//   var toString = Object.prototype.toString
//   var map = {
//     '[object Boolean]': 'boolean',
//     '[object Number]': 'number',
//     '[object String]': 'string',
//     '[object Function]': 'function',
//     '[object Array]': 'array',
//     '[object Date]': 'date',
//     '[object RegExp]': 'regExp',
//     '[object Undefined]': 'undefined',
//     '[object Null]': 'null',
//     '[object Object]': 'object',
//   }
//   if (obj instanceof Element) {
//     return 'element'
//   }
//   return map[toString.call(obj)]
// }

// export const looseEqual = function (a, b) {
//   const isObjectA = isObject(a)
//   const isObjectB = isObject(b)
//   if (isObjectA && isObjectB) {
//     return JSON.stringify(a) === JSON.stringify(b)
//   } else if (!isObjectA && !isObjectB) {
//     return String(a) === String(b)
//   } else {
//     return false
//   }
// }

// export const arrayEquals = function (arrayA, arrayB) {
//   arrayA = arrayA || []
//   arrayB = arrayB || []

//   if (arrayA.length !== arrayB.length) {
//     return false
//   }

//   for (let i = 0; i < arrayA.length; i++) {
//     if (!looseEqual(arrayA[i], arrayB[i])) {
//       return false
//     }
//   }

//   return true
// }

/**
 * 类型判断 object
 */
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

/**
 * 类型判断 object
 */
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * 类型判断 object
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 类型判断 object
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * 类型判断 object
 */
export const isIntegerKey = (key: unknown) => isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key

// export const isEqual = function (value1, value2) {
//   if (Array.isArray(value1) && Array.isArray(value2)) {
//     return arrayEquals(value1, value2)
//   }
//   return looseEqual(value1, value2)
// }

// export const isEmpty = function (val) {
//   // null or undefined
//   if (val == null) return true

//   if (typeof val === 'boolean') return false

//   if (typeof val === 'number') return !val

//   if (val instanceof Error) return val.message === ''

//   switch (Object.prototype.toString.call(val)) {
//     // String or Array
//     case '[object String]':
//     case '[object Array]':
//       return !val.length

//     // Map or Set or File
//     case '[object File]':
//     case '[object Map]':
//     case '[object Set]': {
//       return !val.size
//     }
//     // Plain Object
//     case '[object Object]': {
//       return !Object.keys(val).length
//     }
//   }

//   return false
// }

// export const isIE = function () {
//   return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
// }

// export const isEdge = function () {
//   return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
// }

// export const isFirefox = function () {
//   return !Vue.prototype.$isServer && !!window.navigator.userAgent.match(/firefox/i)
// }

// export const isFalsy = value => (value === 0 ? false : !value)

// export const isVoid = value => value === undefined || value === null || value === ''

/**
 * 保存文件
 */
// function saveFile(name, content) {
//   axios.request({
//       url: link,
//       responseType: 'blob' //关键代码，让axios把响应改成blob
//   }).then(res => {
// const link=URL.createObjectURL(res.data)
//       download(link, fileName)
//   })
//   if (typeof name == 'undefined') {
//       throw new Error('The first parameter name is a must')
//   }
//   if (typeof content == 'undefined') {
//       throw new Error('The second parameter content is a must')
//   }
//   if (!(content instanceof Blob)) {
//       content = new Blob([content])
//   }
//   const link = URL.createObjectURL(content)
//   download(link, name)
// }

/**
 * 防抖 在一定时间间隔内，多次调用一个方法，只会执行一次.
 */
// export function debounce(func, wait = 500, immediate = false) {
//   var timeout
//   return function () {
//     var context = this
//     var args = arguments

//     if (timeout) clearTimeout(timeout)
//     if (immediate) {
//       // 如果已经执行过，不再执行
//       var callNow = !timeout
//       timeout = setTimeout(function () {
//         timeout = null
//       }, wait)
//       if (callNow) func.apply(context, args)
//     } else {
//       timeout = setTimeout(function () {
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }
/**
 * 节流
 */

/**
 * 对象转化为formdata
 * @param {Object} object
 */
//  export function getFormData(object) {
//   const formData = new FormData()
//   Object.keys(object).forEach(key => {
//       const value = object[key]
//       if (Array.isArray(value)) {
//           value.forEach((subValue, i) =>
//               formData.append(key + `[${i}]`, subValue)
//           )
//       } else {
//           formData.append(key, object[key])
//       }
//   })
//   return formData
// }

/**
 * 音视频自动播放、循环播放
 */
export const autoPlay = (id: string) => {
  const music = document.getElementById(id) as HTMLAudioElement

  let state = 0

  document.addEventListener(
    'touchstart',
    () => {
      if (state == 0) {
        music?.play()
        state = 1
      }
    },
    false,
  )

  document.addEventListener(
    'WeixinJSBridgeReady',
    () => {
      music?.play()
    },
    false,
  )

  music.onended = () => {
    music.load()
    music.play()
  }
}

/**
 * 简析url
 */
export const urlPrase = (url: string) => {
  const aEl = document.createElement('a')

  aEl.href = url

  return {
    protocol: aEl.protocol,
    pathname: aEl.pathname,
    origin: aEl.pathname,
    host: aEl.host,
    search: aEl.search,
  }
}

// /**
//  * 递归寻找子类的父类
//  */
// export const findParent = (menu, id) => {
//   for (let i = 0; i < menu.length; i++) {
//     if (menu[i].children.length !== 0) {
//       for (let j = 0; j < menu[i].children.length; j++) {
//         if (menu[i].children[j].id === id) {
//           return menu[i]
//         } else {
//           if (menu[i].children[j].children.length !== 0) {
//             return findParent(menu[i].children[j].children, id)
//           }
//         }
//       }
//     }
//   }
// }

// /**
//  * 打开小窗口
//  */
// export const openWindow = (url, title, w, h) => {
//   // Fixes dual-screen position                            Most browsers       Firefox
//   const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
//   const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

//   const width = window.innerWidth
//   // ? window.innerWidth
//   // : document.documentElement.clientWidth
//   // ? document.documentElement.clientWidth
//   // : screen.width
//   const height = window.innerHeight
//   // ? window.innerHeight
//   // : document.documentElement.clientHeight
//   // ? document.documentElement.clientHeight
//   // : screen.height

//   const left = width / 2 - w / 2 + dualScreenLeft
//   const top = height / 2 - h / 2 + dualScreenTop
//   const newWindow = window.open(
//     url,
//     title,
//     `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`,
//   )

//   // Puts focus on the newWindow
//   if (window.focus) {
//     newWindow.focus()
//   }
// }

// export const kebabCase = function (str) {
//   const hyphenateRE = /([^-])([A-Z])/g
//   return str
//     .replace(hyphenateRE, '$1-$2')
//     .replace(hyphenateRE, '$1-$2')
//     .toLowerCase()
// }

// export const capitalize = function (str) {
//   if (!isString(str)) return str
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }


  // new URL()
  // url.searchParams.get(key)

  // 判断是否是黑暗模式
  // console.log( window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)


  // 判断是否是移动端
  // console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));