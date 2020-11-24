/*
 * @Description: socket.io配置
 * @Author: wangqi
 * @Date: 2020-11-24 21:34:41
 * @LastEditTime: 2020-11-24 22:56:42
 */
import { io } from 'socket.io-client';
const IS_PROD = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'http://127.0.0.1:3000'
const socket = io(IS_PROD, { transports: ['websocket'] });
export default socket;




