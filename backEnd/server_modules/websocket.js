/*
 * @Description: socket.io入口
 * @Author: wangqi
 * @Date: 2020-11-24 20:42:21
 * @LastEditTime: 2020-11-25 23:50:06
 */


function websocket(server) {
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
        // test
        socket.on('message', (data) => {
            socket.emit('message', {
                username: socket.username,
                message: data
            });
        });
    });

};


module.exports = websocket;

