/*
 * @Description: 获取消息
 * @Author: wangqi
 * @Date: 2020-11-27 22:42:38
 * @LastEditTime: 2020-12-22 17:36:03
 */

const express = require('express');
const Message = require('../models/message');
const router = express.Router();

// 获取当前房间历史消息
router.get('/history', (req, res) => {
    let { roomid } = req.query;
    Message.find({ roomid }, (err, data) => {
        if (err) { throw Error }
        res.json({
            errno: 0,
            data: data
        });
    });
});

// 上传文件
router.post('/uploadImg', (req, res) => {
    res.json({
        errno: 0,
        data: { "name": "wq" }
    })
});

module.exports = router;


