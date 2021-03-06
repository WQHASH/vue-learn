/*
 * @Description: 消息模块
 * @Author: wangqi
 * @Date: 2020-12-16 21:28:47
 * @LastEditTime: 2021-01-27 22:48:23
 */
import { getMsgHistory, uploadImg, uploadRecording } from '@/api';

const state = {
    roomInfo: {
        // 当前用户
        name: "",
        // 房间id
        roomId: "room1",
        // 房间类型
        roomType: "",
    },
    //存放聊天记录
    roomDetail: {
        // "room1": [],
        // "room2": [],
    }

}

const mutations = {
    setRoomInfo(state, info) {
        state.roomInfo.roomId = info.roomId;
        state.roomInfo.roomType = info.roomType;
    },

    setRoomDetailAfter(state, data) {
        const { roomid, msgs } = data;
        if (!state.roomDetail[roomid]) {
            state.roomDetail[roomid] = [];
        }
        state.roomDetail[roomid].push(...msgs);
    },

    setRoomDetailBefore(state, { roomid, data }) {
        // let list = state.roomDetail[roomid] || [];
        let list = [];
        let newData = data.concat(list);
        state.roomDetail = {
            ...(state.roomDetail),
            [roomid]: newData
        };
    },

    setRoomDetailInfos(state, msgHistory) {
        state.roomDetail.infos = msgHistory;
    }
}

const actions = {

    /**
     * @description: 获取消息历史记录
     * @param {*}
     * @return {*}
     */
    getMsgHistory(context, roomid) {
        return new Promise((resolve, reject) => {
            getMsgHistory(roomid).then((res) => {
                let { errno, data } = res;
                if (errno) { return reject("获取消息历史记录失败") };
                context.commit("setRoomDetailBefore", { roomid, data });

                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * @description: 图片上传
     * @param {*}
     * @return {*}
     */
    uploadImg(context, data) {
        return new Promise((resolve, reject) => {
            uploadImg(data).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err)
            })
        });
    },

    /**
     * @description: 录音文件上传
     * @param {*}
     * @return {*}
     */
    uploadRecording(context, data) {
        return new Promise((resolve, reject) => {
            uploadRecording(data).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err)
            })
        });
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
