/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-11-08 23:08:27
 * @LastEditTime: 2020-11-09 16:37:11
 */
const jwtConfig = require('../config/jwt');
const jwt = require('jwt-simple');
const express = require('express');
const router = express.Router();


router.get('/info', (res, req) => {
    req.json({
        code: 200,
        data: {
            sname: "wq",
        }
    })
});
module.exports = router;