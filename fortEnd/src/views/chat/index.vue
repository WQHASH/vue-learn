<!--
 * @Description: 聊天模块
 * @Author: wangqi
 * @Date: 2020-11-25 21:32:58
 * @LastEditTime: 2021-01-26 00:27:16
-->
<template>
	<div class="chat-module">
		<el-container>
			<el-header class="msg-title">
				<el-card class="box-card"> 聊天模块1 </el-card>
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

								<p class="msg-text-body" v-if="msg.msg"> {{ msg.msg }} </p>
								<p class="msg-audio-body" v-else-if="msg.audio">
									<maudio :src="msg.audio"></maudio>
								</p>
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
								<i @click="startRecording()" class="el-icon-microphone"></i>
								<i @click="endRecording()" class="el-icon-microphone"></i>
							</span>
							<span>
								<svg-icon icon-class="play-recording" class-name="active" @click="playRecording()" />
							</span>

							<!-- <span class="recording-msg">
								<i class="recording-icon"></i>
								<em class="recording-time">3"</em>
							</span> -->

							<span>
								<maudio :src="recordingSrc"></maudio>
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
// import Recorderx, { ENCODE_TYPE } from 'recorderx';

// import Recorder from 'recorder-core'
// import 'recorder-core/src/engine/mp3'
// import 'recorder-core/src/engine/mp3-engine'

//以上三个也可以合并使用压缩好的recorder.xxx.min.js
import Recorder from 'recorder-core/recorder.mp3.min'; //已包含recorder-core和mp3格式支持

//可选的扩展支持项
import 'recorder-core/src/extensions/waveview';
import 'recorder-core/src/extensions/frequency.histogram.view';
import 'recorder-core/src/extensions/lib.fft';

import socket from '@/socket';
import { mapGetters, mapState } from 'vuex';
import { getToken } from '@/tools/auth';
import { getMsgHistory, uploadRecording } from '@/api/index';

import ChatAside from './ChatAside';
import Maudio from '@/components/Maudio';

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
			audioaccet: '',
			audioData: '你好啊，你是谁, hello man!',
			recordingSrc: '/api/public/files/audios/audio_202001252351.mp3', // '/api/static_temp/1611463223935-1611463223000.mp3',

			// recorder-core
			Recorder: Recorder,
			rec: undefined,
			wave: undefined,
			recBlob: undefined,
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
		// 检测当前环境是否支持麦克风权限
		// this.checkReaderAuthority(this.Recorder);

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
				audio: val.audio,
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
				img: '',
				audio: '',
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
			fileReader.onload = (...e) => {
				console.log(e);
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

					// 接口的发送
					let imgurl = await this.$store.dispatch(
						'message/uploadImg',
						formData
					);
					// imgurl.code == 500另外处理
					// console.log(imgurl, 'imgurlxx');
					obj.img = `${imgurl.data}?width=${img.width}&height=${img.height}`;
					// 发送
					socket.emit('message', obj);
				};
			};
		},

		/**
		 * @description: 检测当前环境是否支持麦克风权限
		 * @param {*}
		 * @return {*}
		 */
		async checkReaderAuthority(Recorder) {
			let newRec = Recorder({
				type: 'mp3',
				sampleRate: 16000,
				bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
				onProcess: function (
					buffers,
					powerLevel,
					bufferDuration,
					bufferSampleRate,
					newBufferIdx,
					asyncEnd
				) {
					//录音实时回调，大约1秒调用12次本回调
					// document.querySelector(".recpowerx").style.width = powerLevel + "%";
					// document.querySelector(".recpowert").innerText = bufferDuration + " / " + powerLevel;
					//可视化图形绘制
					// wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);
				},
			});
			//打开麦克风授权获得相关资源
			await newRec.open(
				() => {
					this.rec = newRec;
					this.wave = Recorder.FrequencyHistogramView({
						elem: '.recwave',
					});
					this.$message({
						message: '获取麦克风成功',
						type: 'sucess',
					});

					this.recBlob = null;
					this.rec.start();
				},
				(msg, isUserNotAllow) => {
					this.$message({ message: '打开录音失败', type: 'error' });
				}
			);
		},

		/**
		 * @description: 开始录音
		 * @param {*}
		 * @return {*}
		 */
		startRecording() {
			this.checkReaderAuthority(this.Recorder);
		},

		/**
		 * @description: 结束录音
		 * @param {*}
		 * @return {*}
		 */
		endRecording() {
			if (!(this.rec && this.Recorder.IsOpen())) {
				return;
			}
			this.rec.stop(
				async (blob, duration) => {
					this.recBlob = blob;
					// 上传录音
					let result = await this.uploadRecordinFile();
					// this.recordingSrc = (window.URL || webkitURL).createObjectURL(this.recBlob);
					this.recordingSrc = result.data.src;
					this.rec.close();

					let obj = {
						username: this.username,
						src: '',
						msg: '',
						img: '',
						audio: this.recordingSrc,
						roomid: this.roomInfo.roomId,
						roomType: this.roomInfo.roomType,
						type: 'img',
						time: new Date(),
					};
					socket.emit('message', obj);
				},
				(msg) => {
					this.rec.close();
				}
			);
		},

		/**
		 * @description: 录音文件上传
		 * @param {*}
		 * @return {*}
		 */
		async uploadRecordinFile() {
			let result;
			let params = {};
			let formData = new FormData();
			formData.append(
				'recordFile',
				this.recBlob,
				Date.parse(new Date()) + '.mp3'
			);
			formData.append('vo', JSON.stringify(params));
			// TODO : 需要使用vuex进行数据存储
			try {
				result = await uploadRecording(formData);
			} catch (error) {
				this.$message({
					message: '录音失败',
					type: 'error',
				});
			}
			return result;
		},

		/**
		 * @description: 播放录音
		 * @param {*}
		 * @return {*}
		 */
		playRecording() {
			if (!this.recBlob) {
				console.log('请先录音，然后停止后再播放');
				return;
			}
			let cls = ('a' + Math.random()).replace('.', '');
			// var audio = document.createElement("audio");
			// audio.controls = true;
			// document.querySelector("." + cls).appendChild(audio);
			//简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
			// audio.src = (window.URL || webkitURL).createObjectURL(recBlob);
			// audio.play();

			this.recordingSrc = (window.URL || webkitURL).createObjectURL(
				this.recBlob
			);
			console.log(this.recordingSrc, ' 播放-this.recordingSrc');
			// setTimeout(function () {
			// 	(window.URL || webkitURL).revokeObjectURL(audio.src);
			// }, 5000);
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
		Maudio,
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
				.msg-text-body {
					font-size: 18px;
					font-weight: 700;
					display: inline-block;
				}
				.msg-audio-body {
					margin: 10px;
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
