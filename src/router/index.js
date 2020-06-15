/*
 * @Description: 路由配置
 * @Author: wangqi
 * @Date: 2020-05-29 17:18:31
 * @LastEditTime: 2020-06-15 17:23:39
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { commonRoutes, asyncRoutes } from './routers'

// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

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
  routes: commonRoutes,
});

const router = createRouter();


export default router
