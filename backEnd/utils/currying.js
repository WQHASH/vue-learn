/*
 * @Description:
 * @Author: wangqi
 * @Date: 2021-02-03 13:42:19
 * @LastEditTime: 2021-02-03 15:26:15
 */

/**
 * @description: 阶乘函数
 * @param {Number} num 传递需要计算的值
 * @return {Number} num 计算后的结果
 */
function factorial(num) {
    let result = {};
    return function calculation() {
        if (num <= 1) { return 1 };
        return result[num] = num * calculation(num -= 1)
    }
};

// click setInterval ajax 
// nodejs 使用了事件驱动，非阻塞io模型; 事件驱动, 异步回调模式

