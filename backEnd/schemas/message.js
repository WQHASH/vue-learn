/*
 * @Description: 消息架构
 * @Author: wangqi
 * @Date: 2020-11-27 13:48:46
 * @LastEditors: your name
 * @LastEditTime: 2020-11-27 17:25:44
 */

const mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    username: String,
    msg: {
        type: String,
        default: "",
    },
    time: {
        type: Date,
        default: Date.now()
    }

});

MessageSchema.methods = {
    findTemp: function (a, b, c, cb) {
        global.logger.info(this, "实例方法")
        cb();
        // global.logger.info(this.model, "findTemp-实例方法");
    }
};

MessageSchema.statics = {
    fetch: function (cb) {
        return this.find({}).sort('time').exec(cb)
    },
    findById: function (id, cb) {
        return this.findOne({ _id: id }).exec(cb)
    },
    findTempStatic: function (cb) {
        cb()
        global.logger.info(this, "findTempStatic-静态方法");
    }
};


module.exports = MessageSchema;


