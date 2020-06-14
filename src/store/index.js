/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-14 11:01:31
 * @LastEditTime: 2020-06-15 01:04:57
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counts: [1, 2, 3, 4, 5, 6, 7, 8],
    addRoutesData: { "sname": "wq" },
  },

  getters: {
    filterCounts(state, getters) {
      return state.counts.filter((val) => val >= 3);
    },
    countsFilterLength(state, getters) {
      return getters.filterCounts.length;
    },
  },

  // 必须是同步操作
  mutations: {
    increment(state, payload) {
      console.log(payload, "payload")
      state.counts.push(payload.num);
    }
  },

  // 可存在异步操作
  actions: {
    asyncIncrement(context, payload) {
      console.log(context, "context")
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('increment', payload);
          resolve("ok");
        }, 1000);

      })
    },
  },

  modules: {

  }

})
