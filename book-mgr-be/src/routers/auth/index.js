const Router = require('@koa/router');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// 获取注册过的model
const User = mongoose.model('User');

// 前缀表明当前的路由全是处理与认证相关的请求
const router = new Router({
    prefix:'/auth'
});

router.post('/register', async (ctx) => {
    // 拿取客户端传过来的数据
    const { account, password } = ctx.request.body; 

    // 判断是否已经注册过
    const one = await User.findOne({
        account,
    }).exec();
    if (one){
        ctx.response.body = {
            code: 0,
            msg: '已经存在用户',
            data: null,
        }
        return;
    }

    // 往数据库中添加
    const user = new User({
        account,
        password,
    });

    const res = await user.save();
    // 返回的是一个json
    ctx.response.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    }
});

router.post('/login', async (ctx) => {
    // 拿取客户端传过来的数据
    const { account, password } = ctx.request.body;

    // 在数据库中查询该账户并返回该文档
    const one = await User.findOne({
        account,
    }).exec();

    // 未查询到该账户
    if(!one){
        ctx.response.body = {
            code: 0,
            msg: '用户名或密码错误',
            data: null,
        }
        return;
    }

    const user = {
        account: one.account,
        _id: one.id,
    }

    // 密码正确
    if(one.password === password){
        ctx.response.body = {
            code: 1,
            msg: '登入成功',
            data: {
                user,
                token: jwt.sign(user, 'book-mgr'),
            }
        }
        return;
    }

    // 密码错误
    ctx.response.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    }
});

module.exports = router;