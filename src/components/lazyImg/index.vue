<script setup lang="ts">
    const data = [
        {
            src: 'https://picsum.photos/200/300',
            alt: '图片1'
        },
        {
            src: 'https://picsum.photos/200/300',
            alt: '图片2'
        },
        {
            src: 'https://picsum.photos/200/300',
            alt: '图片3'
        }
    ]
</script>
<template>
    <div>
        <div v-for="item in data" :key="item.src" content-visibility="auto">
            <img :src="item.src" :alt="item.alt" />
        </div>
    </div>
</template>
<style scoped>

</style>