/*
 * @Description: 项目入口文件
 * @Author: wangqi
 * @Date: 2020-11-08 22:14:51
 * @LastEditTime: 2020-11-12 16:29:39
 */
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const http = require('http');

const express = require('express');
const jwt = require('jwt-simple');
const jwtConfig = require('./config/jwt');
let bodyParser = require('body-parser');

const log4js = require("log4js");
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: 'application.log' }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' }
    }
});

const logger = log4js.getLogger();
logger.trace("追踪-trace");
logger.debug("断点-debug.");
logger.info("信息-info.");
logger.warn("警告-warn.");
logger.error("报错-error");
logger.fatal("毁灭错-fatal");



// let log4js = require('./server_modules/log').log4js;
// let logger = require('./server_modules/log').logger;

// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

let mongoose = require('./server_modules/mongodb');

// 服务启动
let app = express();
let router = express.Router();

// 静态资源
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(router);
// 服务器提交的数据json化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// token处理
// app.use((req, res, next) => {
//     console.log(req.body, "body");
//     let tokent;
//     let pathUrl = req.url.split('?')[0];
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         tokent = req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.tokent) {
//         tokent = req.query.tokent;
//     }

//     let apiUrl = ['/user/signup'];

//     let isCludes = apiUrl.includes(pathUrl);
//     if (isCludes) {
//         try {
//             const decoded = jwt.decode(tokent, jwtConfig.secret);
//             return next();
//         } catch (error) {
//             return next();
//         }
//     } else {
//         if (!tokent) {
//             res.status(401).json({
//                 msg: '请先登录',
//             });
//             return next();
//         }
//         try {
//             const decoded = jwt.decode(tokent, jwtConfig.secret);
//             return next();
//         } catch (error) {
//             res.status(401).json({
//                 msg: "token 校验错误"
//             });
//             return next();
//         }
//     }
// });

// 路由
app.use('/user', require('./router/users'));
let server = app.listen(port);



