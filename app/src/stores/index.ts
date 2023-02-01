import piniaPluginPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia'
export * from './modules/dict'
export * from './modules/menu'
export * from './modules/route'
export * from './modules/setting'
export * from './modules/tab'
export * from './modules/user'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

export default pinia
