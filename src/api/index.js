/*
 * @Description: axios请求配置列表
 * @Author: wangqi
 * @Date: 2020-06-02 13:17:14
 * @LastEditTime: 2020-06-16 15:49:56
 */



import service from '@/api/request.js';

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
// 登录接口
export function api_login(data){
    return service({
        method: 'post',
        url: `/api/site/login`,
        data: data
    })
}
// 注册接口
export function api_signup(data){
    return service({
        method: 'post',
        url: `/api/site/signup`,
        data: data
    })
}

// 添加组织
export function add_org(data){
    return service({
        method: 'post',
        url: `/api/site/signup`,
        data: data
    })
}