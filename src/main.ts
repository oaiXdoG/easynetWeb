import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupDirectives } from './directives'
import './styles/main.css'

// 初始化主题（在 app 挂载前执行，避免闪烁）
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}

const app = createApp(App)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

// 注册自定义指令
setupDirectives(app)

app.mount('#app')
