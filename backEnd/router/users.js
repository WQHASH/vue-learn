/*
 * @Description: 用户信息
 * @Author: wangqi
 * @Date: 2020-11-08 23:08:27
 * @LastEditTime: 2020-11-08 23:16:50
 */
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