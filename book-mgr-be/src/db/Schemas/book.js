const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const BookSchema = new mongoose.Schema({
    // 书名
    name: String,
    // 价格
    price: Number,
    // 作者
    author: String,
    // 出版日期
    publishDate:String,
    // 类别
    classify: String,
    // 库存
    count: Number,
    // 何时被创建及修改
    meta: getMeta(),
});

mongoose.model('Book', BookSchema);