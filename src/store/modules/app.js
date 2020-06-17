/*
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-17 15:43:08
 * @LastEditTime: 2020-06-17 17:36:59
 */
const state = {
    counts: [1, 2, 3, 4, 5, 6, 7, 8],
    addRoutesData: { "sname": "wq" },
};
const mutations = {
    increment(state, payload) {
        console.log(payload, "payload")
        state.counts.push(payload.num);
    }
}
const actions = {
    asyncIncrement(context, payload) {
        console.log(context, "context")
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                context.commit('increment', payload);
                resolve("ok");
            }, 1000);

        })
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};