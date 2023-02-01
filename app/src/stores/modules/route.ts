import { defineStore } from 'pinia'
import router, { generateRoutes } from '@/router/index'
import config from '@/app.config'
import type { RouteLocationNormalized } from 'vue-router'
import { isMatch } from 'matcher'
import type { IMenu, ITab } from '@/typings'

const storeKey = 'route-store'

export const useRouteStore = defineStore({
  id: storeKey,
  state() {
    return {
      /**
       * 忽略权限的路径
       */
      ingorePagePathList: [...(config.router?.ignorePagePath ?? [])],

      /**
       * 登录页面路径
       */
      loginPageName: config.router?.loginPageName ?? 'Login',

      /**
       * 首页路径
       */
      indexPageName: config.router?.indexPageName ?? 'Home',

      /**
       * 首页路径
       */
      notFoundPageName: config.router?.notFoundPageName ?? 'NotFound',

      // 未授权页面
      notAuthorizedPageName: config.router?.notAuthorizedPageName ?? 'NotAuthorized',

      // 错误页面
      errorPageName: config.router?.errorPageName ?? 'Error',

      /**
       * 顶菜单切换是否跳转到首页
       */
      enabledIndexPage: config.router?.enabledIndexPage ?? true,

      /**
       * 动态路由
       */
      dynamicRoute: false,

      /**
       * 动态加载的路由
       */
      routes: <IMenu[]>[],

      /**
       * 动态加载后需要移除的路由
       */
      removeRoutes: <(() => void)[]>[],

      /**
       * keepAlive 页面的name列表
       */
      keepAliveList: <string[]>[],
    }
  },
  getters: {
    // 当前页面是否忽略权限校验
    isIgnore(state) {
      return (to: RouteLocationNormalized) => {
        if (isMatch(to.path, state.ingorePagePathList)) {
          return true
        } else if (to.meta.requireAuth === false) {
          return true
        }
        return false
      }
    },
  },
  actions: {
    // 跳转默认页面
    navigateOrDefault(tab?: ITab) {
      if (tab) {
        router.push({ path: tab.fullPath })
      } else {
        router.push({ name: this.indexPageName })
      }
    },

    // 通过 menuStore 中 menus 数据渲染动态路由
    setRoutes(menus: IMenu[]) {
      const routes = menus.filter(item => item.type === 'page' && item.constant === false)
      this.routes = routes
      generateRoutes(this.routes)
    },

    // 设置 keepAlive 页面name
    setKeepAliveList(list: string[]) {
      this.keepAliveList = list
    },

    // 添加 keepAlive 页面
    addKeepAlive(name: string | string[]) {
      if (typeof name === 'string') {
        !this.keepAliveList.includes(name) && this.keepAliveList.push(name)
      } else {
        name.forEach(v => {
          v && !this.keepAliveList.includes(v) && this.keepAliveList.push(v)
        })
      }
    },

    // 移除 keepAlive 页面
    removeKeepAlive(name: string | string[]) {
      if (typeof name === 'string') {
        this.keepAliveList = this.keepAliveList.filter(v => {
          return v !== name
        })
      } else {
        this.keepAliveList = this.keepAliveList.filter(v => {
          return !name.includes(v)
        })
      }
    },

    generateKeepAlive(to: RouteLocationNormalized) {
      //  // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
      if (to.meta.isAlive) {
        const componentName = to.matched.at(-1)?.components?.default.name
        if (componentName) {
          this.addKeepAlive(componentName)
        } else {
          console.warn('该页面开启了缓存但组件未设置组件名，会导致缓存失效，请检查;', to.meta.title, to.path)
        }
      }

      //  if (to.meta.cache) {
      //      let componentName = to.matched[to.matched.length - 1].components.default.name
      //      if (componentName) {
      //          keepAliveStore.add(componentName)
      //      } else {
      //          console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
      //      }
      //  }
      //  // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
      //  if (from.meta.cache) {
      //      let componentName = from.matched[from.matched.length - 1].components.default.name
      //      // 通过 meta.cache 判断针对哪些页面进行缓存
      //      switch (typeof from.meta.cache) {
      //          case 'string':
      //              if (from.meta.cache != to.name) {
      //                  keepAliveStore.remove(componentName)
      //              }
      //              break
      //          case 'object':
      //              if (!from.meta.cache.includes(to.name)) {
      //                  keepAliveStore.remove(componentName)
      //              }
      //              break
      //      }
      //      // 如果进入的是 reload 页面，则也将离开页面的缓存清空
      //      if (to.name == 'reload') {
      //          keepAliveStore.remove(componentName)
      //      }
      //  }
    },
  },
})
