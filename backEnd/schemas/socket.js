/*
 * @Description: socket架构, 用来区分 socketId用户
 * @Author: wangqi
 * @Date: 2020-11-27 13:26:03
 * @LastEditors: your name
 * @LastEditTime: 2020-12-15 17:29:31
 */
const mongoose = require("mongoose");

let SocketSchema = new mongoose.Schema({
    ip: String,
    socketId: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //设备
    os: {
        type: String,
        default: ''
    },
    //浏览器
    browser: {
        type: String,
        default: ''
    },
    //完整 ua
    ua: {
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: Date.now()
    }

});

SocketSchema.methods = {
    testwqhash(){},
    ggg(){}
}
SocketSchema.statics = {
    fetch(cb) {
        return this.sort('time').exec(cb);
    },
    findById(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    },
    wqhash(){},
    wqhash1(){}

};

module.exports = SocketSchema;

















