// axios是一个基于 promise 的 HTTP 库，提供某些方法能更好的去写请求
import axios from 'axios';

// 发送请求并传送数据给服务器
export const register = (account, password) => {
    axios.post('http://localhost:3000/auth/register', {
        account,
        password,
    });
};

export const login = () => {

};