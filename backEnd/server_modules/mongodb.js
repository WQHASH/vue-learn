/*
 * @Description: 创建数据库
 * @Author: wangqi
 * @Date: 2020-11-09 22:53:33
 * @LastEditTime: 2020-11-27 17:45:35
 */
const mongoose = require('mongoose');
// 用于异步回调
mongoose.Promise = require('bluebird');
let config = {
    servername: 'localhost',
    port: '27017',
    DATABASE: 'vuenode'
}
let pathUrl = `mongodb://${config.servername}:${config.port}/${config.DATABASE}`;
let options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true };
let callBack = (err) => {
    if (err) {
        throw err;
    } else {
        console.log("服务器链接成功！！！")
    }
};

global.db = mongoose.connect(pathUrl, options, callBack);

module.exports = mongoose;
