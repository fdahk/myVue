import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/index.vue'),
            // 组件列表
            children: [
                {
                    path: 'v-xxx',
                    component: () => import('../components/v-xxx/index.vue'),
                },
                {
                    path: 'funcValidator',
                    component: () => import('../components/funcValidator/index.vue'),
                },
            ]
        }
    ]
})
export default router