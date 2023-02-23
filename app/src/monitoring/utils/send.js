/**
 * 兼容性高，所有的浏览器都支持。

不存在跨域问题。

不会携带当前域名中的 cookie。

不会阻塞页面加载。

相比于其他类型的图片格式（BMP、PNG等），能节约更多的网络资源。

不过这种方式也有一个问题，那就是采用 GET 的请求后，浏览器会限制 URL 的长度，也就是不能携带太多的数据，否则会报 431 错误。
 */

// 身份标识
// 每次进入页面都会生成一个唯一的标识，存储在 sessionStorage 中。在查询日志时，可通过该标识过滤出此用户的上下文日志，消除与他不相干的日志。

// function getIdentity() {
//   var key = "shin-monitor-identity";
//   //页面级的缓存而非全站缓存
//   var identity = sessionStorage.getItem(key);
//   if (!identity) {
//     //生成标识
//     identity = Number(
//       Math.random().toString().substr(3, 3) + Date.now()
//     ).toString(36);
//     sessionStorage.setItem(key, identity);
//   }
//   return identity;
// }

/**
 * 组装监控变量
 */
function _paramify(obj) {
  obj.token = shin.param.token
  obj.subdir = shin.param.subdir
  obj.identity = getIdentity()
  return encodeURIComponent(JSON.stringify(obj))
}
/**
 * 推送监控信息
 */
const send = function (data) {
  var ts = new Date().getTime().toString()
  var img = new Image(0, 0)
  img.src = shin.param.src + '?m=' + _paramify(data) + '&ts=' + ts
}
