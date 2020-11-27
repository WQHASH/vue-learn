/*
 * @Description: socket.io入口
 * @Author: wangqi
 * @Date: 2020-11-24 20:42:21
 * @LastEditTime: 2020-11-27 22:36:17
 */

const Message = require('../models/message');

function websocket(server) {
    const io = require('socket.io')(server);
    io.on('connection', async (socket) => {
        socket.on('message', (data) => {
            let { username, msg } = data;
            // 存数据库
            let message = new Message({ username, msg });
            message.save((err) => {
                if (err) throw new Error('消息存失败了!');
                socket.emit('message', { username, msg });
            });

        });


    });

};


module.exports = websocket;

