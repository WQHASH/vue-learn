/*
 * @Description: axios请求配置列表
 * @Author: wangqi
 * @Date: 2020-06-02 13:17:14
 * @LastEditTime: 2020-12-22 17:22:06
 */

import service from '@/api/request.js';


// 登录接口
export function loginUser(data) {
    return service({
        url: `/user/signin`,
        method: 'post',
        data
    })
}

// 注册接口
export function registerUser(data) {
    return service({
        url: `/user/signup`,
        method: 'post',
        data
    })
}

// 获取用户信息
export function getInfo(token) {
    return service({
        url: `/user/info`,
        method: 'get',
        params: { token }
    })
}

// 退出
export function logout() {
    return service({
        url: `/user/logout`,
        method: 'post',
    })
}

// 获取历史消息
export function getMsgHistory(roomid) {
    return service({
        url: `/message/history`,
        method: 'get',
        params: { roomid }
    })
}

// 上传图片
export function uploadImg(data) {
    return service({
        url: `/message/uploadImg`,
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data
    })
}



// -----------------------
// 测试接口
/**
 * @description: 
 * @param data {Object} 
 * @return: 
 */
export function getRoby(data) {
    return service({
        method: 'get',
        url: `/roby`,
        data,
    })
}

export function getPost() {
    return service({
        method: 'post',
        url: `/api/post`,
        data: {
            sage: "11112222"
        },
        // headers:{
        //     "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
        // }
    })
}
