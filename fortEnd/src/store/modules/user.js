/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-06-21 14:49:06
 * @LastEditTime: 2020-11-30 21:15:15
 */

import { getToken, setToken, removeToken } from '@/tools/auth';
import router, { resetRouter } from '@/router';
import { loginUser, registerUser, logout, getInfo, getMsgHistory } from '@/api';

const state = {
    token: getToken(),
    roles: [],
    name: '',
    avatar: '',
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
    SET_AVATAR(state, avatar) {
        state.avatar = avatar;
    },
    SET_INTRODUCTION(state, avatar) {
        state.introduction = avatar;
    },
    SET_ROLES(state, roles) {
        state.roles = roles;
    },

    // 设置消息记录
    SET_ROOMDETAIL(state, messages) {
        state.roomdetail = messages;
    },

    // 用户退出
    SET_LOGOUT(state) {
        state.token = '';
        state.roles = [];
        state.name = '';
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
                const { errno, token } = response;
                if (errno) { return resolve(response) };

                //设置tokent到状态
                context.commit("SET_TOKEN", token);
                // 保存tokent到Cookie
                setToken(token);
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
                const { errno, token } = response;
                if (errno) { return resolve(response) };

                //设置tokent到状态
                context.commit("SET_TOKEN", token);
                setToken(token);
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

    /**
     * @description: 获取消息历史记录
     * @param {*}
     * @return {*}
     */
    getMsgHistory(context) {
        return new Promise((resolve, reject) => {
            getMsgHistory(context.state.name).then((res) => {
                let { errno, data } = res;
                if (errno) { return reject("获取消息历史记录失败") };
                context.commit("SET_ROOMDETAIL", data);
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    },



};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

