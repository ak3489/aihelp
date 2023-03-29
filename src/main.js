import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// 引入全局样式文件
import '@/assets/scss/index.scss'

const app = createApp(App) // 创建实例
app.use(router)
app.mount('#app')
