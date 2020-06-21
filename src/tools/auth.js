/*
 * @Description: token存取
 * @Author: wangqi
 * @Date: 2020-06-05 09:34:14
 * @LastEditTime: 2020-06-21 14:43:36
 */
import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token'

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: 7 });
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

