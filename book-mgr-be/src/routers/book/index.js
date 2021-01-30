const Router = require('@koa/router');
const mongoose = require('mongoose');
// const { route, routes } = require('../auth');

const Book = mongoose.model('Book');

const router = new Router({
    prefix: '/book',
});

router.post('/add', async (ctx) => {
    // 拿取客户端传过来的数据
    const {name, price, author, publishDate, classify, count} = ctx.request.body;

    // 往数据库中添加
    const book = new Book({
        name, 
        price,
        author, 
        publishDate, 
        classify,
        count,
    });

    // 将添加的数据保存到数据库并返回添加的内容
    const res = await book.save();
    
    // 返回相关信息给客户端
    ctx.response.body = {
        code: 1,
        msg: '添加成功',
        data: res,
    }
});

router.get('/list', async (ctx) => {
    // query获取客户端带上来的参数(URL中?后面的那串键值对)
    // keyword为要查找的书名
    const { keyword=''} = ctx.request.query;
    const query = {};
    // 只有客户端传key时才按key查找，否则就传个空对象给数据库
    if(keyword){
        query.name = keyword;
    }

    const list = await Book.find(query).exec();

    ctx.response.body = {
        code: 1,
        msg: '获取列表成功',
        datas: list,
    }
});

// 调用路由的delete方法
router.delete('/:id', async (ctx) => {
    const { id } = ctx.params;

    // 数据库的删除操作
    const delMsg = await Book.deleteOne({
        _id: id,
    });

    ctx.response.body = {
        code: 1,
        msg: '删除成功',
        data: delMsg,
    };
});

router.post('/update/count', async (ctx) => {
    const { id, type } = ctx.request.body;
    let { num } = ctx.request.body;
    // 确保num为数值类型
    num = Number(num);

    // 获取要操作的那项数据
    const book = await Book.findOne({
        _id: id,
    }).exec();

    if(type === 1){
        // 入库
        num = Math.abs(num);
    }else{
        // 出库
        num = -Math.abs(num);
    }
    // 操作
    book.count = book.count + num;

    if(book.count < 0){
        ctx.body = {
            code: 0,
            msg: '出库量大于库存',
        }
        return;
    }
    
    // 将操作同步到数据库
    const res = await book.save();

    ctx.response.body = {
        code: 1,
        msg: '出入库成功',
        data: res,
    };
});

router.post('/update', async (ctx) => {
    const { id, name, price, author, publishDate, classify } = ctx.request.body;

    const one = await Book.findOne({
        id,
    }).exec();

    if(!one){
        ctx.response.body = {
            code: 0,
            msg: '没有找到该书籍',
        }
        return;
    }

    if(name) one.name = name;
    if(price) one.price = price;
    if(author) one.author = author;
    if(publishDate) one.publishDate = publishDate;
    if(classify) one.classify = classify;

    const res = await one.save();

    ctx.response.body = {
        code: 1,
        msg: '修改成功',
        data: res,
    }

});

module.exports = router;