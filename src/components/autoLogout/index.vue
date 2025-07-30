<script setup lang="ts">
import useAutoLogout from './hook'

alert("登陆成功")
const { remain } = useAutoLogout(0.1)
// 如果页面卡顿或切换标签页，setInterval 可能不准，导致页面不会及时跳转
// 浏览器的节能机制
// 当你切换到其他标签页或窗口，浏览器会降低后台页面的 JavaScript 执行频率，以节省资源和电量。
// 这时，setInterval 和 setTimeout 的回调会被延迟执行，甚至有的浏览器会把定时器的最小间隔强制拉长到1秒甚至更久
// 时间结束的逻辑应该直接写在计时器的回调
// watch(remain, (newVal) => {
//     if(newVal <= 0) {
//         router.push('/v-xxx')
//     }
// })
</script>
<template>
    <div style="color: red; background-color: gray;">
        <h1>自动退出</h1>
        <p>剩余时间: {{ Math.floor(remain/1000) }} 秒</p>
    </div>
</template>
<style scoped lang="scss">

</style>