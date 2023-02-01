import { createApp } from 'vue'
import pinia from './stores'
import router from './router/index'
import './plugin/icons'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/element-reset.css'
import './styles/index.css'

import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
