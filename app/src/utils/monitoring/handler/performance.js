// performance.getEntriesByType('navigation')。这里的白屏时间可能和实际真正的用户感官的白屏时间是有差异的，仅供参考。
//  performance.timing属性主要针对文档载入及之前的各个节点性能监控，无法落实到其他业务逻辑执行。想要监控更多信息，就需要使用Performance接口提供的方法来实现
// getEntries()
// 通过new PerformanceObserver监听器，我们可以监听所有资源（css,script,img,ajax等）加载的性能数据：加载时间，响应大小，http协议版本（http1.1/http2）等。而后我们需要通过一个数组去管理资源性能数据，在完成数据上报后，清空数组。

// 由于浏览器并没有提供一个统一的API使我们能够收集到ajax请求和响应数据，并且不管我们是用axois还是使用其他的http请求库，他们都是基于fetch和xmlHttpRequest实现的。因此只能通过重写fetch和xmlHttpRequest，并在对应的函数和逻辑中插入自定义代码，来达到收集的目的。相关的文章很多，这里就不再细说了。
// 一是onerror会获取不到跨域的script错误，解决方案也很简单：为跨域的script标签设置crossorigin属性，并且需要静态服务器为当前资源设置CORS响应头。
// 二是代码压缩后的报错信息需要通过sourceMap文件解析出源代码对应的行列和错误信息，sourceMap本身是一种数据结构，存储了源代码和压缩代码的关系数据，通过解析库能够很轻松转换它们。但如何自动化管理和操作sourceMap文件才是前端监控系统核心需要解决的问题。这里就需要结合企业内部的静态资源发布系统和前端监控系统，来解决低效率的手动打包上传问题

// 微信小程序底层使用js实现，有着它自己的一套生命周期，也提供了全局的API。通过重写它的部分全局函数和相关API我们能获取到：网络请求、错误信息、设备和版本信息等。由于微信小程序的加载流程是由微信APP控制的，js等资源也被微信内部托管，因此和web不同，我们没有办法获取到web中performance能获取到的页面和资源加载信息。下图是SDK主要使用的API

/**
 * 白屏
 * elementsFromPoint方法可以获取到当前视口内指定坐标处，由里到外排列的所有元素
根据 elementsFromPoint api，获取屏幕水平中线和竖直中线所在的元素


 * {
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590822618759",
  "userAgent": "chrome",
  "kind": "stability", //大类
  "type": "blank", //小类
  "emptyPoints": "0", //空白点
  "screen": "2049x1152", //分辨率
  "viewPoint": "2048x994", //视口
  "selector": "HTML BODY #container" //选择器
}
 */

/**
 *
 * {
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364183",
  "userAgent": "chrome",
  kind: "experience",
  type: "timing",
  connectTime: connectEnd - connectStart, //TCP连接耗时
  ttfbTime: responseStart - requestStart, //ttfb
  responseTime: responseEnd - responseStart, //Response响应耗时
  parseDOMTime: loadEventStart - domLoading, //DOM解析渲染耗时
  domContentLoadedTime:
  domContentLoadedEventEnd - domContentLoadedEventStart, //DOMContentLoaded事件回调耗时
  timeToInteractive: domInteractive - fetchStart, //首次可交互时间
  loadTime: loadEventStart - fetchStart, //完整的加载时间
}
 */

/**
 * 性能
 * FP	First Paint(首次绘制)	包括了任何用户自定义的背景绘制，它是首先将像素绘制到屏幕的时刻
 * FCP	First Content Paint(首次内容绘制)	是浏览器将第一个 DOM 渲染到屏幕的时间,可能是文本、图像、SVG等,这其实就是白屏时间
 * FMP	First Meaningful Paint(首次有意义绘制)	页面有意义的内容渲染的时间
 * LCP	(Largest Contentful Paint)(最大内容渲染)	代表在viewport中最大的页面元素加载的时间
 * DCL	(DomContentLoaded)(DOM加载完成)	当 HTML 文档被完全加载和解析完成之后, DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完成加载
 * L	(onLoad)	当依赖的资源全部加载完毕之后才会触发
 * TTI	(Time to Interactive) 可交互时间	用于标记应用已进行视觉渲染并能可靠响应用户输入的时间点
 * FID	First Input Delay(首次输入延迟)	用户首次和页面交互(单击链接，点击按钮等)到页面响应交互的时间
 * CLS	Cumulative Layout Shift 累积布局偏移	测量的是整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数
 * DCL	DOMContentLoaded	当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载
 *
FP、FCP、LCP、CLS、FID、FMP 可通过 PerformanceObserver获取

TCP连接耗时、首字节到达时间、response响应耗时、DOM解析渲染的时间、TTI、DCL、L等可通过performance.timing获取

长任务监听，PerformanceObserver 监听 longTask
 *
 *
 *
 *PerformanceObserver
 * {
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828364186",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "paint",
  "firstPaint": "102",
  "firstContentPaint": "2130",
  "firstMeaningfulPaint": "2130",
  "largestContentfulPaint": "2130"
}

{
  kind: "experience",
  type: "longTask",
  eventType: lastEvent.type,
  startTime: formatTime(entry.startTime), // 开始时间
  duration: formatTime(entry.duration), // 持续时间
  selector: lastEvent
    ? getSelector(lastEvent.path || lastEvent.target)
    : "",
}

{
  "title": "前端监控系统",
  "url": "http://localhost:8080/",
  "timestamp": "1590828477284",
  "userAgent": "chrome",
  "kind": "experience",
  "type": "firstInputDelay",
  "inputDelay": "3",
  "duration": "8",
  "startTime": "4812.344999983907",
  "selector": "HTML BODY #container .content H1"
}
 */
