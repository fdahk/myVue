<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, h, nextTick } from 'vue'
import directives from './v-xxx.ts'

const instance = getCurrentInstance()
const directivesReady = ref(false)

onMounted(async () => {
    // 注册指令
    Object.keys(directives).forEach(key => {
        try {
            instance?.appContext.app.directive(key, directives[key as keyof typeof directives])
        } catch (error) {
            console.error(` 指令 ${key} 注册失败:`, error)
        }
    })
    
    // 等待指令注册完成
    // nextTick: 响应式更新完成，不是DOM挂载
    await nextTick()
    // 触发响应式更新，renderInput函数重新执行
    directivesReady.value = true
})

// 使用render函数，避免模板在解析时无法直接解析导自定义指令
// 使用时JS变量和HTML模板之间可以自动转换格式
const renderInput = () => {
    if (!directivesReady.value) {
        return h('div', '指令加载中...')
    }
    
    return h('input', {
        type: 'text',
        placeholder: '',
        directives: [
            {
                name: 'focus',  // 指令名称
                value: undefined,// 指令值
                arg: undefined,// 指令参数
                modifiers: {}// 指令修饰符
            }
        ]
    })
}
</script>

<template>
    <div>
        <!-- 模板编译时，Vue发现 <render-input /> -->
        <!-- 但此时 renderInput 函数还没有执行 -->
        <render-input />
    </div>
</template>

<style scoped lang="scss">

</style>