/*
 * @Description: 注册全局 SvgIcon组件
 * @Author: wangqi
 * @Date: 2020-06-26 18:30:54
 * @LastEditTime: 2020-06-27 11:22:39
 */

import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon';

Vue.component('svg-icon', SvgIcon);

const req = require.context("./svg", false, /\.svg$/);

const requireAll = (req) => {
    // modulePath: "./a.svg"
    return req.keys().map((modulePath, index) => {
        // let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
        let value = req(modulePath);
        return value.default;
    });
};

// 引入svg
requireAll(req);


// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

