/*
 * @Description: 文件操作
 * @Author: wangqi
 * @Date: 2020-12-24 10:51:59
 * @LastEditors: your name
 * @LastEditTime: 2020-12-24 10:59:33
 */

const fse = require('fs-extra');
const path = require('path');

/**
 * @description: 删除指定文件
 * @param {String} dir 文件夹路径
 * @return {*}
 */
let rmDirFiles = dir => {
    let files = fs.readdirSync(dir);
    files.map(file => {
        let filePath = path.join(dir, file);
        console.log(filePath, "filePath");
        fse.removeSync(filePath);
    });
};

module.exports = {
    rmDirFiles
};