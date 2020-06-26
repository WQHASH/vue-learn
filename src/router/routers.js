/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-01 14:10:16
 * @LastEditTime: 2020-06-26 16:58:00
 */

import Layout from '@/views/layout';

// 公共路由
const commonRoutes = [{
    path: '/',
    redirect: "/dashboard",
    hidden: true,
},
{
    path: '/dashboard',
    component: Layout,
    children: [{
        path: "",
        name: "dashboard",
        meta: {
            title: "首页",
        },
        component: () => import('@/views/dashboard')
    }]
},

{
    path: '/login',
    name: 'Login',
    meta: {
        title: "登录",
    },
    hidden: true,
    component: () => import('@/views/login/index.vue')
},
{
    path: '/register',
    name: 'Register',
    meta: {
        title: "注册",
    },
    hidden: true,
    component: () => import('@/views/register/index.vue')
},

{
    path: '/icon',
    component: Layout,
    children: [{
        path: "",
        name: "Icons",
        meta: {
            title: "icon",
        },
        component: () => import('@/views/icons')
    }]
},
];


// 动态路由
const asyncRoutes = [
    {
        path: '/userManager',
        component: Layout,
        title: "admin",
        meta: { roles: ['admin'] },
        children: [{
            path: "",
            name: "userManager",
            meta: {
                title: "admin",
                roles: ['admin'],
            },
            component: () => import('@/views/userManager')
        },
        {
            path: "core",
            name: "core",
            meta: {
                title: "个人中心",
                roles: ['admin'],
            },
            component: () => import('@/views/userManager/core')
        }]
    },

    {
        path: '/userOrg',
        component: Layout,
        title: "editor",
        meta: { roles: ['admin', 'editor'] },
        children: [{
            path: "",
            name: "userOrg",
            meta: {
                title: "editor",
            },
            component: () => import('@/views/userOrg')
        }]
    },


    // {
    //     path: '/other',
    //     component: Layout,
    //     title: "其它",
    //     children: [{
    //         path: "",
    //         name: "other",
    //         meta: {
    //             title: "other",
    //         },
    //         component: () => import('@/views/other')
    //     },
    //     {
    //         path: "page1",
    //         name: "page1",
    //         meta: {
    //             title: "page1",
    //         },
    //         component: () => import('@/views/other/page1')
    //     },
    //     {
    //         path: "page2",
    //         name: "page2",
    //         meta: {
    //             title: "page2",
    //         },
    //         component: () => import('@/views/other/page1/sele')
    //     }
    //     ]
    // },

    // {
    //     path: '/course',
    //     component: Layout,
    //     children: [{
    //         path: "",
    //         name: "course",
    //         meta: {
    //             title: "课程管理",
    //         },
    //         component: () => import('@/views/course')
    //     }]
    // },
    // {
    //     path: '/dataFactory',
    //     component: Layout,
    //     meta: { roles: ['editor'] },
    //     children: [{
    //         path: "",
    //         name: "dataFactory",
    //         meta: {
    //             title: "数据工厂",
    //         },
    //         component: () => import('@/views/dataFactory')
    //     }]
    // }
    {
        path: '*',
        name: '404',
        meta: {
            title: "找不到页面",
        },
        hidden: true,
        component: () => import('@/views/errorPage/index.vue')
    },
];


export {
    commonRoutes,
    asyncRoutes,
};