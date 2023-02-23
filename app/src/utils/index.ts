interface ITarget {
  [key: string]: any;
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
  return (object = path.split(".").reduce(function (obj, p) {
    return obj && obj[p];
  }, object)) === undefined
    ? def
    : object;
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
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
};

// 获取元素类型
export const getObjType = (obj: unknown) => {
  const map: Record<string, string> = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };

  if (obj instanceof Element) {
    return "element";
  }

  return map[Object.prototype.toString.call(obj)];
};

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

// export const isEqual = function (value1, value2) {
//   if (Array.isArray(value1) && Array.isArray(value2)) {
//     return arrayEquals(value1, value2)
//   }
//   return looseEqual(value1, value2)
// }

export const isEmpty = function (val: any) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === "boolean") return false;

  if (typeof val === "number") return !val;

  if (val instanceof Error) return val.message === "";

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case "[object String]":
    case "[object Array]":
      return !val.length;

    // Map or Set or File
    case "[object File]":
    case "[object Map]":
    case "[object Set]":
      return !val.size;

    // Plain Object
    case "[object Object]":
      return !Object.keys(val).length;
  }

  return false;
};

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
 * 音视频自动播放、循环播放
 */
export const autoPlay = (id: string) => {
  const music = document.getElementById(id) as HTMLAudioElement;

  let state = 0;

  document.addEventListener(
    "touchstart",
    () => {
      if (state == 0) {
        music?.play();
        state = 1;
      }
    },
    false
  );

  document.addEventListener(
    "WeixinJSBridgeReady",
    () => {
      music?.play();
    },
    false
  );

  music.onended = () => {
    music.load();
    music.play();
  };
};

/**
 * 简析url
 */
export const urlPrase = (url: string) => {
  const aEl = document.createElement("a");

  aEl.href = url;

  return {
    protocol: aEl.protocol,
    pathname: aEl.pathname,
    origin: aEl.pathname,
    host: aEl.host,
    search: aEl.search,
  };
};

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

// export function formatbytes(bytes) {
//   if (!bytes || bytes === "0") return "0 B";
//   var k = 1024;
//   let sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
//   let i = Math.floor(Math.log(bytes) / Math.log(k));
//   return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
// }

// 格式化货币 '123456789' - '123,456,789'
// const formatMoney = money => {
//   return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',')
// }

// 请将字符串转换为驼峰式 foo_bar__ \ foo-bar-- -- fooBar
// const camelCase = (string) => {
//   const camelCaseRegex = /[-_\s]+(.)?/g
//   return string.replace(camelCaseRegex, (match, char) => {
//     return char ? char.toUpperCase() : ''
//   })
// }

// 将字符串的首字母转换为大写
// const capitalize = (string) => {
//   const capitalizeRegex = /(?:^|\s+)\w/g
//   return string.toLowerCase().replace(capitalizeRegex, (match) => match.toUpperCase())
// }

// html 转义
// const escape = (string) => {
//   const escapeMaps = {
//     '&': 'amp',
//     '<': 'lt',
//     '>': 'gt',
//     '"': 'quot',
//     "'": '#39'
//   }
//   // The effect here is the same as that of /[&amp;<> "']/g
//   const escapeRegexp = new RegExp(`[${Object.keys(escapeMaps).join('')}]`, 'g')
//   return string.replace(escapeRegexp, (match) => `&${escapeMaps[match]};`)
// }

// html 转义
// const unescape = string => {
//   const unescapeMaps = {
//     'amp': '&',
//     'lt': '<',
//     'gt': '>',
//     'quot': '"',
//     '#39': "'",
//   }
//   const unescapeRegexp = /&([^;]+);/g
//   return string.replace(unescapeRegexp, (match, unescapeKey) => {
//     return unescapeMaps[unescapeKey] || match
//   })
// }

// export const ua = navigator.userAgent.toLowerCase();
// 19.是否是微信浏览器

// export const isWeiXin = () => {
//     return ua.match(/microMessenger/i) == 'micromessenger'
// }
// 20.是否是移动端

// export const isDeviceMobile = () => {
//     return /android|webos|iphone|ipod|balckberry/i.test(ua)
// }
// 21.是否是QQ浏览器

// export const isQQBrowser = () => {
//     return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
// }
// 22.是否是爬虫

// export const isSpider = () => {
//     return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
// }
// 23.是否ios

// export const isIos = () => {
//     var u = navigator.userAgent;
//     if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {  //安卓手机
//         return false
//     } else if (u.indexOf('iPhone') > -1) {//苹果手机
//         return true
//     } else if (u.indexOf('iPad') > -1) {//iPad
//         return false
//     } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
//         return false
//     } else {
//         return false
//     }
// }
// 24.是否为PC端

// export const isPC = () => {
//     var userAgentInfo = navigator.userAgent;
//     var Agents = ["Android", "iPhone",
//         "SymbianOS", "Windows Phone",
//         "iPad", "iPod"];
//     var flag = true;
//     for (var v = 0; v < Agents.length; v++) {
//         if (userAgentInfo.indexOf(Agents[v]) > 0) {
//             flag = false;
//             break;
//         }
//     }
//     return flag;
// }
// 25.去除html标签

// export const removeHtmltag = (str) => {
//     return str.replace(/<[^>]+>/g, '')
// }
// 26.获取url参数

// export const getQueryString = (name) => {
//     const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//     const search = window.location.search.split('?')[1] || '';
//     const r = search.match(reg) || [];
//     return r[2];
// }
// 27.动态引入js

// export const injectScript = (src) => {
//     const s = document.createElement('script');
//     s.type = 'text/javascript';
//     s.async = true;
//     s.src = src;
//     const t = document.getElementsByTagName('script')[0];
//     t.parentNode.insertBefore(s, t);
// }

// 39.随机数范围

// export const random = (min, max) => {
//     if (arguments.length === 2) {
//         return Math.floor(min + Math.random() * ((max + 1) - min))
//     } else {
//         return null;
//     }
// }

// 53.去除空格,type: 1-所有空格 2-前后空格 3-前空格 4-后空格

// export const trim = (str, type) => {
//     type = type || 1
//     switch (type) {
//         case 1:
//             return str.replace(/\s+/g, "");
//         case 2:
//             return str.replace(/(^\s*)|(\s*$)/g, "");
//         case 3:
//             return str.replace(/(^\s*)/g, "");
//         case 4:
//             return str.replace(/(\s*$)/g, "");
//         default:
//             return str;
//     }
// }

// 54.字符转换，type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
// export const changeCase = (str, type) => {
//     type = type || 4
//     switch (type) {
//         case 1:
//             return str.replace(/\b\w+\b/g, function (word) {
//                 return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

//             });
//         case 2:
//             return str.replace(/\b\w+\b/g, function (word) {
//                 return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
//             });
//         case 3:
//             return str.split('').map(function (word) {
//                 if (/[a-z]/.test(word)) {
//                     return word.toUpperCase();
//                 } else {
//                     return word.toLowerCase()
//                 }
//             }).join('')
//         case 4:
//             return str.toUpperCase();
//         case 5:
//             return str.toLowerCase();
//         default:
//             return str;
//     }
// }

// ## 数组

// - 数组排序乱序

// ```js
// arr.sort(() => 0.5 - Math.random());
// ```

// - 随机获取一个值

// ```js
// function(arr) {
//   return arr[Math.floor(Math.random()*arr.length)]
// }
// ```

// - 清空数组

// ```js
// arr.length = 0;
// ```

// - 数组中最大值和最小值

// ```js
// Math.max(...arr);
// Math.min(...min);
// ```

// 40.将阿拉伯数字翻译成中文的大写数字
// export const numberToChinese = (num) => {
//     var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
//     var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
//     var a = ("" + num).replace(/(^0*)/g, "").split("."),
//         k = 0,
//         re = "";
//     for (var i = a[0].length - 1; i >= 0; i--) {
//         switch (k) {
//             case 0:
//                 re = BB[7] + re;
//                 break;
//             case 4:
//                 if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
//                     .test(a[0]))
//                     re = BB[4] + re;
//                 break;
//             case 8:
//                 re = BB[5] + re;
//                 BB[7] = BB[5];
//                 k = 0;
//                 break;
//         }
//         if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
//             re = AA[0] + re;
//         if (a[0].charAt(i) != 0)
//             re = AA[a[0].charAt(i)] + BB[k % 4] + re;
//         k++;
//     }

//     if (a.length > 1) // 加上小数部分(如果有小数部分)
//     {
//         re += BB[6];
//         for (var i = 0; i < a[1].length; i++)
//             re += AA[a[1].charAt(i)];
//     }
//     if (re == '一十')
//         re = "十";
//     if (re.match(/^一/) && re.length == 3)
//         re = re.replace("一", "");
//     return re;
// }

// 数字金额大写转换(可以处理整数,小数,负数)
export const moneyFormat = (n: number) => {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [
    ["元", "万", "亿"],
    ["", "拾", "佰", "仟"],
  ];
  const head = n < 0 ? "欠" : "";

  n = Math.abs(n);

  let s = "";

  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, "");
  }
  s = s || "整";
  n = Math.floor(n);

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = "";
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }

  return (
    head +
    s
      .replace(/(零.)*零元/, "元")
      .replace(/(零.)+/g, "零")
      .replace(/^整$/, "零元整")
  );
};

// 41.将数字转换为大写金额
// export const changeToChinese = (Num) => {
//     //判断如果传递进来的不是字符的话转换为字符
//     if (typeof Num == "number") {
//         Num = new String(Num);
//     };
//     Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
//     Num = Num.replace(/ /g, "") //替换tomoney()中的空格
//     Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
//     if (isNaN(Num)) { //验证输入的字符是否为数字
//         //alert("请检查小写金额是否正确");
//         return "";
//     };
//     //字符处理完毕后开始转换，采用前后两部分分别转换
//     var part = String(Num).split(".");
//     var newchar = "";
//     //小数点前进行转化
//     for (var i = part[0].length - 1; i >= 0; i--) {
//         if (part[0].length > 10) {
//             return "";
//             //若数量超过拾亿单位，提示
//         }
//         var tmpnewchar = ""
//         var perchar = part[0].charAt(i);
//         switch (perchar) {
//             case "0":
//                 tmpnewchar = "零" + tmpnewchar;
//                 break;
//             case "1":
//                 tmpnewchar = "壹" + tmpnewchar;
//                 break;
//             case "2":
//                 tmpnewchar = "贰" + tmpnewchar;
//                 break;
//             case "3":
//                 tmpnewchar = "叁" + tmpnewchar;
//                 break;
//             case "4":
//                 tmpnewchar = "肆" + tmpnewchar;
//                 break;
//             case "5":
//                 tmpnewchar = "伍" + tmpnewchar;
//                 break;
//             case "6":
//                 tmpnewchar = "陆" + tmpnewchar;
//                 break;
//             case "7":
//                 tmpnewchar = "柒" + tmpnewchar;
//                 break;
//             case "8":
//                 tmpnewchar = "捌" + tmpnewchar;
//                 break;
//             case "9":
//                 tmpnewchar = "玖" + tmpnewchar;
//                 break;
//         }
//         switch (part[0].length - i - 1) {
//             case 0:
//                 tmpnewchar = tmpnewchar + "元";
//                 break;
//             case 1:
//                 if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
//                 break;
//             case 2:
//                 if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
//                 break;
//             case 3:
//                 if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
//                 break;
//             case 4:
//                 tmpnewchar = tmpnewchar + "万";
//                 break;
//             case 5:
//                 if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
//                 break;
//             case 6:
//                 if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
//                 break;
//             case 7:
//                 if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
//                 break;
//             case 8:
//                 tmpnewchar = tmpnewchar + "亿";
//                 break;
//             case 9:
//                 tmpnewchar = tmpnewchar + "拾";
//                 break;
//         }
//         var newchar = tmpnewchar + newchar;
//     }
//     //小数点之后进行转化
//     if (Num.indexOf(".") != -1) {
//         if (part[1].length > 2) {
//             // alert("小数点之后只能保留两位,系统将自动截断");
//             part[1] = part[1].substr(0, 2)
//         }
//         for (i = 0; i < part[1].length; i++) {
//             tmpnewchar = ""
//             perchar = part[1].charAt(i)
//             switch (perchar) {
//                 case "0":
//                     tmpnewchar = "零" + tmpnewchar;
//                     break;
//                 case "1":
//                     tmpnewchar = "壹" + tmpnewchar;
//                     break;
//                 case "2":
//                     tmpnewchar = "贰" + tmpnewchar;
//                     break;
//                 case "3":
//                     tmpnewchar = "叁" + tmpnewchar;
//                     break;
//                 case "4":
//                     tmpnewchar = "肆" + tmpnewchar;
//                     break;
//                 case "5":
//                     tmpnewchar = "伍" + tmpnewchar;
//                     break;
//                 case "6":
//                     tmpnewchar = "陆" + tmpnewchar;
//                     break;
//                 case "7":
//                     tmpnewchar = "柒" + tmpnewchar;
//                     break;
//                 case "8":
//                     tmpnewchar = "捌" + tmpnewchar;
//                     break;
//                 case "9":
//                     tmpnewchar = "玖" + tmpnewchar;
//                     break;
//             }
//             if (i == 0) tmpnewchar = tmpnewchar + "角";
//             if (i == 1) tmpnewchar = tmpnewchar + "分";
//             newchar = newchar + tmpnewchar;
//         }
//     }
//     //替换所有无用汉字
//     while (newchar.search("零零") != -1)
//         newchar = newchar.replace("零零", "零");
//     newchar = newchar.replace("零亿", "亿");
//     newchar = newchar.replace("亿万", "亿");
//     newchar = newchar.replace("零万", "万");
//     newchar = newchar.replace("零元", "元");
//     newchar = newchar.replace("零角", "");
//     newchar = newchar.replace("零分", "");
//     if (newchar.charAt(newchar.length - 1) == "元") {
//         newchar = newchar + "整"
//     }
//     return newchar;
// }
