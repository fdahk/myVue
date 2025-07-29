7.27：
    1.vue自定义指令：
        基本概念：Vue自定义指令是Vue提供的一种机制，允许你直接操作DOM元素。通过Vue.directive方法可以注册全局自定义指令
            // 注册全局自定义指令
            Vue.directive
            Vue.directive('focus',{
                inserted: function(el){
                    el.focus()
                }
            })
            使用：<input v-focus>
        Vue自定义指令的5个钩子函数，每个钩子函数在指令的不同生命周期被调用
            bind (Vue 2) / beforeMount (Vue 3)：
                执行时机：指令第一次绑定到元素时调用
                作用：在初始阶段进行一次性配置
                使用场景：设置初始值、绑定事件监听器、初始化样式
            inserted (Vue 2) / mounted (Vue 3)
                执行时机：被绑定元素插入父节点时调用
                作用：当元素绑定到父节点后执行
                使用场景：需要访问父节点、获取元素尺寸、设置焦点等
            update (Vue 2) / updated (Vue 3)
                执行时机：所在组件的VNode更新时调用
                作用：当指令的值发生变化时执行
                使用场景：根据新值更新元素属性、样式等
            componentUpdated
                执行时机：所在组件的VNode及其子VNode全部更新后调用
                作用：当前节点和子节点都更新完成后执行
                使用场景：需要等待子组件更新完成后的操作
            unbind (Vue 2) / unmounted (Vue 3)
                执行时机：指令与元素解绑时调用
                作用：清理工作，防止内存泄漏
                使用场景：移除事件监听器、清理定时器等
            每个钩子函数都接收以下参数：    
                Vue.directive('example', {
                    bind(el, binding, vnode, oldVnode) {
                        // el: 指令所绑定的元素
                        // binding: 包含指令信息的对象
                        //   - name: 指令名
                        //   - value: 指令的绑定值
                        //   - oldValue: 指令绑定的前一个值
                        //   - expression: 字符串形式的指令表达式
                        //   - arg: 传给指令的参数
                        //   - modifiers: 包含修饰符的对象
                        // vnode: Vue编译生成的虚拟节点
                        // oldVnode: 上一个虚拟节点
                    }
                })
    2.key as keyof typeof directives 
        告诉TS key 是 directives 对象的有效属性名
    3.vue组件和插件的区别
        编写形式：
            组件：.vue文件 、 vue.component()创建
            插件：必须暴露install方法作为 vue的构造器，并且可以选择配置项
        注册形式：
            插件：vue.use(plugin,{...})
    4.vue过滤器原理分析
        
    5.vue部署到线上 显示404问题
        基础概念：vue项目打包成静态HTML文件、nginx 加载
        404的两种情况：
            1.history模式：nginx 没有对应的location配置
            2.hash模式：而hash模式相当于一直在一个location配置，只不过根据#访问不同资源
        解决方案：
            本质：路由执行js切换视图，会默认刷新页面
            解决：所有页面采用 redirect
            location /{
                index /dist/index.html
                try_files $uri /index.html//redirect index.html //添加这个配置
                }
    6.怎么实现SSR
        传统web开发：服务器渲染所有页面返回给前端
        SPA：CSR
    7.vue3新特性：
        framnets：能有多个根节点
        teleport：使用modal时vue2需要嵌套到组件内部，现在能直接传送
        自定义渲染器：
            import { createRenderer }from "@vue/runtime-core
            const { render, createApp }= createRenderer({
            patchProp,
            insert,
            remove,createElement,
            })
            export  render, createAppexport * from@vue/runtime-core
    8.keep-alive ： 内置组件，组件切换中保存状态到内存，用于性能优化
        include： 正则，符合则保存
        exclude：
        max:
        使用时用<keep-alive include="..."> </keep-alive>包裹
    9.forEach 是同步的，不会等待异步操作

7.29：
    类型定义的方式：

    type定义和interface定义的区别：
        扩展性（Declaration Merging）：
            interface 支持声明合并
        联合类型和交叉类型
            type 更适合联合类型、交叉类型、工具类型
            interface Status = 'pending' | 'approved' | 'rejected';  // ❌ 错误：interface 不能表示联合类型
        计算属性和映射类型
            type 支持更复杂的类型操作：映射类型、条件类型、模板字面量类型、递归类型
    选择指南
        使用 interface 当：
        定义对象结构
        需要声明合并
        类实现
        函数重载
        混合接口

        使用 type 当：
        联合类型
        交叉类型
        条件类型
        映射类型
        模板字面量类型
        工具类型
    总结：
        特性	interface	type
        声明合并	✅ 支持	❌ 不支持
        联合类型	❌ 不支持	✅ 支持
        交叉类型	❌ 不支持	✅ 支持
        条件类型	❌ 不支持	✅ 支持
        映射类型	❌ 不支持	✅ 支持
        模板字面量	❌ 不支持	✅ 支持
        类实现	✅ 支持	✅ 支持
        函数重载	✅ 支持	❌ 不支持
        混合接口	✅ 支持	❌ 不支持
        编译性能	更好	稍慢
        错误信息	清晰	详细
    
    2.Vue 3 引入了 Fragment 概念，允许组件返回多个根节点，不会自动包装额外的 div
        Vue 2 (会包装)
    3.const instance = getCurrentInstance()
        getCurrentInstance() 返回当前组件的实例对象，包含：
        instance.appContext: 应用上下文
        instance.appContext.app: 根应用实例
        instance.vnode: 虚拟节点
        instance.parent: 父组件实例
    4.插件模式：
    5.vue中的render函数：
        示例：
        const renderInput = () => {
        if (!directivesReady.value) {
            return h('div', '指令加载中...')
        }
        <!-- h: 渲染函数（createElement的简写） h(tag, props, children) -->
        return h('input', {
            type: 'text',
            directives: [
                {
                    name: 'focus',
                    value: undefined
                }
            ]
        })
    }
    6.函数定义 - 在组件实例化时就完成

















vue中的副作用函数 ：
    在 Vue 中，副作用函数通常指的是会在响应式数据变化时自动重新执行的函数，比如：
    watchEffect 里的回调
    watch 里的回调
    组件的渲染函数（render function）
    计算属性（computed）内部的 getter

VUE开发技巧： 
    响应式系统核心流程： 数据变更 → 响应式检测 → 触发更新 → 重新渲染 → DOM 更新 

    vue响应式原理 ：
        // 简化的响应式原理
        const reactive = (obj) => {
        return new Proxy(obj, {
            get(target, key) {
            // 依赖收集：记录当前正在执行的 effect 
            //当你在模板或计算属性、watch、effect 里用到响应式数据时，Vue 需要知道“谁依赖了这个数据
            //访问响应式对象的属性时，Vue 会在 get 拦截器里记录当前正在执行的副作用函数（effect），把“属性 → effect”这种关系存起来
            track(target, key)
            return target[key]
            },
            set(target, key, value) {
            target[key] = value
            // 触发更新：通知所有依赖这个属性的 effect
            trigger(target, key)
            return true
            }
        })
        }

    VUE组件的执行流程：
    1.初始化阶段：
        // 1. 创建组件实例：创建一个组件的运行时对象，用于存储组件的所有状态、属性、方法、生命周期等
        createComponentInstance()

        ↓
        // 2. 设置组件实例：初始化组件实例的各种属性，为后续的 setup、渲染等做准备
            解析和初始化 props、attrs、slots
            绑定 emit、expose、refs 等
            执行 setup 函数（如果有），并把返回的响应式数据挂到 instance 上
            处理 options API（如 data、methods、computed、watch 等）
            最终让 instance 拥有完整的运行时上下文
        setupComponent()

        ↓ 
        // 3. 执行 setup() 函数
        setup() {
        // 响应式数据定义
        const count = ref(0)
        const name = reactive({ value: 'Vue' })
        
        // 计算属性（依赖收集）
        const doubleCount = computed(() => count.value * 2)
        
        // 副作用函数（依赖收集）
        watch(count, (newVal) => {
            console.log('count changed:', newVal)
        })
        
        return { count, name, doubleCount }
        }

        ↓
        // 4. 渲染函数执行（依赖收集）
        render() {
        // 访问响应式数据时收集依赖，渲染层的依赖
        return h('div', count.value + doubleCount.value)
        }
        ↓
        // 5. 生成虚拟 DOM
        VNode Tree
        ↓
        // 6. 挂载到真实 DOM
        mount(container)
    
    2.更新流程 ：
        // 1. 响应式数据变更
        count.value = 10
        ↓
        // 2. 触发依赖更新
        trigger() → 通知所有收集的依赖
        ↓
        // 3. 组件重新渲染（异步）
        scheduler.add(renderEffect)
        ↓
        // 4. 批量更新（nextTick）
        flushJobs() 
        ↓
        // 5. 重新执行渲染函数
        render() → 新的 VNode
        ↓
        // 6. Diff 算法对比
        patch(oldVNode, newVNode)
        ↓
        // 7. 更新真实 DOM
        updateDOM()

    3.精准控制代码执行：
        1.nextTick 
            const updateData = async () => {
            // 1. 修改数据
            count.value = 100
            list.value.push('new item')
            
            // 2. 等待 DOM 更新完成
            await nextTick()
            
            // 3. 现在可以安全操作 DOM
            const element = document.getElementById('my-element')
            element.scrollIntoView()
            }
        2.watch控制副作用 
            // 立即执行
            watch(count, (newVal) => {
            console.log('立即执行:', newVal)
            }, { immediate: true })

            // 深度监听
            watch(state, (newVal) => {
            console.log('深度监听:', newVal)
            }, { deep: true })

            // 在 DOM 更新后执行
            watch(count, (newVal) => {
            console.log('DOM 更新后:', newVal)
            }, { flush: 'post' })
        3.生命周期钩子执行 
            setup()              // 1. 最先执行
            onBeforeMount()      // 2. 挂载前
            onMounted()          // 3. 挂载后（DOM 可用）
            // ... 数据变更时
            onBeforeUpdate()     // 4. 更新前
            onUpdated()          // 5. 更新后
            // ... 组件销毁时
            onBeforeUnmount()    // 6. 销毁前
            onUnmounted()        // 7. 销毁后
        4.响应式系统执行顺序 
            const count = ref(0)
            const doubled = computed(() => count.value * 2)

            // 监听器执行顺序
            watch(count, () => {
            console.log('1. 同步 watch')
            })

            //手动指定，必须传入要监听的响应式数据，默认不立即执行，只有依赖变化时才执行，有新值、旧值两个参数
            watch(count, () => {
            console.log('2. 同步 watch')
            })

            //watchEffect 是 Vue 3 的一个响应式副作用函数注册方法。
            //传入的回调函数会立即执行一次，并且自动收集它内部用到的所有响应式依赖（这里是 doubled.value）。
            //只要 doubled.value 发生变化，这个回调就会自动重新执行
            watchEffect(() => {
            console.log('3. watchEffect:', doubled.value)
            })

            // 修改数据
            count.value = 10

            // 执行顺序：
            // 1. 同步 watch
            // 2. 同步 watch  
            // 3. watchEffect: 20 
        5.异步更新控制 
            // Vue 的更新是异步的，可以精准控制
            const controlledUpdate = async () => {
            console.log('1. 开始更新')
            
            // 批量修改数据
            state.a = 'new a'
            state.b = 'new b'
            state.c = 'new c'
            
            console.log('2. 数据已修改，但 DOM 未更新')
            
            // 等待 DOM 更新
            await nextTick()
            
            console.log('3. DOM 已更新')
            }
        6.手动控制响应式 
            import { triggerRef, shallowRef } from 'vue'
            // 浅层响应式，手动触发更新
            const shallowState = shallowRef({ count: 0 })

            // 修改深层属性不会自动更新
            shallowState.value.count = 10  // 不会触发更新

            // 手动触发更新
            triggerRef(shallowState)       // 现在会更新
        7.停止响应式追踪 
            import { stop, watchEffect } from 'vue'
            const count = ref(0)

            // 创建可停止的 effect
            const stopHandle = watchEffect(() => {
            console.log(count.value)
            })

            // 某个时机停止追踪
            setTimeout(() => {
            stop(stopHandle)  // 停止响应式追踪
            }, 5000)
        8.条件响应式 ：
            import { readonly, toRaw } from 'vue'
            const state = reactive({ count: 0 })
            // 创建只读版本
            const readonlyState = readonly(state)
            // 获取原始对象（非响应式）
            const rawState = toRaw(state)
            rawState.count = 100  // 不会触发更新
        
        实际开发推荐方案：
            // ✅ 推荐：集中管理状态
            const useUserStore = () => {
            const state = reactive({
                user: null,
                loading: false,
                error: null
            })
            
            const fetchUser = async (id) => {
                state.loading = true
                state.error = null
                
                try {
                const user = await api.getUser(id)
                state.user = user
                } catch (error) {
                state.error = error
                } finally {
                state.loading = false
                }
            }
            
            return { state, fetchUser }
            }
            
        性能优化技巧：
            // 使用 shallowRef 优化大对象
            const largeData = shallowRef({})

            // 使用 markRaw 标记不需要响应式的对象
            import { markRaw } from 'vue'
            const nonReactiveData = markRaw({
            heavyObject: new HeavyClass()
            })

            // 使用 computed 缓存计算结果
            const expensiveComputed = computed(() => {
            return heavyCalculation(state.data)
            })
        调试技巧 ：
            // 使用 watchEffect 调试数据变化
            watchEffect(() => {
            console.log('Debug:', {
                count: count.value,
                name: state.name,
                computed: doubleCount.value
            })
            })

            // 使用 onTrack/onTrigger 调试响应式
            watch(count, (newVal) => {
            console.log('count changed:', newVal)
            }, {
            onTrack(e) {
                console.log('依赖收集:', e)
            },
            onTrigger(e) {
                console.log('触发更新:', e)
            }
            })