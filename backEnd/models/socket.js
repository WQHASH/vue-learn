/*
 * @Description: file content
 * @Author: wangqi
 * @Date: 2020-11-27 13:47:24
 * @LastEditors: your name
 * @LastEditTime: 2020-12-15 16:18:58
 */

const mongoose = require('mongoose');
const SocketSchema = require('../schemas/socket');
let Socket = new mongoose.model('Socket', SocketSchema);

module.exports = Socket;
