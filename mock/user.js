/*
 * @Description: 用户接口
 * @Author: wangqi
 * @Date: 2020-06-21 15:45:51
 * @LastEditTime: 2020-06-21 18:06:19
 */

const tokens = {
    admin: {
        token: 'admin-token',
    },
    editor: {
        token: 'editor-token',
    }
};

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: '我是admin 呀',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: "超级管理员",
    },
    'editor-token': {
        roles: ['editor'],
        introduction: '我是editor 呀',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: "普通用户呢",
    },
};
module.exports = [
    {
        url: "/user/login",
        type: 'post',
        response: (config) => {
            const { username } = config.body
            const token = tokens[username]
            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 20000,
                data: token
            }
        }
    },

    {
        url: '/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 20000,
                data: info
            }
        }
    },

    {
        url: '/user/logout',
        type: 'post',
        response: () => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }

]