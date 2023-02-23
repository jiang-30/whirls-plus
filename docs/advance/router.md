- 依赖 `vite-plugin-vue-layouts` 来实现布局加载,
- 依赖 `vite-plugin-pages` 实现页面加载
- 依赖 `vite-plugin-pages-sitemap` 生成 sitemap.xml 和 robots.xml 文件

> 页面必须在 `/src/views/` 目录下; 通过 `vite-plugin-pages` 使用 `nuxtjs` 的路由规则自动加载组件生成路由, 可以在 vue 文件中使用 `<route>` 标签来启用及配置访问路径等信息; 对具有公用布局的页面可以利用 `vite-plugin-vue-layouts` 提供的布局容器功能来为页面组件嵌套一个父级组件

## 静态路由

新建 vue 页面启用 `meta.enabled: true` 以后, 设置 `meta.constant: true` 可以自动加载到路由中.

- 路径 path 默认根据 nuxtjs 路由规则生成,也可以通过 meta.path 修改. 对于多个路径访问同一个页面的需求可以使用参数路由, 文件名为 `_xxx`
- name 则是修改 path 中的 `/` 为 `-`.

1. **新建页面** `/src/views/demo/test.vue`

```yaml
# /src/views/demo/test.vue
<route lang="yaml">
  meta:
    enabled: true
    constant: true
    layout: default
</route>
```

自动构建生成的路由

```ts
{
  name: "demo-test",
  path: '/demo/test',
  props: true,
  component: () => import("/src/views/demo/test.vue"),
  meta: {
    enabled: true,
    constant: true,
    layout: default
  }
}
```

2. **访问** `/demo/test`

## 动态路由

页面启用后, 接口中 path 指定访问路径; compenent 指定 组件位置 省略 .vue

1. **页面配置**

```yaml
# /src/views/demo/index.vue
<route lang="yaml">
  meta:
    enabled: true
    constant: false
</route>
```

2. **接口数据**

```js
{
  path: '',
  component: '/demo/index' // 页面组件路径, 自动添加 /src/views 和 .vue
}
```

path: 动态参数、不指定使用自定路径??? name???

3. **接口数据添加到 useRouteStore**

```js
useRouteStore().setRoutes();
```

通过添加一个名称冲突的路由。如果添加与现有途径名称(name)相同的途径，会先删除路由，再添加路由;

## 指定布局容器

`vite-plugin-vue-layouts` 用于为一级路由匹配布局模式. `/src/layouts/admin.vue` 文件就是布局容器,需要提供 `<router-view />`来载入页面组件; **文件名** `admin` 就是布局默认名称, 可以通过 `layout` 来配置.

1. **添加布局容器**, 需要提供 `<RouterView>` 来承载页面组件

```vue
<!-- /src/layouts/demo.vue -->
<template>
  <section>
    <header>布局容器</header>
    <RouterView></RouterView>
  </section>
</template>
```

2. **新建页面** 使用布局容器

```yaml
# /src/views/demo/test.vue
<route lang="yaml">
  meta:
    enabled: true
    constant: true
    layout: demo
</route>
```

> layouts 功能的实现是通过修改路由由指定的布局容器作为一级路由, path 使用页面组件的 path; 页面组件改为其子路由并修改其 path 为 `""`, 这样访问同样的 path 就是一个二级路由的嵌套页面了

```js
// 修改前
{
  name: "demo",
  path: "/demo",
  props: true,
  component: () => import("/src/views/demo/index.vue"),
  meta: {
    enabled: true,
    constant: true,
    layout: "admin",
  }
}

// 修改后
{
  path: "/demo",
  component: () => import("/src/layouts/admin.vue"),
  children: [
    {
      name: "demo",
      path: "",
      props: true,
      component: () => import("/src/views/demo/index.vue"),
      meta: {
        enabled: true,
        constant: true,
        layout: "admin"
      }
    }
  ]
}
```

## 添加到菜单

> 菜单配置的优先级高于页面 route 的配置, 远程优先级高于本地; 远程 > 本地 > route

1. 通过 /src/constant/menu/index.ts 配置菜单及动态路由信息
2. 通过 接口请求获取菜单及动态路由信息

具体的菜单生产规则查看 useMenuStore

??? 菜单的上下级通过 path / id 确认

## 默认页面

1. 首页生成方式
1. 首页, 登录成功跳转、
1. 登录页
1. 页面缓存
1. 动态路由注册与销毁
1. 页面 tag 标签
1. 页面栈、面包屑

### 登录页

默认登录页, `/src/views/auth/login/index.vue`, path 需要配置到 `useRouteStore().LoginPagePath`, 系统一些逻辑中需要使用

### 首页

默认首页, `/src/views/dashboard/index.vue`, path 需要配置到 `useRouteStore().indexPagePath`, 系统一些逻辑中需要使用

###

## 路由元信息

### 远程菜单数据结构

```js
// remoteMenu
{
  id: '',
  parentId: '',
  type: 'menu',
  title: '权限管理',
  icon: 'ic:baseline-broadcast-on-personal',
  path: '/admin',
  isShow: true,
  component: '', // pageComponent
  target: 'self', // pageTarget
  layout: 'admin', // pageLayout
  keepAlive: false, // pageKeepAlive
  isTab: '', // pageTabBar
  closeableTabBar: true, // pageTabBarCloseable
  permission: [],
  sort: 1,
  enabled: '',
}
```

```ts
interface IMate {
  id: number | string;
  parentId: string;
  enabled: boolean;
  constant: boolean;
  type: "menu" | "page" | "button";
  title: string;
  icon: string;
  isShow: boolean;
  component: string;
  path?: string;
  name?: string;
  redirect?: string;
  layout: "admin" | "data" | "default" | string;
  target: "_self" | "_blank";
  keepAlive: boolean;
  isTab: boolean;
  tabBarCloseable: boolean;
  isAuth: boolean;
  permission: string;
  sort: number;
}
```

```ts
interface IAppMenu {
  /**
   * 唯一标识
   */
  id: number | string;

  /**
   * 上级路径 ??? parentId
   */
  parentId: string;

  /**
   * 是否启用.
   * @default: true
   */
  enabled: boolean;

  /**
   * 是否是静态路由.
   * @default: false
   */
  constant: boolean;

  /**
   * 类型: 菜单 menu, 页面 page. default: page
   * @default: page
   */
  type: "menu" | "page" | "button";

  /**
   * 菜单名称
   */
  title: string;

  /**
   * 菜单图标
   */
  icon: string;

  /**
   * 是否在菜单栏中展示.  ??? isShow isShowMenu
   * @default: true
   */
  isShow: boolean;

  /**
   * 组件路径. pageComponent: strinng
   */
  component: string; //

  /**
   * 为空则根据 component 路径自动配置,
   * 路由参数, /user/:id
   * 嵌套路由 只能修改一级路由 path, 子级不能修改
   */
  path?: string;

  /**
   * 为空则默认使用根据 path 自动生成的name
   * name 如果相同会删除已添加的路由, 应该设计一个警告信息
   */
  name?: string;

  /**
   * 路由重定向
   */
  redirect?: string;

  /**
   * 页面布局容器. ???   pageLayout
   * @default: admin
   */
  layout: "admin" | "data" | "default" | string;

  /**
   * 页面打开的位置:  _self 当前页面, _blank 新页面 ??? pageTarget
   * @default: _self
   */
  target: "_self" | "_blank";

  /**
   * 页面缓存. ???? pageKeepAlive
   * @default: false
   */
  keepAlive: boolean;

  /**
   * 是否是 tabbar 标签. ??? pageTabBar
   * @default: true
   */
  isTab: boolean;

  /**
   * 能否关闭标签能否关闭.  ??? pageTabBar
   * @default: true
   */
  tabBarCloseable: boolean;

  /**
   * 是否需要权限 isAuthenticated requireAuth
   */
  isAuth: boolean;

  /**
   * 访问页面需要的权限或者角色 ROLE_ROLE_ADMIN
   */
  permission: string;

  /**
   * 排序.
   * @default: 1
   */
  sort: number;
}
```

## 路由信息

路由中的 `path` 和 `name` 生成规则

```ts
interface IAppRoute {
  name: string;
  path: string;
  redirect: string; // 暂不考虑
  // alias: ''. // 暂不考虑
  // props: true, // boolean 路径参数通过 props 接收；对象原样传给 props
  // children:
  // component:
  meta: IAppMenu;
}
```

## 嵌套路由

创建和 文件名 **相同的同级** 目录名 后会生成嵌套路由. 嵌套路由的布局容器由一级路由设置, 子路由设置无效,只能使用一级路由的布局. 可以通过 eabled 启禁用页面组件.

嵌套路由为动态路由是子级路由时不能修改 path

## nuxt 路由

### Index routes

对于命名为 **index.vue** 的文件, 路由 **name** 和 **path** 生产规则

```js
[
  {
    name: "index",
    path: "/",
    component: "views/index.vue",
  },
  {
    name: "user",
    path: "/user",
    component: "views/user/index.vue",
  },
  {
    name: "user-one",
    path: "/user/one",
    component: "views/user/one.vue",
  },
];
```

### Nested routes

嵌套路由生成规则, 有一个 `users.vue` 文件和同级的 `users/` 文件夹会生成嵌套路由

```js
[
  {
    path: "/users",
    component: "views/users.vue",
    children: [
      {
        path: "",
        component: "views/users/index.vue",
        name: "users",
      },
      {
        path: ":id",
        component: "views/users/_id.vue",
        name: "users-id",
      },
    ],
  },
];
```

### Dynamic route segments

带参数的动态路由匹配通过 `_` 来实现

```js
[
  {
    name: "users-id",
    path: "/users/:id?",
    component: "pages/users/_id.vue",
  },
  {
    name: "slug",
    path: "/:slug",
    component: "pages/_slug/index.vue",
  },
  {
    name: "slug-comments",
    path: "/:slug/comments",
    component: "pages/_slug/comments.vue",
  },
];
```

### 404 页面

根目录下的 `_.vue` 匹配所有未匹配路由, 用于 404 页面. 生产页面路经为 `/:all(.*)*`

## 扩展

vite-plugin-pages 配置
加载组件生成路由, 格式化路由 meta 参数, 过滤掉 enabled 不是 true 的路由

```js
{
  dirs: [{ dir: 'src/views/', baseRoute: '' }],
  extensions: ['vue'],
  exclude: ['**/components/*.vue'],
  // importMode: '', // Top level index file: 'sync', others: async.
  routeBlockLang: 'YAML',
  routeStyle: 'nuxt'
  // extendRoute(route, parent) {
      // return {
      //   ...route,
      //   meta: {
      //     ...route.meta,
      //     _componentUrl: route.component,
      //     _parentComponentUrl: parent ? parent.component : null,
      //     _hasChildren: !!(route.children && route.children.length)
      //   }
      // }
  // },
  // onRoutesGenerated
}
```

```ts
import routes from "~pages";
```

```ts
// vite-env.d.ts
/// <reference types="vite-plugin-pages/client" />
```

vite-plugin-vue-layouts 配置

```js
// vite-plugin-vue-layouts 配置
{
  layoutsDirs: 'src/layouts',
  defaultLayout: 'default',
  exclude: ['**/components/*.vue'],
}
```
