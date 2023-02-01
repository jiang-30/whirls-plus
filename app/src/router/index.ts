import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { useSettingStore, useTabStore, useUserStore, useRouteStore } from '@/stores'
import { allRoutes, constantRoutes } from './routes'
import { menuToMeta } from '@/utils/menu'
import type { IMenu } from '@/typings'

// console.log('enabledPages', allRoutes)

// 静态路由 constant: true 的路由
// 动态路由 通过menu配置的路由，可能覆盖静态路由；动态路由可以本地配置也可以远程加载

// 创建 VueRouter 路由实例
const router = createRouter({
  // try_files $uri $uri/ /index.html;
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(constantRoutes),
})

// 路由拦截器
// 1. 已登录
//    初始化数据 字典数据 权限数据; 动态路由加载后需要重新定向
//    跳转登录页重新跳转到首页
//    404页面需要判断是动态加载重新跳转
// 2. 未登录: 忽略路径则继续, 其他跳转到登录页面
router.beforeEach(async (to, from) => {
  const routeStore = useRouteStore()
  const userStore = useUserStore()
  const settingStore = useSettingStore()

  // console.log('to: ', to)

  settingStore.isLoading = true

  // 已登录
  if (userStore.isLogin) {
    await userStore.initHandler()

    if (to.name === routeStore.loginPageName) {
      return { name: routeStore.indexPageName }
    } else {
      useTabStore().removeTab(from)
      return true
    }
  } else {
    if (routeStore.isIgnore(to) && to.name !== routeStore.notFoundPageName) {
      useTabStore().removeTab(from)
      return true
    } else {
      return {
        name: routeStore.loginPageName,
        query: {
          redirect: to.fullPath,
        },
      }
    }
  }
})

// 路由拦后置截器
router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  // 停止 loading 关闭进度条
  useSettingStore().isLoading = false

  // 更新标题 title
  useSettingStore().appSubTitle = to.meta.title

  // 设置 tab 标签页
  useTabStore().addTab(to, from)

  // 页面缓冲
  useRouteStore().generateKeepAlive(to)
})

// 异常捕获
router.onError(error => {
  console.error('route error: ', error)
})

/**
 * 动态路由
 * 1. 移除动态加载的路由
 * 2. 动态加载
 *    没有设置 component 则通过 name 在已有路由中找
 *    如果有同名路由, 发出警告, 本地配置的不能移除，但是会优先使用传入数据
 */
export function generateRoutes(menuRoutes: IMenu[]) {
  const routeStore = useRouteStore()
  const dynamicRoutes: RouteRecordRaw[] = []

  // 格式化路由数据
  menuRoutes.forEach(menu => {
    // 只匹配一级路由, 嵌套路由需要反向查找
    const component = allRoutes.find(item => item.path === menu.component)

    if (component && component.meta && component.component) {
      // 找到的路由如果有子路由, 反向查找修改自路由配置
      const children: RouteRecordRaw[] = []
      // if(component.children && component.children.length) {

      //   children.push(...fun(component.children, menuRoutes))
      // }

      const routeMeta = menuToMeta(menu, component.meta)
      dynamicRoutes.push({
        path: routeMeta.path,
        name: routeMeta.name,
        component: component.component,
        redirect: routeMeta.redirect,
        children: children,
        meta: routeMeta,
      })
    } else {
      console.warn('菜单配置未找到一级组件', menu.component)
    }
  })

  // 为路由组件添加布局容器
  const layoutRoutes = setupLayouts(dynamicRoutes)

  // console.log('layoutRoutes', layoutRoutes)

  // 删除存在的动态路由
  routeStore.removeRoutes.forEach((item: () => void) => item())
  const removeRoutes: (() => void)[] = []

  // 添加路由
  layoutRoutes.forEach(item => {
    removeRoutes.push(router.addRoute(item))
  })

  // 并记录动态添加的路由
  routeStore.removeRoutes = removeRoutes
}

export default router
