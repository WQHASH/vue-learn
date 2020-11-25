/*
 * @Description: 项目入口
 * @Author: wangqi
 * @Date: 2020-05-29 17:18:31
 * @LastEditTime: 2020-11-26 00:06:06
 */
import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';

import './style/common.scss';
// import './style/scrollBar.scss';
// import './style/variables.scss';

import router from './router';
import store from './store';

import socket from './socket';

Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Vue.config.productionTip = false;
import './icons';
import '@/permission';
import '@/registerServiceWorker';

socket.on('connect', async () => {
  console.log('socket连接成功');
});

socket.on('message', (data) => {
  // console.log(data, "data")
})
socket.emit('message', { "sname": "wq12", });

// socket.on("disconnect", () => {
//   console.log('socket销毁'); // false
// });



const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
