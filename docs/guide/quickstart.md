## 开发环境

- pnpm
- nodejs

## 开发工具

使用 vscode 编辑器, 并安装插件

- Vue Language Features (volar)
- TypeScript Vue Plugin(Volar)
- EditorConfig for VS Code
- DotENV
- Prettier
- ESLint
- Stylelint
- Element UI Snippets
- Tailwind CSS Intellisense
- Iconify Intellisense

## 初始化项目

1. 安装 `@whirls/cli` 脚手架

```sh
pnpm install -g @whirls/cli
```

2. 通过命令初始化项目

```sh
whirls init <project_name>
```

3. 根据需求选择相应功能，创建项目
   - 代码风格
   - 单元测试
   - 权限管理

## 目录结构

```
/
├── .husky
├── .vscode
├── cypress
├── public
├── src
|   ├── api             接口
|   ├── assets          静态文件
|   ├── components      自定义组件
|   ├── layouts         容器
|   ├── plugin          vue扩展
|   ├── router          路由配置
|   ├── stores          状态
|   ├── styles          样式
|   ├── utils           工具类
|   ├── views           页面
|   ├── typings.d.ts    类型定义
|   └── app.config.ts   配置
├── vite
├── env.*
├── .commitlintrc.cjs
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .stylelintrc.cjs
├── cypress.config.ts
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tailwind.config.cjs
├── tsconfig.app.json
├── tsconfig.config.json
├── tsconfig.json
├── tsconfig.vitest.json
└── vite.config.ts
```

## 项目配置

配置文件位于 `/src/app.config.ts`， 具体可配置项查看 [配置](/config/)

api 接口地址、title 等站点信息

## 副作用功能

有一下交互信息，也需要满足约定类型

- 登录信息
- 用户信息
- 菜单信息
- 字典信息
- 统一接口相应格式， 分页数据格式

## 新建页面

1. 在 `/src/views/` 目录下新建 `demo/index.vue` 文件, 或者通过 `@whirls/cli` 自动生成页面, 见[whirls](/cli/)
   代码片段生成
2. 通过 route 标签配置路由信息, 详细配置信息查看 [页面 route](/advance/router.html)

```yaml
meta:
  enabled: true
  constant: true
  layout: admin
  sort: 10
```

3. api 请求，在 `/src/api/` 目录下新建接口文件和类型文件, 通过 useApi 来使用请求
