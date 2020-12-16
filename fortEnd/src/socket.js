/*
 * @Description: socket.io配置
 * @Author: wangqi
 * @Date: 2020-11-24 21:34:41
 * @LastEditTime: 2020-12-16 11:45:45
 */
import { io } from 'socket.io-client';
const IS_PROD = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'http://127.0.0.1:3000'

// 来自其他域 [IS_PROD线上环境是真实的www.baidu.com 地址]
// const socket = io(IS_PROD, { transports: ['websocket'] });

// 同域
const socket = io();
export default socket;




