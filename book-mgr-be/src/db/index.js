// 1. 在此项目下安装mongodb
// PS C:\Users\Wu\Desktop\projects\book-mgr-be> npm i mongoose
const mongoose = require('mongoose');

// 5. 给哪个数据库的哪个集合添加什么格式的文档

// Schema: 映射了Mongodb下的一个集合，并且它的内容就是集合下文档的构成
// Model: 可以理解成根据Schema生成的一套方法，这套方法用来操作Mongodb下的集合和集合下的文档

const UserSchema = new mongoose.Schema({
    nickname:String,
    password:String,
    age:Number
});

// User是给Model的一个名字，该名字会对应到集合下的文档的名字(会加上s)
const UserModel = new mongoose.model('User', UserSchema);

const connect = () => {

    // 2. 连接数据库，mongodb://127.0.0.1:27017 是mongodb默认部署在本地的地址
    //    book-mgr是数据库文件，没有的话它会自动创建
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');

    // 3. 另起一个终端打开一个数据库
    // PS C:\Program Files\MongoDB\Server\4.4\bin> ./mongod --dbpath C:\Users\Wu\Desktop\projects\db

    // 4. 数据库开启时，调用回调函数
    mongoose.connection.on('open', () =>{

        console.log('连接成功');
        
        // 创建文档
        const user = new UserModel({
            nickname:'小明',
            password:'123',
            age:18
        });

        user.age = 20;

        // 保存，同步到文档
        user.save();
    })
}

connect();

// 6. 终端运行该文件