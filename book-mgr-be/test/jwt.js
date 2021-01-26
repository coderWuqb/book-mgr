var jwt = require('jsonwebtoken');

// 加密
// 第一个参数：密钥
var token = jwt.sign({
    aacount:'a.cc.com',
    _id:'123',
}, 'aaa');
console.log(token);

// 解密
// 解密成功返回payload，解密失败返回err
jwt.verify(token, 'aaa',(err, payload) => {
    console.log(err ,payload);
});


// token由三个点分成三部分：
// header:加密的算法、标志
// payload:加密完后的
// signature:密钥
