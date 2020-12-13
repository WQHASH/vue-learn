/*
 * @Description: 工具方法
 * @Author: wangqi
 * @Date: 2020-12-13 20:50:55
 * @LastEditTime: 2020-12-13 20:51:13
 */
export function sort(a, b) {
    return a > b ? `${a}-${b}` : `${b}-${a}`; // 大的放前面
}

export function removeBlank(str) {
    return str.replace(/\s/g, '');
}