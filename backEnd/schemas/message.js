/*
 * @Description: 消息架构
 * @Author: wangqi
 * @Date: 2020-11-27 13:48:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-25 22:43:20
 */

const mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    username: String,
    src: String,
    msg: {
        type: String,
        default: "",
    },
    img: {
        type: String,
        default: "",
    },
    audio: {
        type: String,
        default: "",
    },
    roomid: String,
    roomType: String,
    type: String,
    time: {
        type: Date,
        default: Date.now()
    }

});

MessageSchema.methods = {};

MessageSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort('time').exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({ _id: id }).exec(cb)
    }
};


module.exports = MessageSchema;


