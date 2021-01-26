// axios是一个基于 promise 的 HTTP 库，提供某些方法能更好的去写请求
import axios from 'axios';

// 向服务器发送注册请求，并传送相关数据
export const register = (account, password) => {
    return axios.post('http://localhost:3000/auth/register', {
        account,
        password,
    });
};

// 向服务器发送登录请求，并传送相关数据
export const login = (account, password) => {
    return axios.post('http://localhost:3000/auth/login',{
        account,
        password,
    });
};