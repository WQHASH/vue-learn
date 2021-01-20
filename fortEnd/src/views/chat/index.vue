<!--
 * @Description: 聊天模块
 * @Author: wangqi
 * @Date: 2020-11-25 21:32:58
 * @LastEditTime: 2021-01-20 11:14:17
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
								<img :src="msg.img" v-else />
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
							<span>
								<i @click="startRecording(rc)" class="el-icon-microphone"></i>
								<i @click="endRecording(rc)" class="el-icon-microphone"></i>
							</span>
							<span>
								<svg-icon icon-class="play-recording" class-name="active" @click="playRecording(rc)" />
							</span>

							<span class="recording-msg">
								<i class="recording-icon"></i>
								<em class="recording-time">3"</em>
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
import Recorderx, { ENCODE_TYPE } from "recorderx";
import socket from "@/socket";
import { mapGetters, mapState } from "vuex";
import { getToken } from "@/tools/auth";
import { getMsgHistory, uploadRecording } from "@/api/index";

import ChatAside from "./ChatAside";

export default {
	data() {
		return {
			//当前用户
			username: "",
			//输入框内容
			msg: "",
			//存储消息列表
			msgList: [
				{
					username: "",
					msg: undefined,
				},
			],
			rc: new Recorderx(),
			audioaccet: "",
			audioData: "你好啊，你是谁, hello man!",
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
		// const rc = new Recorderx();
		// 检测当前环境是否支持麦克风权限
		let havAuthority = await this.checkReaderAuthority(this.rc);

		let userInfo = await this.$store.dispatch("user/getInfo");
		this.username = userInfo.name;
		// 获取用户聊天记录
		let msgHistory = await this.$store.dispatch(
			"message/getMsgHistory",
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
				src: "",
				msg: this.msg,
				img: "",
				roomid: this.roomInfo.roomId,
				roomType: this.roomInfo.roomType,
				type: "text",
				time: new Date(),
			};
			socket.emit("message", msg);
			this.msg = "";
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
			const file = document.getElementById("inputFile");
			file.click();
		},

		/**
		 * @description: 文件上传
		 * @param {*}
		 * @return {*}
		 */
		async fileup() {
			const fileContext = document.getElementById("inputFile").files[0];
			if (!fileContext) {
				this.$message({
					message: "警告哦，这是一条警告消息",
					type: "warning",
				});
				return;
			}

			let formData = new window.FormData();
			formData.append("file", fileContext);

			let fileReader = new window.FileReader();
			fileReader.readAsDataURL(fileContext);
			fileReader.onload = (...e) => {
				console.log(e);
				let img = new Image();
				img.src = fileReader.result;
				img.onload = async () => {
					let obj = {
						username: this.username,
						src: "",
						msg: "",
						// img: `${fileReader.result}?width=${img.width}&height=${img.height}`,
						img: "",
						roomid: this.roomInfo.roomId,
						roomType: this.roomInfo.roomType,
						type: "img",
						time: new Date(),
					};

					// 接口的发送
					let imgurl = await this.$store.dispatch(
						"message/uploadImg",
						formData
					);
					// imgurl.code == 500另外处理
					// console.log(imgurl, 'imgurlxx');
					obj.img = `${imgurl.data}?width=${img.width}&height=${img.height}`;
					// 发送
					socket.emit("message", obj);
				};
			};
		},

		/**
		 * @description: 检测当前环境是否支持麦克风权限
		 * @param {*}
		 * @return {*}
		 */
		// async checkReaderAuthority(rc) {
		// 	let MediaStream = await rc.start();
		// 	if (MediaStream.active) {
		// 		rc.pause();
		// 		rc.clear();
		// 		// this.audioaccet = true
		// 		this.$message({
		// 			message: '获取麦克风成功',
		// 			type: 'sucess',
		// 		});
		// 	} else {
		// 		this.$message({
		// 			message: '获取麦克风失败',
		// 			type: 'warning',
		// 		});
		// 		console.log('Recording failed.');
		// 	}

		// 	return MediaStream.active;
		// },

		/**
		 * @description: 检测当前环境是否支持麦克风权限
		 * @param {*}
		 * @return {*}
		 */
		checkReaderAuthority(rc) {
			return new Promise((resolve, reject) => {
				rc.start()
					.then((MediaStream) => {
						rc.pause();
						rc.clear();
						// this.audioaccet = true
						this.$message({
							message: "获取麦克风成功",
							type: "sucess",
						});
						resolve(MediaStream);
					})
					.catch((error) => {
						this.$message({
							message: "获取麦克风失败",
							type: "warning",
						});
						reject(error);
					});
			});

			return MediaStream.active;
		},

		/**
		 * @description: 开始录音
		 * @param {*}
		 * @return {*}
		 */
		startRecording(rc) {
			console.log(rc, "rc");
			rc.start()
				.then(() => {
					console.log("start recording");
				})
				.catch((error) => {
					console.log("Recording failed.", error);
				});
		},

		/**
		 * @description: 结束录音
		 * @param {*}
		 * @return {*}
		 */
		endRecording(rc) {
			// this.statusaudio = true;
			rc.pause();

			// 上传录音
			let wav = rc.getRecord({
				encodeTo: ENCODE_TYPE.WAV,
				compressible: true,
			});
			let params = {};
			let formData = new FormData();
			formData.append("recordFile", wav, Date.parse(new Date()) + ".wav");
			formData.append("vo", JSON.stringify(params));
			uploadRecording(formData)
				.then((data) => {
					console.log(data, "data");
					rc.clear();
					// if (data.data.code == 1) rc.clear();
					// this.statusaudio = false;
				})
				.catch((err) => {
					console.log(err);
				});
		},

		/**
		 * @description: 播放录音
		 * @param {*}
		 * @return {*}
		 */
		playRecording(rc) {
			let wav = rc.getRecord({
				encodeTo: ENCODE_TYPE.WAV,
				compressible: true,
			});
			console.log(wav, "wav");
			console.log(URL.createObjectURL(wav), "url");
			rc.clear();
			// document.getElementById('audio').src = URL.createObjectURL(wav);
		},

		/**
		 * @description: 读取音频Test
		 * @param {*}
		 * @return {*}
		 */
		recordingTest() {
			let readWords = this.audioData; //获取播报的文字（除去样式）
			var url = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text='encodeURI('${readWords}')`;
			var n = new Audio(url);
			n.src = url;
			n.play(); //播放阅读
			//  n.cancel();  //取消阅读
			//  n.pause();  //暂停阅读
		},
	},

	components: {
		ChatAside,
	},
};
</script>

<style lang="scss">
.chat-module {
	// width: 500px;
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

					.recording-msg {
						display: flex;
						align-items: center;
						width: 100px;
						height: 30px;
						line-height: 30px;
						padding: 0 4px;
						cursor: pointer;
						background: rgba(255, 255, 255, 1);
						box-shadow: 1px 1px 4px 2px rgba(215, 215, 215, 0.5);
						border-radius: 16px;

						.recording-icon {
							width: 32px;
							height: 32px;
							display: inline-block;
							margin: 0px 8px 0px 4px;
							background: url('~@/assets/images/chat/icon-shengyin.png')
								center center no-repeat;
						}

						.recording-time {
							display: inline-block;
							height: 32px;
							line-height: 32px;
							font-size: 16px;
						}
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
