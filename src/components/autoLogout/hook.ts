import { onMounted, onUnmounted, ref} from "vue"
import { useRouter } from "vue-router"

// 防抖函数:保存this信息，
// function debounce(fn: Function, delay: number) {
//     let timer: number | null = null
//     return function (...args: any[]) {
//         if (timer) clearTimeout(timer)
//         // 只有最后一次操作后，等待delay没有新的操作，定时器才会到期，真正执行你想要的函数
//         timer = setTimeout(() => {
//             fn.apply(this, args)
//         }, delay)
//     }
// }

// 防抖函数
// function debounce(fn: Function, delay: number) {
//     let timer: number | null = null
//     return (...args: any[]) => {
//         if (timer) clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn(...args)
//         }, delay)
//     }
// }

const useAutoLogout = (minutes?: number) => {
    const router = useRouter()
    let timer: number | null = null
    const remain = ref(minutes || 1)
    let startTime = Date.now()

    //更新倒计时
    const updateRemain = () => {
        const now = Date.now()
        remain.value = Math.max(0, (minutes || 1)*60*1000 - (now - startTime))
    }
    let interval: number | null = null
    
    // 设置定时器
    function resetTimer() {
        console.log('定时器重置')
        if(timer) {
            clearTimeout(timer)
        }
        if(interval) {
            clearInterval(interval)
        }
        startTime = Date.now()
        timer = setTimeout(() => {
            router.push('/v-xxx')
        }, 1000 * 60 * (minutes || 1))
        interval = setInterval(updateRemain, 1000)
    }

    // 防抖包装，300ms内只会触发一次
    // const debouncedResetTimer = debounce(resetTimer, 100)

    const events = ['mousemove', 'keydown', 'click', 'scroll']
    function activityListener() {
        events.forEach(item => {
            // event: 事件名称（如 'click', 'mousemove', 'keydown' 等）
            // resetTimer: 事件处理函数
            // true: 事件捕获阶段（capture phase）
            // 第三个参数详解：
            // 事件传播流程
            // 1.true 捕获阶段 (Capture Phase) - 从 window 到目标元素
                // 1. 能捕获到所有事件，包括被阻止冒泡的事件
                // 2. 在事件到达目标元素之前就处理
                // 3. 确保不会遗漏任何用户活动
            // 2. 目标阶段 (Target Phase) - 到达目标元素
            // 3.false(默认) 冒泡阶段 (Bubble Phase) - 从目标元素回到 window
            window.addEventListener(item, resetTimer, true);
        })
    }

    function removeActivityListener() {
        events.forEach(item => {
            window.removeEventListener(item, resetTimer, true)
        })
    }

    onMounted(() => {
        resetTimer()
        activityListener()    
    })

    onUnmounted(() => {
        removeActivityListener()
        if (interval) {
            clearInterval(interval)
        }
        if (timer) {
            clearTimeout(timer)
        }
    })

    return { remain }
}

export default useAutoLogout