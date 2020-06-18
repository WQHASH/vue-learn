/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-14 11:01:31
 * @LastEditTime: 2020-06-18 19:16:50
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'


Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);
// console.log(modulesFiles.resolve("./app.js"),"resolve");
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
