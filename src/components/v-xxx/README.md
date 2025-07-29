自定义指令

独立的指令注册方案：实际开发中一般直接在全局app注册指令，这里只做演示，所有需要切换到组件时再注册

使用组件实例注册
<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue'
import directives from './v-xxx'
const instance = getCurrentInstance() //// 获取实例引用
onMounted(() => {
// 在组件挂载后注册指令
Object.keys(directives).forEach(key => {
    instance?.appContext.app.directive(key, directives[key as keyof typeof directives])
})
})
</script>

独立DOM容器
<script setup lang="ts">
import directives from './v-xxx'
import { createApp } from 'vue'

// 创建独立的容器
const container = document.createElement('div')
container.id = 'directive-demo-container'
document.body.appendChild(container)
const app = createApp({})
Object.keys(directives).forEach(key => {
    app.directive(key, directives[key as keyof typeof directives])
})
app.mount('#directive-demo-container')
</script>

使用插件模式
<!-- 1. 插件定义 -->
import type { App } from 'vue'
import directives from '../components/v-xxx/v-xxx'
export default {
    <!-- Vue会自动调用这个方法，接收应用实例作为参数，App是参数类型 -->
  install(app: App) {
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key as keyof typeof directives])
    })
  }
}
<!-- 处插件使用 -->
import { createApp } from 'vue'
import directivesPlugin from './plugins/directives'
import App from './App.vue'

const app = createApp(App)
app.use(directivesPlugin)
app.mount('#app')

