/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-06-21 14:49:06
 * @LastEditTime: 2020-06-26 15:31:43
 */

import { getToken, setToken, removeToken } from '@/tools/auth';
import router, { resetRouter } from '@/router';
import { login, logout, getInfo } from '@/api';

const state = {
    token: getToken(),
    roles: [],
    name: '',
    avatar: '',
    introduction: '',
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_INTRODUCTION: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    }

};

const actions = {

    /**
     * @description: 登录
     * @param {type} 
     * @return: 
     */
    login(context, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            // 登录成功后获取token
            login({ username, password }).then((response) => {
                const { data } = response;
                //设置tokent到状态
                context.commit("SET_TOKEN", data.token);
                // 保存tokent到Cookie
                setToken(data.token);
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * @description: 获取用户信息
     * @param {type} 
     * @return: 
     */
    getInfo(context) {
        return new Promise((resolve, reject) => {
            getInfo(context.state.token).then((response) => {
                const { data } = response;
                if (!data) {
                    reject('获取用户信息失败~')
                }

                const { roles, name, avatar, introduction } = data;
                if (!roles || roles.length <= 0) {
                    reject("获取roles失败!");
                }
                context.commit('SET_ROLES', roles);
                context.commit('SET_NAME', name);
                context.commit('SET_AVATAR', avatar);
                context.commit('SET_INTRODUCTION', introduction);

                resolve(data);
            }).catch((err) => {
                reject(err);
            })
        });
    },

    /**
     * @description: 退出
     * @param {type} 
     * @return: 
     */
    logout(context) {
        return new Promise((resolve, reject) => {
            logout(context.state.token).then(() => {
                context.commit('SET_TOKEN', '');
                context.commit('SET_ROLES', []);

                context.commit('SET_NAME', '');
                context.commit('SET_AVATAR', '');
                context.commit('SET_INTRODUCTION', '');


                // 清除token
                removeToken();
                //重置路由
                resetRouter()

                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    },

    /**
     * @description: 重置token
     * @param {type} 
     * @return: 
     */
    resetToken(context) {
        return new Promise((resolve) => {
            context.commit('SET_TOKEN', '');
            context.commit('SET_ROLES', []);
            removeToken();
            resolve();
        });
    }



};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

