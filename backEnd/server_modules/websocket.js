/*
 * @Description: socket.io入口
 * @Author: wangqi
 * @Date: 2020-11-24 20:42:21
 * @LastEditTime: 2020-12-13 22:49:38
 */

const Message = require('../models/message');

const roomList = ['room1', 'room2'];

function websocket(server) {
    const io = require('socket.io')(server);

    const users = {};
    io.on('connection', async (socket) => {
        // 监听用户聊天内容
        socket.on('message', (data) => {
            let { username, msg } = data;
            // 存数据库
            let message = new Message({ username, msg });
            message.save((err) => {
                if (err) throw new Error('消息存失败了!');
                socket.broadcast.emit('message', { username, msg });
            });

        });

        // 监听用户登录
        socket.on('login', async (user) => {
            global.logger.info(user,"user");
            // 用于用户登录后更新自己的 socketId
            const address = socket.handshake.headers['x-real-ip'] || socket.request.connection.remoteAddress;
            const ip = address.split(':').slice(-1).join('');
            const { name, userId, browser, os, ua } = user;
            if (!browser || !os || !name || !id || !ua) {
                return;
            }
            // global.logger.info({ name, userId, browser, os, ua });
            

        });


    });

};


module.exports = websocket;

