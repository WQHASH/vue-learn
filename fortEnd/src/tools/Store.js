/*
 * @Description: 本地存储
 * @Author: wangqi
 * @Date: 2020-06-12 16:38:17
 * @LastEditTime: 2020-06-14 11:17:49
 */

let Store = {
    /**
     * localStorage 获取
     * @param {String} key 键
     * @return {Boolean} key 对应 localStorage 的值
     */
    get(key) {
        try {
            if (!key) return ''
            return localStorage.getItem(key)
        } catch (err) {
            return ''
        }
    },

    /**
     * localStorage 设置
     * @param {String} key 键
     * @param {String} val 值
     */
    set(key, val) {
        try {
            if (!key) return
            return localStorage.setItem(key, val)
        } catch (err) {}
    },


    /**
     * 清除 localStorage，若不填参数 key ，则清除所有 localStorage
     * @param {String} key 键
     * @return {Boolean} 是否清除成功
     */
    remove(key) {
        try {
            if (typeof key === 'undefined') return localStorage.clear()
            return localStorage.removeItem(key)
        } catch (err) {
            return false
        }
    },
    clear: function () {
        localStorage.clear();
    }
};


export default Store;