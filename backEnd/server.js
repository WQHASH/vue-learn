/*
 * @Description: 项目入口文件
 * @Author: wangqi
 * @Date: 2020-11-08 22:14:51
 * @LastEditTime: 2020-11-08 23:14:45
 */
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const http = require('http');

const express = require('express');
const jwt = require('jwt-simple');
const jwtConfig = require('./config/jwt');

let bodyParser = require('body-parser');

// 服务启动
let app = express();

let router = express.Router();

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use('/api/user', require('./router/users'));

let server = app.listen(port);



