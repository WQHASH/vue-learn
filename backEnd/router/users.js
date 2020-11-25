/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-11-08 23:08:27
 * @LastEditTime: 2020-11-26 00:05:30
 */

const jwt = require('jwt-simple');
const jwtConfig = require('../config/jwt');
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// 登录
router.post('/signin', (req, res) => {
    // 取参数
    // 从数据库中比较参数
    // 确定是否存在
    let { name, password, age } = req.body;

    User.findOne({ name: name }, (err, user) => {
        if (err) { throw Error }
        if (!user) {
            res.json({
                errno: 1,
                data: '用户名不存在'
            });
        } else {
            if (!!password) {
                user.comparePassword(password, (err, isMatch) => {
                    if (err) { global.logger.error(err) }
                    if (isMatch) {
                        let userInfo = {
                            name,
                            id: user.id
                        };
                        res.json({
                            errno: 0,
                            data: '登录成功',
                            user: userInfo,
                            token: jwt.encode(userInfo, jwtConfig.secret)
                        });
                    } else {
                        res.json({
                            errno: 1,
                            data: '密码不正确'
                        });
                        global.logger.info('密码不正确');
                    }
                });
            } else {
                res.json({
                    errno: 1,
                    data: '登录失败'
                })
            }
        }
    });


});

// 注册
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
        if (err) { throw Error }
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
                    id: user.id,
                    age: user.age
                };
                res.json({
                    errno: 0,
                    userInfo,
                    token: jwt.encode(userInfo, jwtConfig.secret),
                    data: '注册成功'
                });
            });
        }
    });

});

// 获取权限用户信息
router.get('/info', (req, res) => {
    let { token } = req.query;
    let userInfo = jwt.decode(token, jwtConfig.secret);
    userInfo['roles'] = ['admin'];
    userInfo['avatar'] = ['xxx'];
    userInfo['introduction'] = ['我是admin 呀'];

    res.json({
        code: 200,
        data: userInfo
        // data: {
        //     // admin || editor
        //     roles: ['admin'],
        //     introduction: '我是admin 呀',
        //     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //     name: "超级管理员",
        // }
    })
});
module.exports = router;