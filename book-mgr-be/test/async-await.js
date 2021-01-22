const Koa = require('koa');

const app = new Koa();

// async 修饰的函数返回的是一个promise对象，return 的是成功时给的参数
// const fn = async () => {
//     return 1;
// }
// 相当于
// const fn = () => {
//     return new Promise((resolve, reject) => {
//         resolve(1);
//     });
// }

// fn().then((res) => {
//     console.log(res);
// });

// await 只在 async 函数中有效
// 它后面跟的是 promise对象时，它会等promise的状态由初始转为成功或失败
// 等待期间是阻塞状态，后续代码需等待执行
// koa希望use里的函数是一个async函数
// 以下三个中间件执行完输出的是： 123654
app.use(async (context, next) => {
    console.log(1);
    // 走到下一个中间件的async函数，并等待它的函数执行完
    await next();
    console.log(4);
});

app.use(async (context, next) => {
    console.log(2);
    await next();
    console.log(5);
});

app.use(async (context, next) => {
    console.log(3);
    await next();
    console.log(6);
});

app.listen(3000, () => {
    console.log('启动成功');
});