/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-17 17:37:24
 * @LastEditTime: 2020-06-17 19:24:26
 */
const getters = {
    filterCounts: (state, gettersRoot) => { return state.app.counts.filter((val) => val >= 3) },
    countsFilterLength: (state, gettersRoot) => { return state.app.counts.length },
}

export default getters;
