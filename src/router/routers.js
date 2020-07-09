/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-01 14:10:16
 * @LastEditTime: 2020-07-10 00:38:30
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
    redirect: '/dashboard/index',
    children: [{
        path: "index",
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
    path: '/topology',
    component: Layout,
    redirect: '/topology/list',
    meta: { title: "网络拓扑" },
    children: [{
        path: "list",
        name: "Topology",
        meta: {
            title: "网络拓扑",
        },
        component: () => import('@/views/topology/list')
    }, {
        name: "TopologyDetails",
        path: 'edit/:id(\\d+)',
        hidden: true,
        meta: {
            title: "编辑拓扑",
            activeMenu: "/topology/list"
        },
        component: () => import('@/views/topology/components/topologyDetails'),
    }]
},

{
    path: '/map',
    component: Layout,
    redirect: '/map/index',
    hidden: true,
    children: [{
        path: "index",
        name: "Map",
        meta: {
            title: "地图",
        },
        component: () => import('@/views/map')
    }]
},
];


// 动态路由
const asyncRoutes = [
    {
        path: '/userManager',
        // name: "userManager",
        component: Layout,
        // hidden: true,
        redirect: '/userManager/index',
        meta: { title: "管理", roles: ['admin'] },
        children: [{
            path: "index",
            name: "userManager",
            meta: {
                title: "admin",
                roles: ['admin'],
            },
            redirect: '/userManager/core',
            // alwaysShow: true,
            component: () => import('@/views/userManager'),
            children: [{
                path: "core",
                name: "core",
                meta: {
                    title: "个人中心",
                    roles: ['admin'],
                },
                component: () => import('@/views/userManager/core')
            }, {
                name: "menu",
                path: "menu",
                meta: {
                    title: "测试菜单",
                },
                component: () => import('@/views/userManager/menu1-1')
            }]
        },
        ]
    },

    {
        path: '/icons',
        component: Layout,
        meta: { roles: ['admin', 'editor'] },
        hidden: true,
        children: [{
            path: "icons",
            name: "Icons",
            meta: {
                title: "图标",
            },
            component: () => import('@/views/icons')
        }]
    },

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