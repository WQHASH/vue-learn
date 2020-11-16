/*
 * @Description: 项目入口文件
 * @Author: wangqi
 * @Date: 2020-11-08 22:14:51
 * @LastEditTime: 2020-11-16 21:15:32
 */
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const http = require('http');

const express = require('express');
const jwt = require('jwt-simple');
const jwtConfig = require('./config/jwt');
let bodyParser = require('body-parser');
// 引入日志
const log4js = require('./server_modules/log').log4js;
const logger = require('./server_modules/log').logger; 

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

// 日志处理
// app.use(log4js.connectLogger(logger));

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


//设置跨域访问
app.all('*', function(req, response, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    response.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    //跨域允许的请求方式
    response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //设置响应头信息
    response.header("X-Powered-By",' 3.2.1')
    response.header("Content-Type", "application/json;charset=utf-8");
    
    next();
});
    

// 路由
app.use('/user', require('./router/users'));
let server = app.listen(port);



