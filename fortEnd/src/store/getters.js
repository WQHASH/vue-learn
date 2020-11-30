/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-17 17:37:24
 * @LastEditTime: 2020-11-30 17:50:32
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

    // 聊天历史记录
    roomdetail: state => state.user.roomdetail,

    permissionRoutes: (state) => { return state.permission.routes },
    // topology
    topologyDiagram: state => state.topology.topologyDiagram,
   

}

export default getters;
