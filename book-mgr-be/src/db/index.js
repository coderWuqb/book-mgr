const mongoose = require('mongoose');
require('./Schemas/User.js');
require('./Schemas/book.js');

const connect = () => {
    return new Promise((resolve) => {
        // 连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

        // 数据库开启时调用回调函数并使Promise的状态为成功
        mongoose.connection.on('open', () => {
            console.log('连接数据库成功');

            resolve();
        })
    });
}

module.exports = {
    connect,
}
