/*
 * @Description: 文件操作
 * @Author: wangqi
 * @Date: 2020-12-24 10:51:59
 * @LastEditors: from -> wq
 * @LastEditTime: 2021-01-03 21:46:47
 */

const fse = require('fs-extra');
const path = require('path');

/**
 * @description: 删除指定文件
 * @param {String} dir 文件夹路径
 * @return {*}
 */
let rmDirFiles = dir => {
    let files = fse.readdirSync(dir);
    files.map(file => {
        let filePath = path.join(dir, file);
        fse.removeSync(filePath);
    });
};

module.exports = {
    rmDirFiles
};