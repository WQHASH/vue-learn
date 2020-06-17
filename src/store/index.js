/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-14 11:01:31
 * @LastEditTime: 2020-06-17 17:40:00
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';


Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default
  return modules
}, {});


export default new Vuex.Store({
  getters,
  modules: modules
})
