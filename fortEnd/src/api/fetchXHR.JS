/*
 * @Description: Ajax 和 fetch 的封装
 * @Author: wangqi
 * @Date: 2020-11-18 16:34:07
 * @LastEditors: your name
 * @LastEditTime: 2020-11-18 17:33:11
 */

export default {
    myAjax(method, url, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest, params = [];
            xhr.responseType = 'json';
            xhr.onload = () => {
                switch (xhr.status) {
                    case 200: resolve(xhr.response); break;
                    case 204: resolve(); break;
                    // 401失败处理
                    case 401:
                        //do something
                        reject();
                        break;
                    default: reject({ status: xhr.status, res: xhr.response });
                }
            };

            if (data) {
                for (let k in data) params.push(`{encodeURIComponent(k)}=${encodeURIComponent(data[k])}`);
                data = params.join("&");
            }

            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
            // 支持跨域发送cookies
            xhr.withCredentials = true;
            xhr.send(data);
        });

    },

    myFetch(method, url, data) {
        let params = [];
        let init = {
            method,
            mode: 'cors',
            headers: {
                'Content-type': 'application/json;charset=utf-8',
            },
            // 支持跨域发送cookies  
            // omit: 从不发送cookie
            // same-origin: 同源发送cookie
            // include: 跨源可发送cookie
            credentials: 'include',
        };

        if (data) {
            if (method.toLowerCase() === 'get') {
                for (let k in data) params.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`);
                // for (let k in data) params.push(`k=${data[k]}`);
                url += '?' + params.join('&');
            } else {
                init.body = JSON.stringify(data);
            }
        }

        return fetch(url, inif).then((res) => {
            switch (res.status) {
                case 200: return res.json();
                case 204: break;
                // 401失败处理
                case 401:
                    //do something
                    return Promise.reject();
                // 服务端主动抛出错误
                case 403:
                    return res.json().then(err => Promise.reject(err));
                default:
                    return Promise.reject({ status_code: 500, message: '服务器繁忙, 请稍后再试' });
            }
        });
    }


}

