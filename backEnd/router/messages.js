/*
 * @Description: 获取消息
 * @Author: wangqi
 * @Date: 2020-11-27 22:42:38
 * @LastEditTime: 2020-12-24 12:37:09
 */
const express = require('express');
const path = require('path');
const fse = require('fs-extra');
const { rmDirFiles } = require('../utils/cmd');
const multer = require('multer');
const Message = require('../models/message');
const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static_temp')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

/**
 * @description: 限制文件上传
 * @param {Object} req  请求对象
 * @param {Object} file 上传的文件
 * @param {Function} cb 回调函数
 * @return {*}
 */
function fileFilter(req, file, cb) {
    let fileType = file.mimetype.toLocaleLowerCase();
    if (fileType == 'image/jpg' || fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/gif' || fileType == 'image/webp') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

// 文件上传
let upload = multer({
    storage,
    fileFilter,
    limits: {
        fields: 10,
        files: 10,
        fileSize: 4 * 1024 * 1024,
    }
});


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
router.post('/uploadImgs', (req, res) => {
    res.json({
        errno: 0,
        data: { "name": "wq" }
    })
});


router.post('/uploadImg', upload.single('file'), function (req, res, next) {
    global.logger.info(req, "req111");
    global.logger.info(res, "res222");
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    res.json({
        errno: 0,
        data: { "name": "wq" }
    })
})

module.exports = router;


