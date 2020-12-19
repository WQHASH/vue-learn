/*
 * @Description: socket.io入口
 * @Author: wangqi
 * @Date: 2020-11-24 20:42:21
 * @LastEditTime: 2020-12-19 18:53:09
 */

const Message = require('../models/message');
const Socket = require('../models/Socket');
const roomList = ['room1', 'room2'];
let io;
function websocket(server) {
    const users = {};
    const roomLink = {};
    io = require('socket.io')(server);

    io.on('connection', async (socket) => {
        // 监听用户聊天内容
        socket.on('message', async (data) => {
            console.log(data, "data")
            let { username, src, msg, roomid, roomType, type, time } = data;
            // 存数据库
            let message = new Message({ username, src, msg, roomid, roomType, type, time });
            // message.save((err) => {
            //     if (err) throw new Error('消息存失败了!');
            //     console.log(roomid,"roomidxxxcsaca")
            //     io.to(roomid).emit('message', { username, src, msg, roomid, roomType, type, time });
            // });

            let msgRes = await message.save();
            io.to(roomid).emit('message', msgRes);

        });

        // 监听用户登录
        socket.on('login', async (user) => {
            // 用于用户登录后更新自己的 socketId 
            const address = socket.handshake.headers['x-real-ip'] || socket.request.connection.remoteAddress;
            const ip = address.split(':').slice(-1).join('');
            const { name, userId, browser, os, ua } = user;
            if (!browser || !os || !name || !userId || !ua) {
                return;
            }
            let socketRes = await Socket.findOne({ ip, browser, os, userId }).exec();

            // let obj = new Socket({ ip, userId, os, browser, ua, socketId: socket.id });

            if (!socketRes) {

                let socketData = { ip, userId, os, browser, ua, socketId: socket.id, };

                const addSocket = await new Socket(socketData).save();
            } else {
                // 更新 socketId [因为socket每次都会生成一个随机的唯一标识]
                let updataRes = await Socket.updateOne({ _id: socketRes._id }, { socketId: socket.id }).exec();
            }

            if (!name) { return };
            socket.name = name;
        });

        // 加入房间
        socket.on('room', async (user) => {
            const { name, roomid } = user;
            if (!name || !roomid) { return };
            if (!users[roomid]) {
                users[roomid] = {};
            };
            // users[roomid][name] = Object.assign({}, { socketid: socket.id }, user);
            users[roomid][name] = Object.assign(user, { socketid: socket.id });
            // roomLink[name] = socket.id;
            // 进行群聊会话
            socket.join(roomid);
            let onlineUsers = {};
            for (let item in users[roomid]) {
                onlineUsers[item] = {};
                onlineUsers[item].src = users[roomid][item].src;
            };
            io.to(roomid).emit('room', { onlineUsers, roomid });

            global.logger.info(`${name} 加入了 ${roomid}`);
        });

        // 退出房间
        socket.on('roomout', async (user) => {
            handleLogoutRoom(socket, users);
        });

        // socket销毁
        socket.on('disconnect', async () => {
            handleLogoutRoom(socket, users);
        });

    });
};

let handleLogoutRoom = async (socket, users) => {
    try {
        ['room1', 'room2'].forEach(async (item) => {
            const roomid = item;
            const name = socket.name;
            if (users[roomid] && users[roomid].hasOwnProperty(name)) {
                delete users[roomid][name];

                let onlineUsers = {};
                for (let item in users[roomid]) {
                    onlineUsers[item] = {};
                    onlineUsers[item].src = users[roomid][item].src;
                };
                io.to(roomid).emit('roomout', { onlineUsers, roomid });
                socket.leave(roomid);
            }
        });
    } catch (error) {
        global.logger.info('断开socket连接失败!')
    }
};

module.exports = websocket;

