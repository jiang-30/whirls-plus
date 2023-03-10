import 'vue-router'

/**
 * vue router meta
 */
declare module 'vue-router' {
  interface RouteMeta extends IMeta {}
}

// 路由元信息
export interface IMeta {
  // component: string
  id: string
  /**
   * 页面挂载到哪一个菜单, route yaml parentName, menus parentName
   */
  parentId: string
  /**
   * 是否开启
   * @default false
   */
  isEnabled: boolean
  /**
   * 是否是静态路由
   * @default false
   */
  isStatic: boolean
  /**
   * 菜单类型
   * @default page
   */
  type: 'menu' | 'page' | 'button'
  /**
   * 名称
   */
  title: string
  /**
   * 图标
   */
  icon: string
  /**
   * 是否展示在菜单栏中 isShow showMenu
   * @default false
   */
  isShow: boolean
  /**
   * 访问路径
   * @default route.path
   */
  path: string

  /**
   * 路由name
   * @default route.name
   */
  name: string
  /**
   * 路由重定向
   */
  redirect?: string
  /**
   * 页面布局
   * @default default
   */
  layout: 'default' | 'admin' | 'data' | string
  /**
   * 页面打开位置
   * @default _self
   */
  target: '_self' | '_blank'
  /**
   * 页面缓存 isKeepAlive
   * @default false
   */
  isAlive: boolean
  /**
   * 是否添加到tab
   * @default false
   */
  isTab: boolean
  /**
   * 是否需要权限 isAuth
   * @default true
   */
  isAuth: boolean
  /**
   * 权限列表使用 , 分隔
   */
  permissions: string[]
  /**
   * 排序
   * @default 100
   */
  sort: number

  [key: string]: any

  // _localComponentUrl: route.component, // 组件文件所在地址
  // _localParentComponentUrl: parent ? parent.component : null,
}

// 菜单
export interface IMenu extends IMeta {
  children?: IMenu[]
  // component: string
}

// 页面tab
export interface ITab extends Pick<IMeta, 'name' | 'title' | 'icon' | 'isTab'> {
  index: number
  fullPath: string
}

// 字典数据类型
export type IDictDataType = 'list' | 'tree'

// 字典项
export interface IDictItem {
  label: string
  value: string
  disabled?: boolean
}

// 字典
export interface IDict {
  code: string
  dataType?: IDictDataType
  items: IDictItem[]
}

// 用户信息
export interface IUserInfo {
  id: number
  username: string
  avatar: string
  [str: string]: any
}

// 响应数据
export interface IResult<T = any> {
  code: number
  message: string
  timestamp: number
  data: T
}

// 响应数据 - 分页数据
export interface IPage<T = any> {
  current: number
  size: number
  total: string
  records: T[]
}

export type IAdminLayout = 'aside' | 'top' | 'topAside'

export interface IConfig {
  /**
   * 语言
   */
  lang?: string
  /**
   *  应用名称
   */
  title: string

  /**
   *  应用描述
   */
  description?: string

  /**
   * 应用关键字
   * @type string
   */
  keyworks?: string

  /**
   * 页面logo
   */
  logo?: string

  /**
   * 引入文件
   */
  head?: [tag: string, Record<string, string>][]

  /**
   * 客户端id
   */
  clientCode: string

  /**
   * 客户端密钥
   */
  clientSecret: string

  /**
   * 主题配置
   */
  theme?: IConfigTheme

  /**
   * axios 请求配置
   */
  request?: IConfigRequest

  /**
   * 路由及权限配置
   */
  router?: IConfigRouter

  // build: {
  //   dirName: '',
  //   baseUrl: '',
  // },

  amap?: IConfigAmap
}

// 高德地图配置
export interface IConfigAmap {
  key: string
}

// 基本配置
export interface IConfigTheme {
  /**
   * tab栏
   * @default true
   */
  showTab?: boolean
  /**
   * 面包屑导航
   * @default false
   */
  showBreadcrumb?: boolean
  /**
   * 主题
   * @default light
   */
  themeMode?: 'light' | 'dark'
  /**
   * 灰色模式
   * @default false
   */
  grayModel?: boolean

  /**
   * 主题色
   * @default #409EFF
   */
  primaryColor?: string
  /**
   * header 背景色
   * @default #242f42
   */
  headerBgColor?: string
  /**
   * header 文字颜色
   * @default #E5EAF3
   */
  headerTextColor?: string
  /**
   * aside 文字颜色
   * @default #324157
   */
  asideBgColor?: string
  /**
   * aside 文字颜色
   * @default #E5EAF3
   */
  asideTextColor?: string
  /**
   * admin布局模式: 侧边导航 default | 顶部导航 top | 侧边和顶部导航 topAside
   * @default aside
   */
  adminLayout?: IAdminLayout

  /**
   * 页面最小宽度
   */
  minWidth?: number

  /**
   * 页面最小宽度
   */
  minHeight?: number

  /**
   * debug按钮
   * @default false
   */
  debugEnabled?: boolean
  /**
   * 全屏按钮
   * @default false
   */
  fullscreenEnabled?: boolean
  /**
   * 主题按钮
   * @default false
   */
  themeEnabled?: boolean
  /**
   * 风格设置按钮
   * @default false
   */
  settingEnabled?: boolean
  /**
   * 通知按钮
   * @default false
   */
  messageEnabled?: boolean
  /**
   * 帮助按钮
   * @default false
   */
  helpEnabled?: boolean
  /**
   * 个人中心按钮
   * @default false
   */
  userCenterEnabled?: boolean
  /**
   * 账户设置按钮
   * @default false
   */
  userSettingEnabled?: boolean

  /**
   * 脚注
   */
  footer?: {
    enabled: false

    /**
     * icp
     */

    /**
     * 公安备案号
     */

    /**
     * 版权信息
     */
    copyright?: {
      text: string
      /**
       * 版权点击跳转URL
       */
      url: string
      message: string
    }
  }
}

// axios请求配置
export interface IConfigRequest {
  /**
   * http请求统一前缀，一般代理使用
   */
  baseUrl?: string

  /**
   * http请求超时时间
   */
  timeout?: number
}

// 路由配置
export interface IConfigRouter {
  /**
   * 登录页名称
   * @default Login
   */
  loginPageName?: string
  /**
   * 首页名称
   * @default Dashboard
   */
  indexPageName?: string
  /**
   * 个人中心
   * @default UserCenter
   */
  userCenterPageName?: string
  /**
   * 账户设置
   * @default UserSetting
   */
  userSettingPageName?: string
  /**
   * 消息通知
   * @default UserMessage
   */
  userMessagePageName?: string
  /**
   * Debug
   * @default Debug
   */
  debugPageName?: string
  /**
   * Help 帮助页面
   * @default Help
   */
  helpPageName?: string
  /**
   * 404 页面名称
   * @default NotFound
   */
  notFoundPageName?: string
  /**
   * 未授权页面名称
   * @default NotAuthorized
   */
  notAuthorizedPageName?: string
  /**
   * 异常页面名称
   * @default Error
   */
  errorPageName?: string
  /**
   * 首页跳转
   * @default true
   */
  enabledIndexPage?: boolean
  /**
   * 忽略权限校验的页面路径 glob
   */
  ignorePagePath?: string[]
}
