使用 `pinia` 作状态管理, 使用 `pinia-plugin-persist` 数据持久化


## pinia
> store 之间可以相互引用, 每一个 store 相对独立
> actions 可以同步方法也可以使用异步方法

**app中注册**
```ts
import { createPinia } from 'pinia';

const pinia = createPinia()
pinia.use(piniaPluginPersist)

app.use(pinia);
```

**store模块**
```ts
import { defineStore } from 'pinia';

interface IUser {
  name: string
  age: number
}

export const useUserStore = defineStore('user', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: '__user',
        storage: localStorage, // 默认使用 sessionStorage
        paths: ['user'],
      },
    ],
  },
  state: () => {
    return {
      // 类型使用类型断言
      user: <IUser>{},
    }
  }
})

```

### 修改数据
1. 直接修改数据
```ts
store.count++
```
2. 通过 `$patch` 修改数据, 可以修改多个数据
```ts
// 传递一个对象
store.$patch({
  count: 10 
})

// 通过回调函数来修改
store.$patch((state) => {
  state.count = 10
})
```
3. 通过 `actions` 修改数据, actions 可以是异步的

### 取值
1. store数据解构, 使用 pinia 提供的 `storeToRefs()` 方法
2. `getters` 可以返回一个函数来达到传参的目的, 但是 getter不会缓存

### Api

#### $reset
> 重置 store 的状态到他的初始状态

#### $subscribe
> 监听store, 通过回调函数来观察状态的改变
`store.$subscribe((mutation, state) => {})`
#### $onAction
> 通过回调函数来观察actions的调用情况

### 插件
> 就是一个函数可以接收 `context` 参数; 返回一个对象, 对象的属性和方法分别添加到 `state` 和 `actions` 中
- context.app vue实例
- context.pinia pinia实例
- context.store 插件正在扩展的store; 可以通过 store.$state.xxx = xxx 扩展state
- context.options 插件正在扩展的store的选项对象

```ts
const piniaPlugin = (context: PiniaPluginContext) => {
  const { store } = context;

  store.$subscribe(() => {
    
  })

  // 返回的值会赋值给 state
  return ***
}
```


## setting
系统相关配置及状态



## user
登录用户信息



## menu
菜单信息



## route
默认路由、路由权限、动态路由信息、路由缓存




## tab
tab标签



## dict
字典


