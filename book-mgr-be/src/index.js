const Koa = require('koa');
// 用于koa框架解析请求体的模块
const koaBody = require('koa-body');
const { connect } = require('./db');
const registerRouters = require('./routers');
// 解决跨域问题，包含了正确CORS响应头
const cors = require('@koa/cors');

const app = new Koa();

// 在数据库连接成功后开启服务
connect().then(() => {
    app.use(cors());
    app.use(koaBody());

    registerRouters(app);

    app.listen(3000, () => {
        console.log('启动成功');
    });
});






