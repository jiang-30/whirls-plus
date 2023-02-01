import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import type { IMeta } from '../src/typings'

export default function createPages() {
  return [
    Pages({
      dirs: [{ dir: 'src/views/', baseRoute: '' }],
      extensions: ['vue'],
      exclude: ['**/components/*.vue'],
      routeStyle: 'nuxt',

      // 初始化并扩展路由 meta 数据
      // _localComponentUrl 组件地址
      // _localParentComponentUrl 父组件地址
      extendRoute(route, parent) {
        const routeMeta = <IMeta>(route.meta ?? {})

        const meta = {
          ...routeMeta,
          id: routeMeta.name ?? route.name, //
          parentId: routeMeta.parentMenuName ?? '', // 通过 name. parentName
          enabled: routeMeta.enabled ?? false,
          constant: routeMeta.constant ?? false,
          type: 'page',
          title: routeMeta.title ?? '',
          icon: routeMeta.icon ?? '',
          showMenu: routeMeta.showMenu ?? false,
          path: routeMeta.path ?? route.path,
          name: routeMeta.name ?? route.name,
          redirect: routeMeta.redirect,
          layout: routeMeta.layout ?? 'default',
          target: routeMeta.target ?? '_self',
          keepAlive: routeMeta.keepAlive ?? false,
          tabBar: routeMeta.tabBar ?? false,
          requireAuth: routeMeta.requireAuth ?? true,
          permission: routeMeta.permission ? routeMeta.permission.split(',').map((item: string) => item.trim()) : [],
          sort: routeMeta.sort ?? 100,
          _localComponentUrl: route.component,
          _localParentComponentUrl: parent ? parent.component : null,
        }

        return {
          ...route,
          name: meta.name,
          path: meta.path,
          meta: meta,
        }
      },

      // 过滤掉 禁用(meta.enabled 不为 true) 的路由
      onRoutesGenerated(routes) {
        function forTree(list: any) {
          list.forEach((item: any) => {
            if (item.children && item.children.lenth) {
              item.children = forTree(item.children)
            }
            if (item.children && item.children.lenth == 0) {
              delete item.children
            }
          })
          return routes.filter(item => item.meta.enabled)
        }

        return forTree(routes)
      },
    }),
    Layouts({
      exclude: ['**/components/*.vue'],
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
  ]
}
