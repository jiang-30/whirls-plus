import type { RouteMeta } from "vue-router";

type IMenu = RouteMeta;

// 定义的是静态菜单, 如果包含 page 则通过component或者name来匹配路由
// TODO 页面通过 component 、name、path 配置匹配路由
const menusList: Partial<IMenu>[] = [
  {
    type: "menu",
    name: "Permission",
    title: "权限管理",
    icon: "mdi:security-close",
    isEnabled: true,
    isShow: true,
    sort: 1,
  },
  {
    type: "menu",
    name: "System",
    title: "系统管理",
    icon: "mdi:console-network-outline",
    isEnabled: true,
    isShow: true,
    sort: 2,
  },
  {
    type: "menu",
    name: "Case",
    title: "案例",
    icon: "mdi:case-sensitive-alt",
    isEnabled: true,
    isShow: true,
    sort: 5,
  },
  {
    type: "menu",
    name: "Data",
    title: "可视化",
    icon: "ic:sharp-bar-chart",
    isEnabled: true,
    sort: 10,
  },
  {
    isEnabled: true,
    type: "page",
    name: "data-home",
    // component: "/data/home",
    title: "可视化",
    icon: "ic:sharp-bar-chart",
    isShow: true,
    sort: 20,
    layout: "data",
  },
];

export default menusList;
