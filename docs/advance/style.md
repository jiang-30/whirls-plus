# 样式

> element plus 完整导入, 包括组件、样式、黑暗模式样式； 配置tailwindcss；为tailwindcss扩展element plus颜色主题变量； 修改主题模式； 修改主题色；
```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

app.use(ElementPlus)
```

## 使用

### 状态与颜色值
- hover、focus light
- active dark
- disabled lighter

### 尺寸颜色值
- color:darker dark base light lighter extra-light
- size: sm md lg xl

### 配合element plus
主题色和暗黑模式；需要扩展 tailwindcss, 根据element plus主题样式生成扩展tailwindcss；支持 element plus 中颜色的变量, 定义的颜色值应该支持 opacity
```js
{
  primary: {
    'DEFAULT': 'rgba(var(--el-color-primary-rgb), <alpha-value>)',
    'dark': 'var(--el-color-primary-dark-2)',
    'light': 'var(--el-color-primary-light-3)',
    'lighter': 'var(--el-color-primary-light-5)',
  },
  success: 'rgba(var(--el-color-success-rgb), <alpha-value>)',
  warning: 'rgba(var(--el-color-warning-rgb), <alpha-value>)',
  danger: 'rgba(var(--el-color-danger-rgb), <alpha-value>)',
  error: 'rgba(var(--el-color-error-rgb), <alpha-value>)',
  info: 'rgba(var(--el-color-info-rgb), <alpha-value>)',
}
```

针对暗黑模式使用的颜色值， 扩展element-plus模式变量到tailwindcss
```css
/* 背景颜色 */
.bg-block {
  background-color: var(--el-bg-color);
}
.bg-page {
  background-color: var(--el-bg-color-page);
}
.bg-darker {
  background-color: var(--el-fill-color-darker);
}
.bg-dark {
  background-color: var(--el-fill-color-dark);
}
.bg-base {
  background-color: var(--el-fill-color);
}
.bg-light {
  background-color: var(--el-fill-color-light);
}
.bg-lighter {
  background-color: var(--el-fill-color-lighter);
}
.bg-extra-light {
  background-color: var(--el-fill-color-extra-light);
}
.bg-blank {
  background-color: var(--el-fill-color-blank);
}

/* 文字颜色 */
.text-dark {
  color: var(--el-text-color-primary);
}
.text-base {
  color: var(--el-text-color-regular);
}
.text-light {
  color: var(--el-text-color-secondary);
}
.text-lighter {
  color: var(--el-text-color-placeholder);
}
.text-extra-light {
  color: var(--el-text-color-disabled);
}

/* 边框颜色 */
.border-darker {
  border-color: var(--el-border-color-darker);
}
.border-dark {
  border-color: var(--el-border-color-dark);
}
.border-base {
  border-color: var(--el-border-color);
}
.border-light {
  border-color: var(--el-border-color-light);
}
.border-lighter {
  border-color: var(--el-border-color-lighter);
}
.border-extra-light {
  border-color: var(--el-border-color-extra-light);
}

/* 阴影颜色 */
.shadow-dark {
  box-shadow: var(--el-box-shadow-dark);
}
.shadow-base {
  box-shadow: var(--el-box-shadow);
}
.shadow-light {
  box-shadow: var(--el-box-shadow-light);
}
.shadow-lighter {
  box-shadow: var(--el-box-shadow-lighter);
}
```


### 引入
自定义样式多的时候使用 postcss 插件 postcss-import 来导入到主css文件中

```css
/** index.css 需要引入到全局样式中 */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {}

@layer components {
  .page {
    /* theme('colors.white') */
    @apply m-2 p-2  bg-white rounded-lg;
  }
  .page-light {
    /* theme('colors.white') */
    @apply m-2 p-2  bg-white rounded;
  }
  .page-dark {
    /* theme('colors.white') */
    @apply m-2 p-2 rounded;
  }
}

@layer utilities {

}

```

## Tailwindcss

通过postcss来构建tailwindcss, 
```bash
pnpm install -D tailwindcss postcss
```

### 概念
- layer
  基础样式 base, 组合样式 components, 功能样式 utilities
  分层的目的是解决样式优先级的问题， base < components < utilities
- 变体
  'first', 'last', 'odd', 'even', 'visited','checked', 'group-hover', 'group-focus', 'focus-within', 'hover', 'focus', 'focus-visible', 'active', 'disabled',
- @layer、 @apply、theme、screen

### 配置
postcss.config.js
```js
// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.js',
    },
    autoprefixer: {},
  },
}
```

tailwind.config.js
```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          'DEFAULT': 'rgba(var(--el-color-primary-rgb), <alpha-value>)',
          'dark': 'var(--el-color-primary-dark-2)',
          'light': 'var(--el-color-primary-light-3)',
          'lighter': 'var(--el-color-primary-light-5)',
        },
        success: 'rgba(var(--el-color-success-rgb), <alpha-value>)',
        warning: 'rgba(var(--el-color-warning-rgb), <alpha-value>)',
        danger: 'rgba(var(--el-color-danger-rgb), <alpha-value>)',
        error: 'rgba(var(--el-color-error-rgb), <alpha-value>)',
        info: 'rgba(var(--el-color-info-rgb), <alpha-value>)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // preflight: false,
  }
}
```

## postcss扩展

postcss-import	支持@import写法
postcss-url	支持@url写法
postcss-bem	支持BEM元素规则命名
postcss-nested	支持类选择器嵌套写法，模拟SASS嵌套选择器写法。
postcss-nesting	支持符合W3C规范的嵌套类选择器写法
postcss-simple-vars	支持变量
postcss-advanced-variables	支持类似SASS自定义变量并引用，实现编写变量、条件、循环。
postcss-preset-env	支持变量运算

cssnano	优化和压缩CSS，已包含autoprefixer插件。
postcss-aspect-ratio-mini	容器比匹配
postcss-cssnext	实现嵌套编程
postcss-px-to-viewport	将px转换为vw以适应各种屏幕
postcss-write-svg	1px细线的绘制


## 主题色
import {useDark, useToggle, useCssVar} from '@vueuse/core'
默认主题色就是 ElementPlus 的默认 primary
通过css 变量来控制主题色, 使用 `document.documentElement.setProperty(key, value)` 修改css变量

```css
/** 定义变量 */
:root {
  --theme-color: #fff;
}

/** 使用变量 */
div {
  color: var(--theme-color);
}

```

### 修改 element plus 主色
element plus 主色
```css
--el-color-primary-rgb: 64,158,255;
--el-color-primary: #409eff;
--el-color-primary-light-3: #79bbff;
--el-color-primary-light-5: #a0cfff;
--el-color-primary-light-7: #c6e2ff;
--el-color-primary-light-8: #d9ecff;
--el-color-primary-light-9: #ecf5ff;
--el-color-primary-dark-2: #337ecc;
```

根据一个主题色构建主色阶后设置css变量
```js
const el = document.documentElement

const primaryTheme = generatePrimaryTheme('#ff4040')

Object.keys(primaryTheme).forEach(key => {
  el.style.setProperty(key, primaryTheme[key])
})
```

## 暗黑模式
- `window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches` 判断系统是否是暗黑模式
- html动态修改class

element plus 提供暗黑模式的支持, 引入配置文件，通过修改 html标签的class 来切换 `<html class="dark"></html>`
```js
'element-plus/theme-chalk/dark/css-vars.css'
```

自定义来覆盖element plus样式，对主题色的切换需要提供支持
```css
html.dark {
  --el-color-primary: #409eff
}
```

## 自适应
todo 移动端和pc端的不同适配