/*
 * @Description: token存取
 * @Author: wangqi
 * @Date: 2020-06-05 09:34:14
 * @LastEditTime: 2020-06-05 09:54:20
 */
import Cookies from 'js-cookie';

export function getToken(tokenKey) {
    return Cookies.get(tokenKey);
}

export function setToken(tokenKey, tokenValue) {
    return Cookies.set(tokenKey, tokenValue, { expires: 7 });
}

export function removeToken(tokenKey) {
    return Cookies.remove(tokenKey);
}

