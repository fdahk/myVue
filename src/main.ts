import { createApp } from 'vue'
import './style.css'
import directives from './components/v-xxx/v-xxx'
import App from './App.vue'

const app = createApp(App)
Object.keys(directives).forEach(key => {
    // TS 无法确定key的类型。需要为directives对象添加类型定义
    app.directive(key, directives[key as keyof typeof directives])
})
app.mount('#app')
