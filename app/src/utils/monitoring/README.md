log4js

按照 5W1H 法则来分析前端异常，需要知道以下信息

What，发⽣了什么错误：JS错误、异步错误、资源加载、接口错误等
When，出现的时间段，如时间戳
Who，影响了多少用户，包括报错事件数、IP
Where，出现的页面是哪些，包括页面、对应的设备信息
Why，错误的原因是为什么，包括错误堆栈、⾏列、SourceMap、异常录屏
How，如何定位还原问题，如何异常报警，避免类似的错误发生

ELK

当我们收到监控系统的告警或者相关同事的问题反馈时，我们能打开管理台，首先查看到实时的错误，如果发现是 js 的代码导致的问题，我们能很快找到前端代码错误的地方。如果不是前端的错误，我们通过收集的业务接口错误发现是后端接口的问题，我们也能及时的通知后端同事，在什么时间哪个接口报出 errorcode 为 xx 的错误，并且我们还能通过 traceId 直接查到这次 ajax 请求的后端链路监控数据。如果实在不是明显就能排查到的问题，我们还能通过收集到的用户轨迹、设备信息和网络请求等数据，多方面的分析还原用户当时的场景，来辅助我们排查代码中的难以复现的 bug 或者兼容问题。

前端监控地基本目的：了解当前项目实际使用的情况，有哪些异常，在追踪到后，对其进行分析，并提供合适的解决方案。

前端监控地终极目标：1 分钟感知、5 分钟定位、10 分钟恢复。

采集 - 传输接受 - 清洗 - 存储
前端埋点 = 数据上报 - 加工汇总 - 可视化展示 - 监控报警

sentry
arms

```js
new Aegis({
  id: 'xxxxx',
  uin: '123456',
  offlineLog: true, // 开启离线日志（默认关闭）
})
```

- 稳定性 stability
  js 错误：js 执行错误、promise 异常
  资源错误：js、css 资源加载异常
  接口错误：ajax、fetch 请求接口异常
  白屏：页面空白 blank

- 性能

  - 白屏时间 FP first paint 是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间
    白屏时间 = 页面开始展示的时间点 - 开始请求的时间点
    DNS 查询、建立 TCP 链接、发送首个 HTTP 请求、返回 HTML 文档、HTML 文档 head 解析完毕
    因此影响白屏时间的因素：网络、服务端性能、前端页面结构设计
    通常认为浏览器开始渲染<body>或者解析完<head>的时间是白屏结束的时间点。所以我们可以在 html 文档的 head 中所有的静态资源以及内嵌脚本/样式之前记录一个时间点，在 head 最底部记录另一个时间点，两者的差值作为白屏时间
  - 首屏时间 FCP First Contentful Paint 是指浏览器从响应用户输入网络地址，到首屏内容渲染完成的时间
    首屏时间 = 首屏内容渲染结束时间点 - 开始请求的时间点

- 用户体验 experience
- 业务 business
  pv：页面浏览量和点击量
  uv：访问某个站点的不同 ip 的人数
  用户在每一个页面的停留时间

## 捕获异常
- axios 拦截器中统一获取
- js

获取环境数据的意思是，不管是接口异常还是前端异常，除了异常本身的数据之外，我们还需要一些其他信息来帮助我们更快更准的定位到哪里出错了
app：应用的名称/标识
env：应用环境，一般是开发，测试，生产
version：应用的版本号
user_id：触发异常的用户 ID
user_name：触发异常的用户名
page_route：异常的页面路由
page_title：异常的页面名称


## 异常分类
Error 是所有错误的基类，其他错误类型继承该类型。所有错误类型都共享相同的属性。
 class MyError extends Error {
     constructor(message) {
         super();
         this.name = 'MyError'
         this.message = message     }
 }
- Error.prototype.message 错误消息。对于用户创建的 Error 对象，这是构造函数的第一个参数提供的字符串。
- Error.prototype.name 错误名称。这是由构造函数决定的。
- Error.prototype.stack 错误堆栈

JS 语法异常
- SyntaxError：语法异常；词法分析和语法分析阶段产生得异常，绝大部分 SyntaxError 都可以通过配置编辑器的校验工具，从而在开发阶段避免。
- ReferenceError：引用异常
- RangeError：范围异常
- Error：异常基类
- InternalError：内部异常
- TypeError: 类型异常
- EvalError: Eval 方法异常
- URIError: URI 相关方法产生的异常
Ajax 请求异常；
静态资源加载异常；
Promise 异常；
iframe 异常；

window.onerror 捕获语法异常

可以重写 setTimeout、setInterval 等异步方法，用同步的写法包裹 try 来捕获异步函数中发生的错误
window.addEventListener (‘unhandledrejection’,・・・); 捕获未处理的异步 reject
window.addEventListener (‘error’, …) 捕获资源异常
重写 fetch, XMLHttpRequest 来捕获接口状态

异常包括运行时错误、Promise 错误、框架错误等。

## 数据字段说明

- 性能；指标有加载时间、http 协议版本、响应体大小等
  - 资源
    - 页面加载 pages url performance 白屏时间 tcp 时间
    - css
    - js
    - image
  - 接口
- 错误
  - 接口错误 ajax url duration traceId
    - http 状态码
    - 业务响应
  - js 脚本错误
  - 资源错误 resource
    - css
    - js
    - image
- 辅助信息；用户的访问轨迹、用户点击行为、用户 ID、设备版本、设备型号、UV/UA 标识、traceId
  - 行为
  - 用户
  - 设备

```js
interface params = {
    url: 访问url地址,
    type: 'xhr',
    eventType: '', load // 事件类型
    pathname： 访问路径,
    status 200 ok 状态码,
    duration 200 持续时间,
    response 响应内容,
    params 参数,
}
```

## 上报

使用 img 标签

```js
  异常位置（行号lineNo，列号colNo）
  异常信息
  错误堆栈
  message
  error
  filename

  报错时间
  浏览器信息

  错误类型 - 业务类型、接口错误
```

jsError

```json
{
  "title": "前端监控系统", // 页面标题
  "url": "http://localhost:8080/", // 页面URL
  "timestamp": "1590815288710", // 访问时间戳
  "userAgent": "Chrome", // 用户浏览器类型
  "kind": "stability", // 大类
  "type": "error", // 小类
  "errorType": "jsError", // 错误类型
  "message": "Uncaught TypeError: Cannot set property 'error' of undefined", // 类型详情
  "filename": "http://localhost:8080/", // 访问的文件名
  "position": "0:0", // 行列信息
  "stack": "btnClick (http://localhost:8080/:20:39)^HTMLInputElement.onclick (http://localhost:8080/:14:72)", // 堆栈信息
  "selector": "HTML BODY #container .content INPUT" // 选择器
}
```

promiseError

```json
{
    ...
    "errorType": "promiseError",//错误类型
    "message": "someVar is not defined",//类型详情
    "stack": "http://localhost:8080/:24:29^new Promise (<anonymous>)^btnPromiseClick (http://localhost:8080/:23:13)^HTMLInputElement.onclick (http://localhost:8080/:15:86)",//堆栈信息
    "selector": "HTML BODY #container .content INPUT"//选择器
}
```

resourceError

```json
{
      ...
    "errorType": "resourceError",//错误类型
    "filename": "http://localhost:8080/error.js",//访问的文件名
    "tagName": "SCRIPT",//标签名
    "timeStamp": "76",//时间
}
```

## 异常捕获

同步任务和异步任务都可以捕获。可以得到具体的异常信息、异常文件的 url、行号和列号、异常堆栈信息
有一定的浏览器兼容性
跨域脚本无法准确捕获异常 crossorigin
// 定义的错误类型码
var ERROR_RUNTIME = "runtime";
var ERROR_SCRIPT = "script";
var ERROR_STYLE = "style";
var ERROR_IMAGE = "image";
var ERROR_AUDIO = "audio";
var ERROR_VIDEO = "video";
var ERROR_PROMISE = "promise";
var ERROR_VUE = "vue";
var ERROR_REACT = "react";
var LOAD_ERROR_TYPE = {
SCRIPT: ERROR_SCRIPT,
LINK: ERROR_STYLE,
IMG: ERROR_IMAGE,
AUDIO: ERROR_AUDIO,
VIDEO: ERROR_VIDEO
};

### error

为 window 注册 error 事件，捕获全局错误，过滤掉与业务无关的错误，例如“Script error.”、JSBridge 告警等，还需统一资源载入和运行时错误的数据格式

```js
window.addEventListener('error', e => {}, true)
```

### promise

```js
window.addEventListener('unhandledrejection', e => {
  console.log(`Promise.reject()中的内容，告诉你发生错误的原因:${e.reason}`)
  console.log(`Promise对象 :${e.promise}`)
})

// 重写 console.error
console.error = (func => {
  return (...args) => {
    // 在这里就可以收集到console.error的错误
    // 做一些事情
    console.log('做一些事情')
    func.apply(console, args)
  }
})(console.error)
```

### vue

```js
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
```

## 行为搜集

将行为分成：用户行为、浏览器行为、控制台打印行为。监控这些主要是为了在排查错误时，能还原用户当时的各个动作，从而能更好的找出问题出错的原因

## sourcemap

productionSourceMap: true // 生成 .map 文件
脚本打包完成后自动上传
source-map

## 难点

虽然把错误都搜集起来了，但是现代化的前端开发，都会做一次代码合并压缩混淆，也就是说，无法定位错误的真正位置。

为了能转换成源码，就需要引入自动堆栈映射（SourceMap），webpack 默认就带了此功能，只要声明相应地关键字开启即可。

我选择了 devtool: "hidden-source-map"，生成完成的原始代码，并在脚本中隐藏 Source Map 路径。

//# sourceMappingURL=index.bundle.js.map
在生成映射文件后，就需要让运维配合，编写一个脚本（在发完代码后触发），将这些文件按年月日小时分钟的格式命名（例如 202103041826.js.map），并迁移到指定目录中，用于后期的映射。

之所以没有到秒是因为没必要，在执行发代码的操作时，发布按钮会被锁定，其他人无法再发。

映射的逻辑是用 Node.js 实现的，会在后文中详细讲解。注意，必须要有列号，才能完成代码还原。

## 存储

```mysql
CREATE TABLE `web_monitor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project` varchar(45) COLLATE utf8mb4_bin NOT NULL COMMENT '项目名称',
  `project_subdir` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '项目的子目录，有些项目下会将活动放置在各个子目录中',
  `digit` int(11) NOT NULL DEFAULT '1' COMMENT '出现次数',
  `message` text COLLATE utf8mb4_bin NOT NULL COMMENT '聚合信息',
  `ua` varchar(600) COLLATE utf8mb4_bin NOT NULL COMMENT '代理信息',
  `key` varchar(45) COLLATE utf8mb4_bin NOT NULL COMMENT '去重用的标记',
  `category` varchar(45) COLLATE utf8mb4_bin NOT NULL COMMENT '日志类型',
  `source` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'SourceMap映射文件的地址',
  `ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `identity` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '身份，用于连贯日志上下文',
  `day` int(11) DEFAULT NULL COMMENT '格式化的天（冗余字段），用于排序，20210322',
  `hour` tinyint(2) DEFAULT NULL COMMENT '格式化的小时（冗余字段），用于分组，11',
  `minute` tinyint(2) DEFAULT NULL COMMENT '格式化的分钟（冗余字段），用于分组，20',
  `message_status` int(11) DEFAULT NULL COMMENT 'message中的通信状态码',
  `message_path` varchar(45) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'message通信中的 path',
  `message_type` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'message中的类别字段',
  PRIMARY KEY (`id`),
  KEY `idx_key_category_project_identity` (`key`,`category`,`project`,`identity`),
  KEY `idx_category_project_identity` (`category`,`project`,`identity`),
  KEY `index_ctime` (`ctime`),
  KEY `idx_category_ctime` (`category`,`ctime`),
  KEY `idx_category_project_ctime` (`category`,`project`,`ctime`),
  KEY `idx_messagepath` (`message_path`),
  KEY `idx_category_messagetype_ctime` (`category`,`message_type`,`ctime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='前端监控日志'
```

## 优化

项目 token、日志类别和日志内容拼接成一段字符串，再用 MD5 加密
const key = crypto.createHash("md5").update(token + category + message).digest("hex");

将 key 作为条件判断数据库中是否存在这条记录，若存在就给 digit 字段加一

## 分析

监控看板、趋势分析、日志列表和定时任务等

在监控看板中包含今日数据和往期趋势折线图，今日数据有今日和昨日的日志总数、错误总数和影响人数，通信、事件、打印和跳转等总数。
其中错误总数会按照 category:"error" 的 sum(digit) 来求和，而影响人数只会按照记录的个数来计算。

往期趋势中，会展示错误、500、502 和 504 错误、日志总数折线图，这些数据会被保存在一张额外的统计表中，这样就不必每次实时计算了
