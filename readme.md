遇到的一些小问题

state是异步更新的，所以要用回调函数 https://www.jianshu.com/p/a883552c67de

父组件中的方法无法直接用于子组件，要在子组件中用props接收才可以使用

节点触发的事件要用.bind(this)改变this指向



 npm i taro-ui@next 安装的ui库，可以使用