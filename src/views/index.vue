<script setup lang="ts">
import collections from './collections'
</script>

<template>
    <div class="page">
        <!-- header -->
        <div class="header">
            <h1>Vue相关组件库、demo库</h1>
        </div>
        <!-- body -->
        <div class="body">
            <!-- 左侧列表 -->
            <div class="body-left-list">
                
                <div class="body-left-list-item" v-for="item in collections" :key="item.path">
                    <router-link :to="item.path">{{ item.label }}</router-link>
                </div>
            </div>
            <!-- 组件展示区域 -->
            <div class="body-right-content">
                <router-view />
            </div>            
        </div>
    </div>
</template>

<style scoped lang="scss">
.page {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}
.header {
    width: 100%;
    height: 2rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    h1 {
        font-size: 24px;
        font-weight: bold;
        color: black;
    }
}
.body {
    width: 100%;
    flex: 1;
    display: flex;
}
.body-left-list {
    box-sizing: border-box;
    width: 15rem;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: start;
    padding: 10px 8px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    .body-left-list-item {
        width: 100%;
        height: 2rem;
        background-color: rgba(0, 0, 0, 0.2);
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        &:hover {
            background-color: rgba(0, 0, 0, 0.1);
        }
        a{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.body-right-content {
    flex: 1;
    height: 100%;
    background-color: white;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>