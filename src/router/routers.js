/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-01 14:10:16
 * @LastEditTime: 2020-06-14 11:58:31
 */

import Layout from '@/views/layout'

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
                requiresAuth: true,
            },
            component: () => import('@/views/dashboard')
        }]
    },

    {
        path: '/login',
        name: 'Login',
        meta: {
            title: "登录",
            requireAuth: false,
            roles: []
        },
        hidden: true,
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: "登录",
            requireAuth: false,
            roles: []
        },
        hidden: true,
        component: () => import('@/views/register/index.vue')
    },
    {
        path: '*',
        name: '404',
        meta: {
            title: "找不到页面",
            requireAuth: false,
            roles: []
        },
        hidden: true,
        component: () => import('@/views/errorPage/index.vue')
    }
];


// 动态路由
const asyncRoutes = {
    'admin': [{
            path: '/userManager',
            component: Layout,
            title: "用户管理",
            children: [{
                    path: "",
                    name: "userManager",
                    meta: {
                        title: "用户管理",
                        requiresAuth: true,
                    },
                    component: () => import('@/views/userManager')
                },
                {
                    path: "core",
                    name: "core",
                    meta: {
                        title: "个人中心",
                        requiresAuth: true,
                    },
                    component: () => import('@/views/userManager/core')
                }
            ]
        },

        {
            path: '/userOrg',
            component: Layout,
            title: "组织管理",
            children: [{
                path: "",
                name: "userOrg",
                meta: {
                    title: "组织管理",
                    requiresAuth: true,
                },
                component: () => import('@/views/userOrg')
            }]
        },

        {
            path: '/other',
            component: Layout,
            title: "其它",
            children: [{
                    path: "",
                    name: "other",
                    meta: {
                        title: "other",
                        requiresAuth: true,
                    },
                    component: () => import('@/views/other')
                },
                {
                    path: "page1",
                    name: "page1",
                    meta: {
                        title: "page1",
                        requiresAuth: true,
                    },
                    component: () => import('@/views/other/page1')
                },
                {
                    path: "page2",
                    name: "page2",
                    meta: {
                        title: "page2",
                        requiresAuth: true,
                    },
                    component: () => import('@/views/other/page1/sele')
                }

            ]
        },

        {
            path: '/course',
            component: Layout,
            children: [{
                path: "",
                name: "course",
                meta: {
                    title: "课程管理",
                    requiresAuth: true,
                },
                component: () => import('@/views/course')
            }]
        },
    ],
    'user': [{
        path: '/dataFactory',
        component: Layout,
        children: [{
            path: "",
            name: "dataFactory",
            meta: {
                title: "数据工厂",
                requiresAuth: true,
            },
            component: () => import('@/views/dataFactory')
        }]
    }, ],
};

export {
    commonRoutes,
    asyncRoutes
};