/*
 * @Description: 获取消息
 * @Author: wangqi
 * @Date: 2020-11-27 22:42:38
 * @LastEditTime: 2021-01-24 12:53:47
 */
const express = require('express');
const path = require('path');
const fse = require('fs-extra');
const { rmDirFiles } = require('../utils/cmd');
const multer = require('multer');
const Message = require('../models/message');
const router = express.Router();

const urlPath = './public/files';

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
    // fileFilter,
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
router.post('/uploadImg', upload.single('file'), function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    let file = req.file;
    if (file) {
        let img;
        let { filename, size, path: localPath } = file;
        let staticUrl = path.join('./static_temp', filename);
        if (process.env.NODE_ENV === 'production') {
            global.logger.info('生产环境下');
        } else {
            fse.copySync('./static_temp', urlPath);
            img = path.join(urlPath, filename);
            img = `/api/` + img.split(path.sep).join('/');
            rmDirFiles('./static_temp');
        }
        res.json({
            errno: 0,
            data: img,
            msg: "上传成功!"
        });
    } else {
        res.json({
            errno: 500,
            msg: '上传文件失败!'
        });
    }


});

// 上传录音文件
router.post('/uploadRecording', upload.single('recordFile'), function (req, res, next) {
    let resFilePath =  req.file.path;
    resFilePath = `/api/` + resFilePath.split(path.sep).join('/');
    res.json({
        errno: 0,
        data: {
            src: resFilePath,
        },
    })
});

module.exports = router;


