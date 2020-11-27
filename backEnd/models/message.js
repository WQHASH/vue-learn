/*
 * @Description: 消息模型
 * @Author: wangqi
 * @Date: 2020-11-27 13:48:54
 * @LastEditors: your name
 * @LastEditTime: 2020-11-27 17:20:05
 */

 const mongoose = require('mongoose');
 const MessageSchema = require('../schemas/message');
 const Message = mongoose.model('Message', MessageSchema);


 Message.findTempStatic(function(){
     global.logger.info(this,"model")
     console.log("yyy");
 });
// Message.findTemp(1,2,3, function(){
//      console.log("xxxx");
//  });

 module.exports = Message;
