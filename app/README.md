# whirl-admin

lint
测试功能
权限模块-系统功能模块 admin
账户模块

## TODO

- `<app-icon />`
- 默认值
- 缓存
- 刷新数据初始化, 退出
- 提交规范
- 风格约束 pnpm add vite-plugin-checker -D
- vite-plugin-favicon

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

## 授权

### 登录

- token
- authority

### 用户角色

- roleId
- roleName
- authority

## 样式

unoCss (需要继续)

- postcss-px-2-vm
- postcss-pxtorem

## husky

lint-staged 一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git 暂存区的文件，而不会影响到其他文件。
npx husky-init

hook 中 执行 npx lint-staged

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.vue": ["prettier --write", "eslint --fix", "stylelint --fix"],
    "*.{html,vue,vss,sass,less}": ["prettier --write", "stylelint --fix"],
    "package.json": ["prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

## 功能清单

- 权限管理
  - 用户管理
  - 角色管理
  - 部门管理
  - 菜单管理
  - 客户端管理
- 系统管理
  - 令牌管理
  - 文件管理
  - 日志管理
  - 配置管理
  - 字典管理
  - 系统监控
- 开发平台
  - 文档
  - 接口文档

## 相关框架

- [Vben Admin](https://doc.vvbin.cn/)
- [Pure Admin](http://yiming_chang.gitee.io/vue-pure-admin/#/about/index)
