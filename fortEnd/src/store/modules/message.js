/*
 * @Description: 消息模块
 * @Author: wangqi
 * @Date: 2020-12-16 21:28:47
 * @LastEditTime: 2020-12-16 23:26:01
 */

const state = {
    roomInfo: {
        // 当前用户
        name: "",
        // 房间id
        roomId: "room1",
        // 房间类型
        roomType: "",
    }

}

const mutations = {
    setRoomInfo(state, info) {
        state.roomInfo.roomId = info.roomId;
        state.roomInfo.roomType = info.roomType;
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
