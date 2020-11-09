/*
 * @Description: 用户schemas模型
 * @Author: wangqi
 * @Date: 2020-11-09 22:01:18
 * @LastEditTime: 2020-11-10 00:59:52
 */
const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');
const User = mongoose.model('User', UserSchema);

module.exports = User




