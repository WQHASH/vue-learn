/*
 * @Description: 创建数据库
 * @Author: wangqi
 * @Date: 2020-11-09 22:53:33
 * @LastEditTime: 2020-11-10 01:03:32
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
global.db = mongoose.connect(pathUrl, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("服务器链接成功！！！")
    }
});

module.exports = mongoose;
