import type { RouteMeta } from 'vue-router'

type IMenu = RouteMeta

// 定义的是静态菜单, 如果包含 page
const menusList: Partial<IMenu>[] = [
  {
    title: '权限管理',
    icon: 'mdi:security-close',
    name: 'Authority',
    sort: 1,
  },
  {
    title: '系统管理',
    icon: 'mdi:console-network-outline',
    name: 'System',
    sort: 2,
  },
  {
    type: 'menu',
    title: '案例',
    icon: 'mdi:case-sensitive-alt',
    name: 'Case',
    sort: 5,
  },
  {
    type: 'page',
    title: '可视化',
    icon: 'ic:sharp-bar-chart',
    name: 'data-home',
    sort: 7,
  },
  {
    type: 'menu',
    title: '可视化',
    icon: 'ic:sharp-bar-chart',
    name: 'Data',
    showMenu: false,
    sort: 10,
  },
]

export default menusList
