/*
 * @Description:
 * @Author: wangqi
 * @Date: 2020-12-13 20:49:31
 * @LastEditTime: 2020-12-13 21:55:21
 */
import env from '@/tools/env'

export async function handleInit({ socket, store, name, userId, src, roomList }) {
    socket.emit('login', { name, userId, ...env });
    roomList.forEach(item => {
        const obj = { name, src, roomid: item };
        socket.emit('room', obj);
    });

};

