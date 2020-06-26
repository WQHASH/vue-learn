/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-17 17:37:24
 * @LastEditTime: 2020-06-26 14:55:04
 */
const getters = {
    filterCounts: (state, gettersRoot) => { return state.app.counts.filter((val) => val >= 3) },
    countsFilterLength: (state, gettersRoot) => { return state.app.counts.length },
    // user
    token: (state) => { return state.user.token },
    roles: (state) => { return state.user.roles },
    name: (state) => { return state.user.name },
    avatar: (state) => { return state.user.avatar },
    introduction: (state) => { return state.user.introduction },
    permissionRoutes: (state) => { return state.permission.routes },

}

export default getters;
