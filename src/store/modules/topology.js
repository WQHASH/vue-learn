/*
 * @Description: 拓扑图数据
 * @Author: wangqi
 * @Date: 2020-07-06 21:42:44
 * @LastEditTime: 2020-07-06 22:03:46
 */
const state = {
    topologyDiagram: {},
};
const mutations = {
    SET_TOPOLOGYDATA(state, data) {
        state.topologyDiagram = data;
    },
};
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}