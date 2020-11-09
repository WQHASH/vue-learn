/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-11-08 23:08:27
 * @LastEditTime: 2020-11-10 00:59:17
 */
const jwt = require('jwt-simple');
const jwtConfig = require('../config/jwt');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// 注册接口
router.post('/signup', (req, res) => {
    let { name, password, age } = req.body;
    if (name.length > 15) {
        res.json({
            errno: 1,
            data: "用户名过长"
        });
        return;
    }

    User.findOne({ name }, (err, user) => {
        if (err) {
            throw Error;
        }
        if (user) {
            res.json({
                errno: 1,
                data: '用户名已存在'
            });
        } else {
            user = new User({
                name,
                password,
                age
            })

            user.save((err, user) => {
                if (err) {
                    console.log("user集合保存数据失败");
                    // throw Error;
                    global.logger.error(err)
                }
                let userInfo = {
                    name: name,
                    id: userItem.id,
                    age: userItem.age
                };
                res.json({
                    erron: 0,
                    userInfo,
                    token: jwt.encode(userInfo, jwtConfig.secret),
                    data: '注册成功'
                });
            });
        }
    });

});

router.get('/info', (res, req) => {
    req.json({
        code: 200,
        data: {
            sname: "wq",
        }
    })
});
module.exports = router;