/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-17 15:43:04
 * @LastEditTime: 2020-06-26 15:39:26
 */
import { commonRoutes, asyncRoutes } from '@/router/routers'

/**
 * @description: 判断是否有权限
 * @param {type} 
 * @return: 
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        return true;
    }
};

/**
 * @description: 过滤出只属于editor权限的路由
 * @param {type} 
 * @return: 
 */
function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach((route) => {
        const tmp = route;
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
            }
            res.push(tmp);
        }
    });
    return res;
};


const state = {
    routes: [],
    addRoutes: [],
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = commonRoutes.concat(routes);
    },

};

const actions = {
    // 生成路由
    generateRoutes(context, roles) {
        return new Promise((resolve) => {
            let accessedRoutes;
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || [];
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
            }
            context.commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes);
        });
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
