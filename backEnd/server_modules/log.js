/*
 * @Description: log4.js配置
 * @Author: wangqi
 * @Date: 2020-11-12 16:05:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-15 15:59:41
 */
const path = require('path');
const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: { type: 'console' },
        app: { type: 'file', filename: 'application.log' },
        resLogger: {
            type: 'dateFile',
            filename: path.resolve('logs/log'),
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
    },
    categories: {
        default: {
            appenders: ['out', 'app'],
            level: 'all'
        },
        resLogger: {
            appenders: ['out', 'resLogger'],
            level: 'debug'
        }
    }
});


let logger = global.logger = log4js.getLogger('resLogger');

exports.log4js = log4js;
exports.logger = global.logger;

