/*
 * @Description: socket.io入口
 * @Author: wangqi
 * @Date: 2020-11-24 20:42:21
 * @LastEditTime: 2020-11-24 23:08:45
 */


function websocket(server) {
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
        // test
        socket.on('message', (data) => {
            console.log(data,"data");
            socket.emit('message', {
                username: socket.username,
                message: data
            });
        });
    });

};


module.exports = websocket;

