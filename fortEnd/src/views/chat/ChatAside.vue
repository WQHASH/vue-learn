<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-12-07 21:43:00
 * @LastEditTime: 2021-01-26 00:07:30
-->
<template>
	<div class="chat-aside">
		<ul class="chat-list">
			<li v-for="(item, index) in friendList" :key="index" @click="enterRoom(item)" class="list-info">
				<img :src="imgs['imgUrl']" alt="" class="user-portrait" />
				<span class="user-name">{{ item.name }}</span>
			</li>
		</ul>
		<div class="chat-add">
			<p><i class="el-icon-plus"></i></p>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import socket from '@/socket';
export default {
	name: 'ChatAside',
	data() {
		return {
			msg: '群聊',
			imgs: {
				imgUrl: 'user.png',
			},
			friendList: [
				{
					roomid: 'room1',
					name: '群聊1',
				},
				{
					roomid: 'room2',
					name: '群聊2',
				},
			],
			//存储消息列表
			msgList: [
				{
					username: '',
					msg: undefined,
				},
			],
		};
	},
	mounted() {
		//  批量引入图片
		this.introduceImgs();
	},
	created() {},
	computed: {
		...mapState({
			name: (state) => state.user.name,
			roomInfo: (state) => state.message.roomInfo,
			roomDetail: (state) => state.message.roomDetail,
		}),
	},
	methods: {
		/**
		 * @description: 进入房间列表
		 * @param {*}
		 * @return {*}
		 */
		async enterRoom(item) {
			let type = item.roomid.includes('&') ? 'single' : 'group';
			let roomInfo = {
				name: this.name,
				roomId: item.roomid,
				roomType: type,
			};
			this.$store.commit('message/setRoomInfo', roomInfo);
			// 进入房间
			socket.emit('room', { name: this.name, roomid: item.roomid });

			// 切换用户聊天记录
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

			//向父组件中传递数据
			this.$emit('subMsgList', this.msgList);
		},

		/**
		 * @description: 批量引入图片
		 * @param {*}
		 * @return {*}
		 */
		introduceImgs() {
			for (let [key, val] of Object.entries(this.imgs)) {
				this.imgs[key] = require(`@/assets/images/chat/${val}`);
			}
		},
	},
};
</script>

<style lang="scss">
.chat-aside {
	position: relative;
	height: 100%;

	.chat-list {
		max-height: 560px;
		overflow: auto;

		.list-info {
			height: 60px;
			line-height: 60px;
			display: flex;

			&:hover {
				cursor: pointer;
				background: #e9f4fd;
			}

			.user-portrait {
				width: 38px;
				height: 38px;
				margin: 5px;
				border-radius: 5px;
			}

			.user-name {
				margin: 0px 4px;
			}
		}
	}

	.chat-add {
		text-align: center;
		position: absolute;
		bottom: 0px;
		width: 100%;
		border-top: 1px solid #dadada;
		cursor: pointer;

		p {
			text-align: center;

			.el-icon-plus {
				font-size: 28px;
				font-weight: 700;
				color: #279bf1;
			}
		}
	}
}
</style>
