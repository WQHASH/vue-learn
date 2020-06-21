/*
 * @Description: 设置动态路由权限
 * @Author: wangqi
 * @Date: 2020-06-01 14:16:17
 * @LastEditTime: 2020-06-21 19:02:44
 */

import router from './router';
import store from '@/store';
import { getToken } from '@/tools/auth';
import { asyncRoutes } from '@/router/routers';

import { Message } from 'element-ui'
import NProgress from 'nprogress';
import 'nprogress/nprogress';


NProgress.configure({ showSpinner: false });

function getRoutes(data) {
    let result = [];
    let children = [];
    // 权限路由
    children.push(...(asyncRoutes[data]));
    result.push(...children);
    // children.push({
    //     path: '*',
    //     name: '404',
    //     meta: {
    //         title: "找不到页面",
    //         requireAuth: false,
    //         roles: []
    //     },
    //     hidden: true,
    //     component: () => import('@/views/errorPage/index.vue')
    // });
    return result;
}
// 白名单
const whiteList = ['/login'];
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (to.meta.title) {
        document.title = to.meta.title
    }

    let hasToken = getToken();

    if (hasToken) {
        if (to.path == '/login') {
            // next("/");
            next({ path: '/' })
            NProgress.done();
        } else {
            const hasUserInfo = store.getters.name;
            if (hasUserInfo) {
                next();
            } else {
                try {
                    await store.dispatch("user/getInfo");
                    next();
                } catch (error) {
                    await store.dispatch("user/resetToken");
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`);
                    NProgress.done()
                }
            }

        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }


});

// 全局解析守卫 (执行在beforeEach 和 组件内守卫和异步路由组件被解析之后)
// router.beforeResolve((to, from, next) => {
//     console.log("beforeResolve - 全局解析守卫")
//     next()
// });

// 全局后置钩子
router.afterEach((to, from) => {
    NProgress.done()
});