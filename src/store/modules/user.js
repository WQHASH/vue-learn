/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-06-21 14:49:06
 * @LastEditTime: 2020-06-21 18:15:37
 */

import { getToken, setToken, removeToken } from '@/tools/auth';
import { resetRouter } from '@/router';
import { login, logout, getInfo } from '@/api';

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
    };
};

const state = getDefaultState();

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },

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

                const { name, avatar } = data;
                context.commit('SET_NAME', name);
                context.commit('SET_AVATAR', avatar);
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
                // 清除token
                removeToken();
                //重置路由
                resetRouter()
                context.commit('RESET_STATE');
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
            removeToken();
            context.commit("RESET_STATE");
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

