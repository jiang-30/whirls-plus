import type { IMenu } from "@/typings";
import { defaultMenuConfig } from "../constant/default/menu";

// 菜单数据设置默认值
export function setDefaultMenuMate(menu: Partial<IMenu>): IMenu {
  return {
    ...menu,
    id: menu.id!,
    path: menu.path!,
    name: menu.name!,
    type: menu.type!,
    redirect: menu.redirect,
    parentId: menu.parentName ?? defaultMenuConfig.parentId,
    isEnabled: menu.isEnabled ?? defaultMenuConfig.isEnabled,
    isShow: menu.isShow ?? defaultMenuConfig.isShow,
    sort: menu.sort ?? defaultMenuConfig.sort,
    isStatic: menu.isStatic ?? defaultMenuConfig.isStatic,
    title: menu.title ?? defaultMenuConfig.title,
    icon: menu.icon ?? defaultMenuConfig.icon,
    layout: menu.layout ?? defaultMenuConfig.layout,
    target: menu.target ?? (defaultMenuConfig.target as IMenu["target"]),
    isAlive: menu.isAlive ?? defaultMenuConfig.isAlive,
    isTab: menu.isTab ?? defaultMenuConfig.isTab,
    isAuth: menu.isAuth ?? defaultMenuConfig.isAuth,
    permissions: menu.permissions ?? defaultMenuConfig.permissions,
  };
}
