/*
 * @Description: 项目入口
 * @Author: wangqi
 * @Date: 2020-05-29 17:18:31
 * @LastEditTime: 2020-06-22 23:35:47
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

import '@/permission';
import '@/registerServiceWorker'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')