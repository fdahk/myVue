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
    7.window 是全局对象， 在浏览器中，全局变量都是 window 的属性，全局函数也是 window 的方法

7.30：
    1.事件传播：
        1. Window 捕获阶段
        2. Document 捕获阶段
        3. HTML 捕获阶段
        4. Body 捕获阶段
        5. Container 捕获阶段
        6. Button 目标阶段
        7. Container 冒泡阶段
        8. Body 冒泡阶段
        9. HTML 冒泡阶段
        10. Document 冒泡阶段
        11. Window 冒泡阶段
    2.setup
        一般在script中定义setup，会自动把代码放到setup函数中
        也可以自己写：
            <script>
                export default {
                    setup() {
                        useAutoLogout(10)
                    }
                }
            </script>
    3.在 Vue 3 的 Composition API 里，只要函数是在 setup() 里被调用的，它就处于当前组件的“生命周期上下文”中。
        函数就可以调用 onMounted、onUnmounted 等生命周期钩子，实际上就是把这些钩子注册到“当前组件”上
    4.apply 是 JavaScript 中所有函数都有的一个方法，用于调用函数并指定 this 值和参数
        为什么要用 apply？
        保持 this 上下文：
        当事件触发时，this 通常指向触发事件的元素
        使用 apply(this, args) 确保原始函数 fn 执行时，this 指向正确
    5.函数的调用方法
        // 1. 直接调用
        fn(arg1, arg2)

        // 2. apply - 参数是数组
        fn.apply(thisArg, [arg1, arg2])

        // 3. call - 参数是分开的
        fn.call(thisArg, arg1, arg2)

        // 4. bind - 返回新函数
        const boundFn = fn.bind(thisArg)
        boundFn(arg1, arg2)

7.30
触发硬件加速
    perspective 会让浏览器为该元素开启 GPU 加速（合成层），提升动画和渲染性能，减少卡顿。
    常见的触发硬件加速的方式还有 transform: translateZ(0);、will-change: transform; 等

7.31：
    1.函数声明和箭头函数的区别：

        =======================变量提升
        // 函数声明 - 变量提升
        console.log(fc1()); // ✅ 正常工作
        function fc1() {
        return "Hello";
        }
        // 箭头函数 - 不会被提升
        console.log(fc2()); // ❌ 报错：fc2 is not a function
        const fc2 = () => {
        return "Hello";
        };        

        ===================this指向
        const obj = {
        name: "Object",

        // 函数声明 - this指向调用者
        method1: function() {
            console.log(this.name);
        },
        
        // 箭头函数 - this继承外层作用域
        method2: () => {
            console.log(this.name); // undefined
        }
        };
        obj.method1(); // "Object"
        obj.method2(); // undefined

        =========================参数
        // 函数声明 - 有arguments对象
        function fc1() {
        console.log(arguments);
        }
        fc1(1, 2, 3); // Arguments(3) [1, 2, 3]

        // 箭头函数 - 没有arguments对象
        const fc2 = () => {
        console.log(arguments); // 报错
        };
        fc2(1, 2, 3); // ❌ arguments is not defined
    2.事件循环
        事件循环（Event Loop）执行顺序
        执行一轮宏任务（包括主线程上的同步代码和一个宏任务，比如 setTimeout 的回调）
        执行本轮产生的所有微任务（比如 Promise.then 的回调）
        UI 渲染（如有必要）
        进入下一轮宏任务
    3.promise对象：Promise{<resolved>: resolve1}

8.1：
    1.then() 方法期望接收函数作为参数，如果传入非函数值，会被忽略，相当于传入 undefined
        .then(2)  // 2 不是函数，被忽略，相当于 .then(undefined)
        // 等价于 .then(value => value)
        // 传入值：1，返回值：1， 此时发生透传现象，无论多少层then，接受的参数都是第一个then的值
        原理是promise的内部实现，其内部监测到参数非函数则直接返回参数

    2. .then() 可接受两个参数，第一个是promise成功处理函数，第二个是失败函数
    3.代码输出
        Promise.resolve('1')
        .then(res => {
            console.log(res)
        })
        .finally(() => {
            console.log('finally')
        })
        Promise.resolve('2')
        .finally(() => {
            console.log('finally2')
            return '我是finally2返回的值'
        })
        .then(res => {
            console.log('finally2后面的then函数', res)
        })
    4.new Promise(executor)
        构造函数接收一个函数作为参数，这个函数通常被称为 executor（执行器
        executor 函数接收两个参数：
            第一个参数：resolve 函数（用于解决 Promise）
            第二个参数：reject 函数（用于拒绝 Promise）
        const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
//                            ↑
//                 这里的 r 就是 resolve 函数
    5. .resolve方法只能有一参数，但并不代表r(x, console.log(x)) 里面的参数不会执行
            其依然执行，结果为r(x, undefined)
    6.resolve 函数本身返回 undefined：它只是用来改变 Promise 的状态
        resolve本身改变成功与否，其参数改变promise的值
        例如：
            new Promise((resolve, reject) => {
                resolve('这个值会成为 Promise 的值');
            }).then(value => {
                console.log('接收到的值:', value); // "这个值会成为 Promise 的值"
            });

    7.async本身不会进入异步，await才会使后面的代码进入微任务
    8.同步代码 => 清空微任务 => 清空宏任务
    9.console打印一个地址会打印出其具体的值而不是地址
        如何查看真正的内存地址
            Object.prototype.toString
            console.dir
            JSON.stringify
    10.只有async相关代码会加入微任务
        间隔函数等函数本身是加入宏任务，其回调才会加入微任务
    11. .finally的返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值
    12.Promise 链的返回值传递
        最后执行的 .then() 或 .catch() 决定promise最终值，finally不改变promise状态
    13.promise链的执行规则
        // 成功路径：then1 -> finally -> then2
        // 失败路径：catch -> finally -> then2
        不发生错误按顺序执行，发生错误立即跳到第一个catch执行（若catch与错误发生处有finally，finally先执行），finally为绝对执行
    14.process.nextTick()，其回调函数被分发到微任务
        注：Node.js 中的 process.nextTick() 和 Vue 中的 nextTick（DOM 更新后执行） 不是一个东西
        一个在/ Node.js 环境运行，一个在浏览器环境运行
    15.执行完一个宏任务就检查微任务
    16.严格模式与一般模式下this指向主要区别：
        全局作用域：
        一般模式：this 指向全局对象
        严格模式：this 为 undefined
        函数调用：
        一般模式：this 指向全局对象
        严格模式：this 为 undefined
        相同的情况：
        对象方法调用
        构造函数调用
        事件处理函数
        call、apply、bind 方法
        箭头函数
    17.立即执行函数由window调用，但他的环境不是window而是它定义处的环境，调用某值时会沿着作用域链向上查找
    18.匿名函数的this一定指向全局window
        // 匿名函数：没有函数名的函数
        function() {
            console.log('这是一个匿名函数');
        }

        // 但上面那样直接写会报错，需要赋值或立即调用
        var anonymousFunc = function() {
            console.log('匿名函数');
        };

        // 立即执行的匿名函数
        (function() {
            console.log('立即执行的匿名函数');
        })();
    19.哪些声明会创建作用域
        函数声明、{}块级作用域、
    20.[] == ![] 结果为true
    21.new 后面接函数和类的区别：
        语法差异：
        函数：使用 function 关键字
        类：使用 class 关键字
        调用限制：
        函数：可以不用 new 调用（但会出错）
        类：必须用 new 调用
        方法定义：
        函数：通过 prototype 定义方法
        类：直接在类内部定义方法
        继承语法：
        函数：手动设置原型链
        类：使用 extends 关键字
        内部实现：
        本质上都是函数
        new 的执行过程基本相同
        类提供了更严格的语法检查
        关键理解：
        类本质上是函数构造函数的语法糖
        new 的执行过程基本相同
        类提供了更现代和严格的语法
    22.
        原型对象的特点：
            是构造函数的一个属性
            包含共享的方法和属性
            所有实例都可以访问
            通过 __proto__ 属性连接实例
        对象原型（_proto_）
            对象原型的特点：
            是实例对象的一个属性
            指向构造函数的原型对象
            用于实现原型链
            是实例访问原型对象的桥梁
        构造函数 Person
            ↓ prototype
        原型对象 Person.prototype
            ↑ __proto__
        实例对象 p2
    23. Symbol 的概念、用途和使用方法，ES6 引入的一种新的基本数据类型
            唯一性：每个 Symbol 都是唯一的
            不可枚举：不会出现在 for...in 循环中
            类型安全：不能与其他类型进行运算
            私有性：可以模拟私有属性
            主要用途：
            属性标识符：避免属性名冲突
            私有属性：模拟类的私有成员
            元编程：自定义对象行为
            迭代器：实现可迭代对象
            使用方法：
            创建：Symbol() 或 Symbol('description')
            全局注册：Symbol.for('key')
            对象属性：obj[Symbol('key')] = value
            获取属性：Object.getOwnPropertySymbols(obj)

8.14：
    1.指令系统
        指令 (Directives) 是带有 v- 前缀的特殊属性作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
        没有指令之前我们是怎么做的？是不是先要获取到DOM。。。。。然后操作

    2.性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗

    3.v-show与v-if原理分析：大致流程如下
        ● 将模板template转为ast结构的JS对象
        ● 用ast得到的JS对象拼装render和staticRenderFns函数
        ● render和staticRenderFns函数被调用后生成虚拟VNODE节点，该节点包含创建DOM节点所需信息
        ● vm.patch函数通过虚拟DOM算法利用VNODE节点创建真实DOM节点
    4.ast结构的JS对象：


    5.vue实例的挂载过程，new Vue()这个过程中究竟做了些什么？何完成数据的绑定，又是如何将数据渲染到视图的？。。。。
        在调用beforeCreate之前，数据初始化并未完成，像data、props这些属性无法访问到 
            到了created的时候，数据已经初始化完成，能够访问data、props这些属性，但这时候并未完成dom的挂载，因此无法访问到dom元素
        初始化顺序：props、methods、data，data定义的时候可选择函数形式或者对象形式（组件只能为函数形式） 

    6.对template的解析步骤大致分为以下几步：
        ●  将html文档片段解析成ast描述符 
        ●  将ast描述符解析成字符串 
        ●  生成render函数 

    7.设置key值，并且保证每个key值是独一无二的，是相对与什么的独一无二？

    8.v-for优先级比v-if高
        永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
        通过在外层嵌套template（页面渲染不生成dom节点），在这一层进行v-if判断，然后在内部进行v-for循环
        如果条件出现在循环内部，可通过计算属性computed提前过滤掉那些不需要显示的项
    
8.15:
    1.元素的点击事件不生效
        原因是因为子组件中阻止了事件冒泡,而父组件中大部分区域都被子组件占据实际上并没有点击父组件

    2.Vue 不允许在已经创建的实例上动态添加新的响应式属性
        vue2是通过 Object.defineProperty 实现数据响应式, 访问其中一个属性或者设置值的时候都能够触发setter与getter
        我们为obj加新属性时，无法触发事件属性的拦截，开始属性被设成了响应式数据，而新增的属性，并没有通过Object.defineProperty设置成响应式数据
        解决方案：实现数据与视图同步更新，可采取下面三种解决方案：
            ● Vue.set()
            ● Object.assign()
            ● $forcecUpdated()

    3.data属性的 对象形式 与 函数形式 的比较

    4.vue中8种常规的通信方案
        1. 通过 props 传递
        2. 通过 $emit 触发自定义事件
        3. 使用 ref
        4. EventBus
            ● 使用场景：兄弟组件传值
            ● 创建一个中央事件总线EventBus
            ● 兄弟组件通过$emit触发自定义事件，$emit第二个参数为传递的数值
            ● 另一个兄弟组件通过$on监听自定义事件
        5. $parent 或$root
        6. attrs 与 listeners
        7. Provide 与 Inject
        8. Vuex
    
    5.vue的双向数据绑定
        依赖收集： data中某key，这称为依赖。同⼀个key可能出现多次，每次都需要收集出来用⼀个Watcher来维护它们，
        此过程称为依赖收集多个Watcher需要⼀个Dep来管理，需要更新时由Dep统⼀通知

    6.nextTick: 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
        Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新
    
    7.mixin： Mixin是面向对象程序设计语言中的类，提供了方法的实现。其他类可以访问mixin类的方法而不必成为其子类
        Mixin类通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用又避免了多继承的复杂
        本质其实就是一个js对象，它可以包含我们组件中任意功能选项，如data、components、methods、created、computed等等
        在Vue中我们可以局部混入跟全局混入
    
    8.用+new Date()生成的时间戳作为key，手动强制触发重新渲染

    9.设置key值不一定能提高diff效率
        例如：表单输入值

    10.Vue中的keep-alive

    11.组件样式的继承方式，及生效方式

    12.字符串 有格式的 渲染
        方案 1：需要精确控制换行位置（比如特定标点后强制换行），或字符串固定可提前修改。
        方案 2：字符串来自后端（后端返回时已包含\n），或不想手动加 HTML 标签（更符合 “纯文本” 逻辑）
            \n换行符 + CSS 样式（自动识别换行符）
            以在需要换行的位置添加\n（换行符），再通过 CSS 的white-space: pre-line让浏览器识别\n并自动换行。

    13.更换字符串的包围符号（适用于支持多种引号的语言）
        编程语言支持单引号和双引号都作为字符串包围符（如 JavaScript、Python、Vue 等），
        可以将字符串的外层包围符换成与内部引号不同的类型（比如外层用单引号，内部保留双引号）
        这样内部不会报错

    14.json形式的mock数据，和对象形式的有什么区别

    





Vue和React对比

这里就做几个简单的类比吧，当然没有好坏之分，只是使用场景不同

相同点

● 都有组件化思想
● 都支持服务器端渲染
● 都有Virtual DOM（虚拟dom）
● 数据驱动视图
● 都有支持native的方案：Vue的weex、React的React native
    native:
● 都有自己的构建工具：Vue的vue-cli、React的Create React App

区别

● 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流
● 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据：
    可变与不可变:
● 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
    事件：
● diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM
    详细解释


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