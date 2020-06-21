/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-02 13:17:26
 * @LastEditTime: 2020-06-21 15:19:43
 */
import axios from 'axios';
import qs from 'qs'
import { Loading, Notification } from 'element-ui';
import { getToken } from '@/tools/auth';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 15000,
    // 请求头处理，设置传给后台的参数格式
    // form: application/x-www-form-urlencoded;charset=utf-8
    // json: application/json;charset=utf-8
    headers: {
        'Content-type': 'application/json;charset=utf-8',
    },
    withCredentials: true,
})

let LoadingTip;
// 添加请求拦截器
service.interceptors.request.use((config) => {
    LoadingTip = Loading.service({
        fullscreen: true
    });

    config.headers = {
        'Authorization': getToken(),    //"Bearer KhkXjzSfrx5zLmbOOfRE7m-El-L3wps8",
    };
    // 配置根据上传资源确定 contentType
    // 在请求之前对data传参进行格式转换
    // const isJson = config.headers['Content-type'] == `application/json;charset=utf-8`;
    // if (isJson) {
    //     config.transformRequest = [function (data) {
    //         data = qs.stringify(data)
    //         return data
    //     }];
    // }
    return config;

}, (error) => {
    return Promise.reject(error)
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
    if (response.status != 200) {
        Notification.error({
            title: '提示',
            message: '请求失败!'
        });
        // 这里还可以加一些提示处理： tokent过期，当前用户在其他客户端登录
        return Promise.reject(response.data);
    } else {
        setTimeout(() => {
            LoadingTip.close();
        }, 300)
        return Promise.resolve(response.data);
    }
}, (err) => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误(400)';
                break;
            case 401:
                err.message = '未授权，请重新登录(401)';
                break;
            case 403:
                err.message = '拒绝访问(403)';
                break;
            case 404:
                err.message = '请求出错(404)';
                break;
            case 408:
                err.message = '请求超时(408)';
                break;
            case 500:
                err.message = '服务器错误(500)';
                break;
            case 501:
                err.message = '服务未实现(501)';
                break;
            case 502:
                err.message = '网络错误(502)';
                break;
            case 503:
                err.message = '服务不可用(503)';
                break;
            case 504:
                err.message = '网络超时(504)';
                break;
            case 505:
                err.message = 'HTTP版本不受支持(505)';
                break;
            default:
                err.message = `连接出错(${err.response.status})!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
    Notification.error({
        title: '提示',
        message: err.message
    });
    return Promise.reject(err);
});


export default service;