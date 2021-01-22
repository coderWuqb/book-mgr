const Koa = require('koa');

const app = new Koa();

// 通过 app.use 注册中间件
// 中间件本质上就是一个函数，它要传入的参数也必须是一个函数
// 中间件提供一个参数 context 上下文，当前请求的相关信息都在里面
app.use((context) =>{
    // context 是一个对象，它包含两个对象，request和response,各自包含一些信息
    // console.log(context);
    // 对response重命名
    const { request:req } = context;
    const { url } = req;
    
    // url这段路径一般称为路由 
    if(url === '/user'){
        // context.response.body的简写
        context.body = 'abcd';

        // 当前处理结束
        return;
    }

    context.body = '404';
});

// listen() 开启一个http 服务，接收http 请求并做处理，处理完后响应
// http 默认端口 80
// https 默认端口 443
app.listen(3000, () => {
    console.log('启动成功');
});






