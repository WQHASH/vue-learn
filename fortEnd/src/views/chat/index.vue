<!--
 * @Description: 聊天模块
 * @Author: wangqi
 * @Date: 2020-11-25 21:32:58
 * @LastEditTime: 2021-01-03 21:41:51
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

								<p class="msg-body" v-if="msg.msg">{{ msg.msg }}</p>
								<img :src="msg.img" v-else>
							</li>
						</ul>
					</el-main>
					<el-footer style="height:80px;">
						<div class="not-words-msg">
							<span @click="imgupload">
								<i class="el-icon-camera-solid"></i>
							</span>
							<span>
								<svg-icon icon-class="smile" class-name="active" />
							</span>
						</div>
						<div class="hide-area">
							<input id="inputFile" name="inputFile" type="file" @change="fileup" multiple="mutiple" accept="image/gif,image/jpeg,image/png,image/webp,image/jpg;capture=camera" />
						</div>

						<div class="msg-send-wrap">
							<el-input v-model="msg" clearable placeholder="请输入内容" class="msg-ipt"></el-input>
							<el-button class="msg-send" @click="sendMsg">发送消息</el-button>
						</div>
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
			userId: (state) => state.user.userId,
			roomInfo: (state) => state.message.roomInfo,
			roomDetail: (state) => state.message.roomDetail,
		}),
	},

	watch: {
		roomDetail: {
			deep: true,
			immediate: true,
			handler(newV, oldV) {
				// this.msgList = this.$store.state.message.roomDetail[
				// 	this.roomInfo.roomId
				// ];
				this.msgList = newV[this.roomInfo.roomId];
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
				img: val.img,
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

		/**
		 * @description: 文件上传点击
		 * @param {*}
		 * @return {*}
		 */
		imgupload() {
			const file = document.getElementById('inputFile');
			file.click();
		},

		/**
		 * @description: 文件上传
		 * @param {*}
		 * @return {*}
		 */
		async fileup() {
			const fileContext = document.getElementById('inputFile').files[0];
			// console.log(fileContext, '图片上传');
			if (!fileContext) {
				this.$message({
					message: '警告哦，这是一条警告消息',
					type: 'warning',
				});
				return;
			}

			let formData = new window.FormData();
			formData.append('file', fileContext);

			let fileReader = new window.FileReader();
			fileReader.readAsDataURL(fileContext);
			fileReader.onload = () => {
				let img = new Image();
				img.src = fileReader.result;
				img.onload = async () => {
					let obj = {
						username: this.username,
						src: '',
						msg: '',
						// img: `${fileReader.result}?width=${img.width}&height=${img.height}`,
						img: '',
						roomid: this.roomInfo.roomId,
						roomType: this.roomInfo.roomType,
						type: 'img',
						time: new Date(),
					};

					this.$store.commit('message/setRoomDetailAfter', {
						roomid: this.roomInfo.roomId,
						msgs: [obj],
					});

					// 接口的发送
					let imgurl = await this.$store.dispatch(
						'message/uploadImg',
						formData
					);
					// imgurl.code == 500另外处理
					// console.log(imgurl, 'imgurlxx');
					obj.img = `${imgurl.data}`;
					// 发送
					socket.emit('message', obj);
				};
			};
		},
	},

	components: {
		ChatAside,
	},
};
</script>

<style lang="scss">
.chat-module {
	width: 500px;
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
				img {
					width: 200px;
					height: 200px;
				}
			}

			.el-footer {
				.not-words-msg {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					span {
						margin: 5px 10px;
						font-size: 22px;
					}
				}
				.hide-area {
					display: none;
				}
				.msg-send-wrap {
					.msg-ipt {
						width: calc(100% - 100px);
					}
					.msg-send {
						height: 30px;
						position: relative;
						left: 2px;
						top: 1px;
					}
				}
			}
		}
	}
}
</style>
