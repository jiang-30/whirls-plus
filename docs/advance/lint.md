
## 协作规范
前端更加关注交互视觉体验，而后端对高并发、高性能、高扩展上要求更高

- 需求导入、交互视觉导入分析 ：对产品导出的需求，参会各方包括产品、前端、后端、测试、UED，在对需求的认知上要达成一致，这是开发的第一步。
- 接口设计、前后端对接接口：后端给出接口，前后端要在接口字段设计上达成大致方向上的一致。
- 技术方案评审 ：在开发之前进行技术方案评审，再次确保各方在需求的认知上统一，并且双方就接口字段可行性上再次确认。
- 并行开发 、前后端自测：前后端并行开发，在此阶段前端可以 mock 数据进行页面渲染。
- 开发环境联调：前后端自测完成之后在开发环境上完成接口联调。

### 接口
- 接口注释需要写清楚：模块、枚举、必填/非必填、出参是否可能为 null
- 接口需要向下兼容，如果不兼容需要评估并且通知相应的业务方
- 接口文档上面有变更需及时同步前端
- 后端需保证文档上定义的参数，可以正常请求接口且功能正常稳定
- 统一计量单位约定：时间、金额
- 如果返回为空，则返回空数组 [] 或空集合 {}，有利于数据层面上的协作更加高效，减少前端很多琐碎的 null 值判断，特殊情况特殊分析
- 同一业务领域同一含义的接口字段命名不统， 维护一份字段词典


## prettier
```js
module.exports = {
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  vueIndentScriptAndStyle: false,
  htmlWhitespaceSensitivity: 'strict',
}
```


## eslint
.eslintignore 添加忽略规则
```js
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier'],
  env: {
    'vue/setup-compiler-macros': true,
  },
  globals: {
    useRoute: true,
    useRouter: true,
  },
  rules: {
    'vue/multi-word-component-names': 0,
  },
}
```


## stylelint
> stylelint 校验css, 如果像在 .vue 文件中使用需要定义 

- extends 后面的会覆盖前面的
- overrates 会适用于 files 指定的文件

--fix

--print-config
### 配置
`package.json.stylelint` `.stylelintrc` `.stylelintrc.js` `.stylelintrc.json` `stylelint.config.js` `stylelint.config.cjs`

```js
{
  "extends": ["stylelint-config-standard", "stylelint-config-prettier"]
}
```

 .stylelintignore 文件添加过滤规则 
 `Stylelint`[36] - Stylelint 本体
`stylelint-config-prettier`[37] - 关闭 Stylelint 中与 Prettier 中会发生冲突的规则
`stylelint-config-standard`[38] - Stylelint 官方推荐规则
`stylelint-config-recommended-vue`[39] - 检验 vue 文件中的样式
`stylelint-order`[40] - CSS 属性顺序规则插件

Stylelint v14 版本默认不支持 vue 文件中的 style 代码自动检测，详情查看官方迁移指南[41]
`stylelint-config-html`[42] - 解析 vue 文件
`postcss-html`[43] - 使用 stylelint-config-html 依赖的模块
`postcss-less`[44] - 对 less 文件进行解析


### plugin
- stylelint-no-unsupported-browser-features 检查浏览器是否支持


## commitlint
- "@commitlint/cli": "^16.2.1",
- "@commitlint/config-conventional": "^16.2.1",
- "husky": "^7.0.4",
- "lint-staged": "^12.3.4",

@commitlint/config-conventional
校验规则



### 配置文件
`commitlint.config.js`  `.commitlintrc.js` `.commitlintrc` `.commitlintrc.json` `.commitlintrc.yml` `package.json.commitlint`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

### husky 配置
commit-msg hook
`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`


### 规范
```bash
Header: <type>(<scope>): <subject>

Body: 本次 commit 的详细描述，可以分成多行。

Footer: 本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需
```
- build 变更项目构建或外部依赖
- chore 	变更构建流程或辅助工具 
- ci 更改持续集成软件的配置文件, 
- docs 	文档变更
- feat 新增功能
- fix 修复问题
- perf 改善性能
- refactor 代码重构
- revert 代码回退
- style 代码格式
- test 测试

### 示例

**feat 示例**
```bash
feat(browser): onUrlChange event (popstate/hashchange/polling)

Added new event to browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

**fix 示例**
```text
fix(compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

  @type {import('cz-git').UserConfig}
验证规范提交, `@commitlint/cli`[58] - Commitlint 本体
`@commitlint/config-conventional`[59] - 通用提交规范


## husky
1. pnpm install husky --save-dev
2. git config --unset core.hooksPath.
2. husky install
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```
3. npx husky add .husky/pre-commit "npm test"


### git hooks

`exit 1` 停止 

1. pre-commit
git commit 时执行

2. commit-msg
`npx --no-install commitlint --edit "$1"`

3. pre-push
npm run release
`npx --no-install standard-version`


## lint-staged

## changelog

`conventional-changelog -p angular -i CHANGELOG.md -s`

standard-version 

semantic-release.

自动升级版本
自动打tag
自动生成changelog
"standard-version": {
  "skip": {
    "bump": true,
    "changelog": true,
    "commit": true,
    "tag": true
  }
}

版本号 major.minor.patch

feature 会更新 minor
bug fix 会更新 patch
BREAKING CHANGES 会更新 major

手动控制
"standard-version --release-as major",

--first-release 不会升级版本号


hidden属性值控制是否将该类型的commit消息写入changlog, 不填的情况下默认是:false
.versionrc.js
module.exports = {
    "types": [
      { "type": "feat", "section": "✨ Features | 新功能" },
      { "type": "fix", "section": "🐛 Bug Fixes | Bug 修复" },
      { "type": "init", "section": "🎉 Init | 初始化" },
      { "type": "docs", "section": "✏️ Documentation | 文档" },
      { "type": "style", "section": "💄 Styles | 风格" },
      { "type": "refactor", "section": "♻️ Code Refactoring | 代码重构" },
      { "type": "perf", "section": "⚡ Performance Improvements | 性能优化" },
      { "type": "test", "section": "✅ Tests | 测试" },
      { "type": "revert", "section": "⏪ Revert | 回退", "hidden": true },
      { "type": "build", "section": "📦‍ Build System | 打包构建" },
      { "type": "chore", "section": "🚀 Chore | 构建/工程依赖/工具" },
      { "type": "ci", "section": "👷 Continuous Integration | CI 配置" }
    ]
  }


micromatch
