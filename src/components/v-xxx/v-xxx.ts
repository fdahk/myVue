import type { Directive } from 'vue'
// 自动聚焦指令
const focus: Directive = {

    mounted(el) {
        console.log('focus mounted')
        el.focus()
    }
}

// 统一导出
export default {
    focus
}