import type { Directive } from 'vue'
// 自动聚焦指令
export const focus: Directive = {
    mounted(el) {
        el.focus()
        console.log('focus directive mounted')
    }
}

// 统一导出
export default {
    focus
}