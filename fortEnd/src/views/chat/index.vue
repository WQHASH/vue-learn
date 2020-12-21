<!--
 * @Description: 聊天模块
 * @Author: wangqi
 * @Date: 2020-11-25 21:32:58
 * @LastEditTime: 2020-12-21 17:15:14
-->
<template>
	<div class="chat-module">
		<el-container>
			<el-header class="msg-title">
				<el-card class="box-card"> 聊天模块1</el-card>
			</el-header>

			<el-container class="msg-wrap">
				<el-aside width="200px">
					<chat-aside @subMsgList="recMsgList" />
				</el-aside>
				<el-container class="main-wrap">
					<el-main>
						<ul class="msg-list">
							<li class="msg" v-for="(msg, index) in msgList" :key="index">
								<span class="username">
									{{ msg.username ? ` ${msg.username}: ` : msg.username }}
								</span>
								<p class="msg-body">{{ msg.msg }}</p>
							</li>
						</ul>
					</el-main>
					<el-footer style="height: 40px; line-height: 40px">
						<el-input v-model="msg" clearable placeholder="请输入内容" class="msg-ipt"></el-input>
						<el-button class="msg-send" @click="sendMsg">发送消息</el-button>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import socket from '@/socket';
import { mapGetters, mapState } from 'vuex';
import { getToken } from '@/tools/auth';
import { getMsgHistory } from '@/api/index';

import ChatAside from './ChatAside';
export default {
	data() {
		return {
			//当前用户
			username: '',
			//输入框内容
			msg: '',
			//存储消息列表
			msgList: [
				{
					username: '',
					msg: undefined,
				},
			],
		};
	},
	computed: {
		...mapState({
			roomInfo: (state) => state.message.roomInfo,
			roomDetail: (state) => state.message.roomDetail,
		}),
	},

	watch: {
		roomDetail: {
			deep: true,
			immediate: true,
			handler(newV, oldV) {
				this.msgList = this.$store.state.message.roomDetail[
					this.roomInfo.roomId
				];
			},
		},
	},
	async mounted() {
		let userInfo = await this.$store.dispatch('user/getInfo');
		this.username = userInfo.name;
		// 获取用户聊天记录
		let msgHistory = await this.$store.dispatch(
			'message/getMsgHistory',
			this.roomInfo.roomId
		);

		this.msgList = msgHistory.map((val) => {
			return {
				username: val.username,
				msg: val.msg,
				roomid: this.roomInfo.roomId,
			};
		});

		// this.$store.commit('message/setRoomDetailAfter', {
		// 	roomid: this.roomInfo.roomId,
		// 	msgs: this.msgList,
		// });
	},
	methods: {
		/**
		 * @description: 发送消息
		 * @param {*}
		 * @return {*}
		 */
		sendMsg() {
			let msg = {
				username: this.username,
				src: '',
				msg: this.msg,
				roomid: this.roomInfo.roomId,
				roomType: this.roomInfo.roomType,
				type: 'text',
				time: new Date(),
			};
			socket.emit('message', msg);
			this.msg = '';
		},

		/**
		 * @description: 接收侧栏子组件发送的消息数据
		 * @param {Object} data	子组件发送的消息数据	{msg:"", username:""}
		 * @return {*}
		 */
		recMsgList(data) {
			this.msgList = data;
		},
	},

	components: {
		ChatAside,
	},
};
</script>

<style lang="scss">
.chat-module {
	width: 1000px;
	border: 1px solid;
	margin: auto;

	.el-header {
		padding: 0px;
		text-align: center;
		margin-bottom: 10px;
	}

	.msg-wrap {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

		.el-aside {
			border: 1px solid #dadada;
		}

		.main-wrap {
			height: 600px;
			border: 1px solid #dadada;

			.msg-list {
				.username,
				.msg-body {
					font-size: 18px;
					font-weight: 700;
					display: inline-block;
				}
			}

			.el-footer {
				display: flex;

				.msg-send {
					height: 30px;
					position: relative;
					top: 5px;
				}
			}
		}
	}
}
</style>
