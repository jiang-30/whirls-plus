> 如果能连接互联网直接通过 `<AppIcon icon="collection:icon-name"/>` 传入 iconify 中的 `集合名称:图标名称` 就可以使用; 静态图标通过插件配置后可以直接在页面中通过 `<prefix-collection-iconname />` 使用; 如果有动态和无互联网或者其他要求可以引入自定义图标



## 在线图标
`@iconify/vue` 中的Icon 组件可以实现图标展示, 只需要为icon属性提供 图标的名称(`集合名:图标名`)


`<AppIcon />` 组件利用ElIcon可以修改尺寸和颜色
```vue
<template>
  <el-icon :size="size" :color="color">
    <Icon :icon="icon"></Icon>
  </el-icon>
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue'
  const { size, color, icon } = defineProps<{
    size?: number
    color?: string
    icon: string
  }>()
</script>
```


## 手动引入
使用 `unplugin-icons` 和 `unplugin-vue-components` 这俩个vite插件可以实现自动导入, 使用时直接在 `<template />` 中写对于名称的组件
```html
<el-icon>
  <prefixName-collectionName-iconName />
</el-icon>
```


### `unplugin-icons` 自动解决依赖问题
可以自动导入 iconify 中的图标, 也可以导入自定义 svg 图标; 配置后可以直接导入使用,然后在组件中使用 `<IconAccessibility>`.
```js
// ~icons/{collection}/{name}
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
```

**配置插件**
```js
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default function createAutoIcons() {
  return Icons({
    compiler: 'vue3',

    /**
     * 自动导入 iconify 中的图标, 不需要引入依赖
     */
    autoInstall: true,

    /**
     * 加载自定义svg图标
     */
    customCollections: {
      custom: FileSystemIconLoader('src/assets/svg'),
    },
  })
}
```

### `unplugin-vue-components` 解决导入问题

配合 unplugin-vue-components  可以自动导入 IconsResolver; 配置一个自定义前缀后不需要引入直接在 使用组件
```js
IconsResolver({
  prefix: 'icon',
  alias: {}, // 图标集名词简写
  // customCollections: ['base'], // 自定义图标集
})
```


## 自定义静态添加
自定义的svg图标添加到 iconify 中

1. **准备图标数据**
定义图标时需要注意 viewBox 的尺寸, iconify 默认是 `0 0 16 16`, 如果定义时使用的尺寸不同需要修改, 分别表示 left top width height
```js
{
  'icon-name': {
    body: '<path d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3a3 3 0 0 1 3 3M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" fill="currentColor"/>',
    width: 24,
    height: 24,
  }
}
```


2. **添加到 iconify 中**
添加后数据不用走互联网, 可以定义一个 provider使用时使用 @provider:w:icon-name
```js
import { addCollection } from '@iconify/vue'
import icons from '@/constant/icon/index'

addCollection({
  prefix: 'w',
  icons: icons,
  left: 0,
  top: 0,
  width: 24,
  height: 24,
}, 'provider')
```

3. **通过 `<AppIcon /> 直接使用`**
```html
<AppIcon icon="w:icon-name" />
```

4. **获取添加的图标集名称合**

```js
import { listIcons, Icon } from '@iconify/vue'

const icons = listIcons('provider', 'custom')
```


## iconify

**图标集**
- @iconify/json 所有图标集
- @iconify-json/{prefix} 单个图标集
- @iconify-icons/{prefix} 单个图标

通过 `import { icons } from '@iconify-json/bi'` 映入集合中的所有图标
