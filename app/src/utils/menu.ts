import menuList from '@/router/menus'
import type { IMenu } from '@/typings'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router/routes'

// 格式化菜单并使菜单扁平化, 菜单结构在 useMenuStore 中生成
// 添加id、格式化数据
// 只能是菜单,  页面需要从路由中查找,并修改配置
// 权限 本地菜单的页面权限问题
function flatTree<T>(treeMenus: T[], fun: (menu: T, pId?: string) => void) {
  function treeForEach(tree: any, pId?: string) {
    tree.forEach((menu: any) => {
      fun(menu, pId)
      if (menu.children && menu.children.length) {
        treeForEach(menu.children, menu.name)
      }
    })
  }
  treeForEach(treeMenus)
}

function flatMenus(treeMenu: any) {
  const menus: IMenu[] = []
  flatTree(treeMenu, (menu: any, pName) => {
    menus.push({
      ...menu,
      enabled: menu.enabled ?? true,
      type: menu.type ?? 'menu',
      showMenu: menu.showMenu ?? true,
      id: menu.name,
      parentId: pName ?? '',
      sort: menu.sort ?? 100,
    })
  })
  return menus
}

// 子级是动态路由不考虑
function flatPageMenus(treeData: RouteRecordRaw[]) {
  const list: RouteMeta[] = []
  flatTree(treeData, route => {
    const routeMeta = route.meta
    if (routeMeta?.showMenu) {
      list.push(routeMeta)
    }
  })
  return list
}

// 格式化页面菜单
const localFlatPageMenus = flatPageMenus(constantRoutes)

// 格式化菜单并使菜单扁平化
const localFlatMenus = flatMenus(menuList)

export const localMenuList = [...localFlatMenus, ...localFlatPageMenus]

export function menuToMeta(menu: any, meta: RouteMeta): RouteMeta {
  return {
    ...menu,
    id: menu.id,
    parentId: menu.parentId,
    enabled: menu.enabled ?? meta.enabled,
    constant: false,
    type: 'page',
    title: menu.title ?? meta.title,
    icon: menu.icon ?? meta.icon,
    showMenu: menu.showMenu ?? meta.showMenu,
    path: menu.path ?? meta.path,
    name: menu.name ?? meta.name,
    redirect: menu.redirect ?? meta.redirect,
    layout: menu.layout ?? meta.layout,
    target: menu.target ?? meta.target,
    keepAlive: menu.keepAlive ?? meta.keepAlive,
    tabBar: menu.tabBar ?? meta.tabBar,
    requireAuth: menu.requireAuth ?? meta.requireAuth,
    permission: menu.permission ? menu.permission.split(',').map((item: string) => item.trim()) : meta.permission,
    sort: menu.sort ?? meta.sort,
    _localComponentUrl: meta._localComponentUrl,
    _localParentComponentUrl: meta._localParentComponentUrl,
  }
}
