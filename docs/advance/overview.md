

- 使用 `unplugin-auto-import` 和 `unplugin-vue-components` 插件来自动导入 vue 和 vue router 依赖
- `vite-plugin-vue-setup-extend` 对 setup 添加组件name 属性

## 过滤器

- 过滤器可以通过全局函数代替

## 全屏
screenfull

## 剪切板
clipboard

## 全局事件
mitt


## 页面数据

```ts
const data = reactive({
  visible: false,
})

const { visible } = toRefs(data)
```

- data 数据可以分离



## 类型

- 在模版中也可以使用断言

- 类型声明放在 `types` 文件夹下 `xx.d.ts`; 文件中没有声明为模块就是全局的

- 借口类型可以直接定义返回类型 Promise<>

- globalProperties

  ```ts
  declare module 'vue' {
      export interface ComponentCustomProperties {
          $Bus: typeof Mitt
      }
  }
  
  app.config.globalProperties.$Bus = mitt()
  ```



api

```ts
interface Result<T> {
    code: number
    message: string
    timestamp: number
    data: T
}

type PromiseRes<T> = Promise<Result<T>>

interface LoginParams {
    username: string
    password: string
}

interface LoginRes {
    token: string
}

export const fetchLogin = (params: LoginParams): PromiseRes<LoginRes> => request({})
```



## 样式

样式穿透使用 `:deep()`

```css
:deep(.el-input__inner){
    
}
```


:slotted() 在子组件中修改插槽的样式



`:global()` 定义全局样式, 不用重新写 style 标签



v-bind() 使用 js中的变量



module, 通过 `$style` 使用



## 实例


挂在全局函数和变量

类型声明

```ts
declare module 'vue' {
    export interface ComponentCustomProperties {
        $Bus: typeof Mitt
    }
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $filters: {
            
        }
    }
}

app.config.globalProperties.$Bus = mitt()

// 过滤器

app.config.globalProperties.$filters = mitt()
```





`getCurrentInstance`

获取组件实例

```ts
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

instance?.proxy?.$Bus.emit()
```

- proxy 获取全局属性







## 组件

递归组件

1. 当前组件可以引用自己
2. 定义 `name` 属性, 后可以在组建内使用



动态组件

- 多组件切换显示可以通过 `Component` 来切换, `is` 属性使用组件实例



异步组件

`defineAsyncComponent`





`<Suspense>`

default、fallback





## hooks

是一个函数





## 环境变量
在 `vite.config.ts` 中不能使用 `import.mate.env` 中的环境变量

### import.meta.env
通过 import.meta.env 来获取环境变量; 可以通过 .env 或者 .env.mode 来自定义环境变量
通过 --mode 来设置环境变量

--mode production development 

```
VITE_APP_HTTP_URL=http://localhost:9200
```

扩展自定义环境变量类型
```ts
/**
 * env环境变量
 */
interface ImportMeta {
  readonly env: {
    /**
     * http 请求地址 http://ip:port
     */
    readonly VITE_APP_HTTP_URL: string
  }
}
```

### vite.config.ts
```ts
import { loadEnv } from 'vite'

// mode --mode
loadEnv(mode, process.cwd())

```


