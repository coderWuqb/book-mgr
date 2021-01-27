import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    // 子路由
    children:[
      // 当路由为 /books时渲染该组件，在<router-view/>中渲染
      {
        path:'books',
        name:'Books',
        component: () => import(/* webpackChunkName: "Books" */ '../views/Books/index.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
