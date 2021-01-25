const mongoose = require('mongoose');
const { getMeta } = require('../helpers');

const UserSchema = new mongoose.Schema({
    account: String,
    password: String,
    meta:getMeta(),
});

// 注册model
mongoose.model('User', UserSchema);

