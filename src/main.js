import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

// 导入全局样式
import '@/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用核心插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: {
    name: 'zh-cn'
  }
})

// 应用挂载
app.mount('#app')

// 开发环境启动日志
if (import.meta.env.DEV) {
  console.log('🎉 海看AI培训战略汇报平台启动完成')
}