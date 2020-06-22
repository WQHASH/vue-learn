/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-17 17:37:24
 * @LastEditTime: 2020-06-22 12:57:06
 */
const getters = {
    filterCounts: (state, gettersRoot) => { return state.app.counts.filter((val) => val >= 3) },
    countsFilterLength: (state, gettersRoot) => { return state.app.counts.length },
    name: (state) => { return state.user.name },
    token: (state) => { return state.user.token },
}

export default getters;
