/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-06-21 14:49:06
 * @LastEditTime: 2020-12-19 21:03:47
 */

import { getToken, setToken, removeToken } from '@/tools/auth';
import { setItem, getItem } from '@/tools/localStorage';
import router, { resetRouter } from '@/router';
import { loginUser, registerUser, logout, getInfo, getMsgHistory } from '@/api';

const state = {
    token: getToken(),
    roles: [],
    name: getItem('name'),
    userId: getItem('userId'),
    avatar: getItem('avatar'),
    // name:"",
    // userId:"",
    // avatar:"",
    introduction: '',
    // 聊天历史记录
    roomdetail: [],
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    SET_NAME(state, name) {
        state.name = name;
    },
    SET_USERID(state, userId) {
        state.userId = userId;
    },
    SET_AVATAR(state, avatar) {
        state.avatar = avatar;
    },
    SET_INTRODUCTION(state, avatar) {
        state.introduction = avatar;
    },
    SET_ROLES(state, roles) {
        state.roles = roles;
    },

    // 用户退出
    SET_LOGOUT(state) {
        state.token = '';
        state.roles = [];
        state.name = '';
        state.userId = '';
        state.avatar = '';
        state.introduction = '';
        // 清除token
        removeToken();
        //重置路由
        resetRouter();
    }

};

const actions = {
    /**
     * @description: 登录
     * @param {type} 
     * @return: 
     */
    loginUserSubmit(context, userInfo) {
        const { name, password } = userInfo;
        return new Promise((resolve, reject) => {
            // 登录成功后获取token
            loginUser({ name, password }).then((response) => {
                const { errno, token, user } = response;
                if (errno) { return resolve(response) };

                //设置tokent到状态
                context.commit("SET_TOKEN", token);
                context.commit("SET_NAME", user.name);
                context.commit("SET_USERID", user.id);
                // 保存tokent到Cookie
                setToken(token);
                setItem('name', user.name);
                setItem('userId', user.id);

                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * @description: 注册
     * @param {store对象} context
     * @param {注册用户信息} userInfo
     * @return {*}
     */
    registerUserSubmit(context, userInfo) {
        return new Promise((resolve, reject) => {
            registerUser(userInfo).then((response) => {
                const { errno, token, userInfo: user } = response;
                if (errno) { return resolve(response) };

                //设置tokent到状态
                context.commit("SET_TOKEN", token);
                context.commit("SET_USERID", user.id);
                setToken(token);
                setItem('name', user.name);
                setItem('userId', user.id);

                resolve(response);
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

                const { roles, name, id, avatar, introduction } = data;
                if (!roles || roles.length <= 0) {
                    reject("获取roles失败!");
                }
                context.commit('SET_ROLES', roles);
                context.commit('SET_NAME', name);
                context.commit("SET_USERID", id);
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
            logout(context.state.token).then((data) => {
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
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

