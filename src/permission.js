/*
 * @Description: 设置动态路由权限
 * @Author: wangqi
 * @Date: 2020-06-01 14:16:17
 * @LastEditTime: 2020-06-18 00:57:02
 */

import router from './router';
import Store from '@/tools/Store';
import { asyncRoutes } from '@/router/routers';

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

//用来控制路由跳转
let hasMenus = false


// 全局前置守卫
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }

    let auth = Store.get('rolesType');
    // if (auth && to.path !== '/login') {
    //     if (hasMenus) {
    //         next();
    //     } else {
    //         try {
    //             const routesList = getRoutes(auth);
    //             router.addRoutes(routesList);
    //             router.options.routes = router.options.routes.concat(routesList);
    //             hasMenus = true;
    //             next({
    //                 path: to.path
    //             });
    //         } catch (error) {
    //             next(`/login`)
    //         }
    //     }

    // } else {
    //     hasMenus = false
    //     if (to.path === '/login') {
    //         next()
    //     } else {
    //         next(`/login`)
    //     }
    // }

    if (auth && to.path !== '/login') {
        if (hasMenus) {
            next();
        } else {
            try {
                const routesList = getRoutes(auth);
                router.addRoutes(routesList);
                router.options.routes = router.options.routes.concat(routesList);
                hasMenus = true;
                next();
            } catch (error) {
                next(`/login`)
            }
        }
    } else {
        hasMenus = false;
        if (to.path === '/login') {
            next();
        } else {
            next(`/login`);
        }
    }
});

// 全局解析守卫 (执行在beforeEach 和 组件内守卫和异步路由组件被解析之后)
router.beforeResolve((to, from, next) => {
    console.log("beforeResolve - 全局解析守卫")
    next()
});

// 全局后置钩子
router.afterEach((to, from) => {
    console.log("afterEach - 全局后置钩子")
});