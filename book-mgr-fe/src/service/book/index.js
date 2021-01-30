import axios from 'axios';

export const add = (form) => {
    return axios.post('http://localhost:3000/book/add', form);
};

// 注：get方法要传参数时与post有所区别
export const list = (data) => {
    return axios.get('http://localhost:3000/book/list', {
        params:data,
    });
};

// 注: delete传的参数放在url的后面
export const remove = (id) => {
    return axios.delete(`http://localhost:3000/book/${id}`);
};

export const updateCount = (data) => {
    return axios.post('http://localhost:3000/book/update/count', data);
}

export const update = (data) => {
    return axios.post('http://localhost:3000/book/update',data);
}