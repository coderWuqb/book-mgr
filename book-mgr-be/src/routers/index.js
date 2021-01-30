const auth = require('./auth');
const book = require('./book');

// 将所有路由注册为中间件
module.exports = (app) => {
    app.use(auth.routes());
    app.use(book.routes());
};