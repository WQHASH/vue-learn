/*
 * @Description: 项目入口
 * @Author: wangqi
 * @Date: 2020-05-29 17:18:31
 * @LastEditTime: 2020-07-08 17:56:08
 */
import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

import router from './router'
import store from './store'

Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Vue.config.productionTip = false;
import './icons'
import '@/permission';
import '@/registerServiceWorker'

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
console.log(vm, "vm");
