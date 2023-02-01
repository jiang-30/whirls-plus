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

export {}
