/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-03 12:53:26
 * @LastEditTime: 2020-06-21 16:11:19
 */
const Mock = require('mockjs');
const user = require("./user");

Mock.mock('/getMockData', 'post', {
    'list|1-10': [{
        'id|+1': 1
    }]
});

Mock.mock('/api/dataInfo', 'post', {
    "user|20-30": [{                              //2-5组数据
        'name': '@cname',                       //中文名称
        'age|1-100': 100,                       //100以内随机整数
        'startTime': '@date("yyyy-MM-dd HH:mm:ss")', //Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),      //日期
        'city': '@city(true)'                   //中国城市
    }]
})

const mocks = [
    ...user
];

module.exports = {
    mocks
}