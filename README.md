whirls-plus 是一个 monorepo, 多个工程放到一个 git 仓库中;共享一套构建流程、代码规范.

通过 pnpm 管理依赖，通过 changesets 管理库的更新日志

## TODO

- app localStorage 缓存
- crud v-premission
- crud row action 按钮排序
- isAdmin
- [ ] 事项 1

## 模块

docs 在任意一个模块发生更改的时候都需要重新构建

- cli
- components
- utils
- app

## 常用库

- dayjs
- qs
- js-cookie
- animate.css
- animejs
- mescroll.js
- commander
- prompts
- file-saver
- jszip
- vue-tour 用户引导
- swiper 轮播

## 模块

### version

### changelog

- changesets
- conventional-changelog

### prettier

```sh
prettier
```

### lint

```sh
eslint
```
