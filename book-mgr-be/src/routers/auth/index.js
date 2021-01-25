const Router = require('@koa/router');
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
    ctx.body = '登录成功';
});

module.exports = router;