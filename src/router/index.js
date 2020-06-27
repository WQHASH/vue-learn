/*
 * @Description: 路由配置
 * @Author: wangqi
 * @Date: 2020-05-29 17:18:31
 * @LastEditTime: 2020-06-27 20:29:07
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { commonRoutes, asyncRoutes } from './routers'
Vue.use(VueRouter);

const routerMethods = ['push', 'replace']
routerMethods.forEach(method => {
  const originalCall = VueRouter.prototype[method]
  VueRouter.prototype[method] = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject)
    }
    return originalCall.call(this, location).catch(err => err)
  }
})

const createRouter = () => new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  // 检查点击浏览器“前进/后退”按钮时，页面滚动条记录上一次的位置
  scrollBehavior: (to, from, savePosition) => {
    return { y: 0 }
  },
  routes: commonRoutes,
});

const router = createRouter();

// 重置路由
function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
};

export { resetRouter, asyncRoutes }
export default router
