/*
 * @Description: 设置动态路由权限
 * @Author: wangqi
 * @Date: 2020-06-01 14:16:17
 * @LastEditTime: 2020-11-15 22:43:35
 */

import router from './router';
import store from '@/store';
import { getToken } from '@/tools/auth';
import { asyncRoutes } from '@/router/routers';

import { Message } from 'element-ui'
import NProgress from 'nprogress';
import 'nprogress/nprogress';

NProgress.configure({ showSpinner: false });

// 白名单
const whiteList = ['/login', '/register'];
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if (to.meta.title) {
        document.title = to.meta.title
    }
    let hasToken = getToken();
    if (hasToken && hasToken != 'undefined') {
        if (to.path == '/login') {
            // next("/");
            next({ path: '/' })
            NProgress.done();
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    const { roles } = await store.dispatch("user/getInfo");
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
                    router.addRoutes(accessRoutes);
                    next({ ...to, replace: true })
                } catch (error) {
                    await store.dispatch("user/resetToken");
                    Message.error(error || 'Has Error')
                    // next(`/login?redirect=${to.path}`);
                    next(`/login`);
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            // next(`/login?redirect=${to.path}`);
            next(`/login`);
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