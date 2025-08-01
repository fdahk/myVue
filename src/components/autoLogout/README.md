自动登出hook
除hook方案实现外：
    还可以采用路由层面的登出函数挂载 或 插件注册挂载登出函数
    路由层面：vue使用meta添加是否挂载字段，vuerouter再根据meta字段决定是否挂载
            react没有meta，可以使用loader实现类似功能