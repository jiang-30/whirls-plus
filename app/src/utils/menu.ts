import menuList from "@/router/menus";
import type { IMenu } from "@/typings";
import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router/routes";
import { setDefaultMenuMate } from "@/router/handler";

// 格式化菜单并使菜单扁平化, 菜单结构在 useMenuStore 中生成
// 添加id、格式化数据
// 只能是菜单,  页面需要从路由中查找,并修改配置
// 权限 本地菜单的页面权限问题
function flatTree<T>(treeMenus: T[], fun: (menu: T, pId?: string) => void) {
  function treeForEach(tree: any, pId?: string) {
    tree.forEach((menu: any) => {
      fun(menu, pId);
      if (menu.children && menu.children.length) {
        treeForEach(menu.children, menu.name);
      }
    });
  }

  treeForEach(treeMenus);
}

// 菜单扁平化
function flatMenus(treeMenu: IMenu[]) {
  const menus: IMenu[] = [];

  flatTree<IMenu>(treeMenu, (menu: any, pName) => {
    menu.parentName = pName;
    menu.id = menu.name;
    menu.type = menu.type ?? "menu";

    menus.push(setDefaultMenuMate(menu));
  });

  return menus;
}

// 子级是动态路由不考虑
function flatPageMenus(treeData: RouteRecordRaw[]) {
  const list: RouteMeta[] = [];

  flatTree(treeData, (route) => {
    const routeMeta = route.meta;
    if (routeMeta?.isShow) {
      list.push(routeMeta);
    }
  });

  return list;
}

// 静态路由及菜单列表（扁平化列表） = 路由格式化 + 本地菜单格式化
export const staticMenuList = [
  ...flatMenus(menuList as IMenu[]),
  ...flatPageMenus(constantRoutes),
];
