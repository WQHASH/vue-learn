/*
 * @Description: log4.js配置
 * @Author: wangqi
 * @Date: 2020-11-12 16:05:43
 * @LastEditors: your name
 * @LastEditTime: 2020-11-12 16:28:16
 */

const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: 'application.log' }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' }
    }
});


global.logger = log4js.getLogger();

exports.log4js = log4js;
exports.logger = global.logger;

