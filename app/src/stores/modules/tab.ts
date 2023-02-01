import { defineStore } from 'pinia'
import router from '@/router/index'
import { useRouteStore } from '@/stores'
import type { RouteLocationNormalized, RouteRecordName } from 'vue-router'
import type { ITab } from '@/typings'

const storeKey = 'tab-store'

// tag标签
export const useTabStore = defineStore({
  id: storeKey,
  persist: {
    enabled: true,
    strategies: [
      {
        key: storeKey,
      },
    ],
  },
  state: () => ({
    tabIndex: 1,
    tabs: <ITab[]>[],
  }),
  getters: {
    /**
     * 取最后加入的tab, 没有数据返回 null
     */
    nearestTab(store) {
      if (store.tabs.length) {
        return store.tabs.reduce((tab, current) => {
          if (tab && current.index > tab.index) {
            return current
          }
          return tab
        })
      }
    },
  },
  actions: {
    /**
     * 对开启 tabBar 的页面添加到tabs中
     */
    addTab(to: RouteLocationNormalized, from: RouteLocationNormalized) {
      this.tabIndex++

      // 如果页面已在tabs中,更新 index
      const tab = this.tabs.find(tab => tab.name === to.name)

      // 更新数据
      if (tab) {
        tab.fullPath = to.fullPath
        tab.index = this.tabIndex
        return
      }

      // 获取添加位置
      let index = this.tabs.findIndex(tab => tab.name === from.name)
      if (index === -1) {
        index = this.tabs.length
      }

      // 添加tab
      this.tabs.splice(index + 1, 0, {
        index: this.tabIndex,
        name: <string>to.name,
        title: to.meta.title,
        icon: to.meta.icon,
        fullPath: to.fullPath,
      })
    },

    // 不是tab的页面移除
    removeTab(from: RouteLocationNormalized) {
      if (!from.meta.tabBar) {
        const index = this.tabs.findIndex(tab => tab.name === from.name)
        if (index > -1) {
          this.tabs.splice(index, 1)
        }
      }
    },

    /**
     * 关闭标签页
     */
    closeTab(routeName: RouteRecordName) {
      const index = this.tabs.findIndex(tab => tab.name === routeName)
      if (index > -1) {
        this.tabs.splice(index, 1)
        // 如果关闭的是当前页面
        if (routeName === router.currentRoute.value.name) {
          useRouteStore().navigateOrDefault(this.nearestTab)
        }
      }
    },

    /**
     * 操作tab 关闭全部、关闭其他、关闭到右侧
     */
    operationTab(type: string) {
      const currentRouteName = router.currentRoute.value.name
      // 当前路由在他不中的位置
      const currentIndex = this.tabs.findIndex(tab => tab.name === currentRouteName)
      const hasCurrent = currentIndex > -1

      switch (type) {
        case 'other': // 关闭当前和不能关闭以外的
          if (hasCurrent) {
            this.tabs = this.tabs.filter(item => item.name === currentRouteName)
          }
          break
        case 'all': // 关闭不能关闭以外的
          this.tabs = []

          // 包含当前页面需要跳转页面
          if (hasCurrent) {
            useRouteStore().navigateOrDefault(this.nearestTab)
          }
          break
        case 'right':
          if (hasCurrent) {
            this.tabs.splice(currentIndex + 1, this.tabs.length - currentIndex)
          }
          break
      }
    },
  },
})
