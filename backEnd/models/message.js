/*
 * @Description: 消息模型
 * @Author: wangqi
 * @Date: 2020-11-27 13:48:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-27 22:36:10
 */

 const mongoose = require('mongoose');
 const MessageSchema = require('../schemas/message');
 const Message = mongoose.model('Message', MessageSchema);


 module.exports = Message;
