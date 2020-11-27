<!--
 * @Description: 聊天模块
 * @Author: wangqi
 * @Date: 2020-11-25 21:32:58
 * @LastEditTime: 2020-11-27 23:28:12
-->
<template>
  <div class="chat-module">
    <el-container>
      <el-header class="msg-title">聊天模块1</el-header>
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
      <el-footer>
        <el-input
          v-model="msg"
          clearable
          placeholder="请输入内容"
          class="msg-ipt"
        ></el-input>
        <el-button class="msg-send" @click="sendMsg">发送消息</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import socket from "../../socket";
import { getToken } from "@/tools/auth";
import { getMsgHistory } from "@/api/index";
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
    };
  },
  async mounted() {
    let userInfo = await this.$store.dispatch("user/getInfo");
    this.username = userInfo.name;
    let msgHistory = await getMsgHistory(this.username);
    let { data } = msgHistory;
    this.msgList = data.map((val) => {
      return { username: val.username, msg: val.msg };
    });
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
        msg: this.msg,
        time: new Date(),
      };
      this.msgList.push(msg);
      socket.emit("message", msg);
      this.msg = "";
    },
  },
};
</script>

<style lang="scss">
.chat-module {
  position: relative;

  .el-container {
    border: 1px solid;
    height: 80vh;
    width: 40vw;
    position: absolute;
    left: calc(50% - 20vw);
    top: 50px;

    .el-header {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
    }

    .el-main {
      height: 80vh;

      .msg-list {
        .username,
        .msg-body {
          font-size: 18px;
          font-weight: 700;
        }

        .msg-body {
          display: inline-block;
        }
      }
    }

    .el-footer {
      line-height: 60px;

      .msg-ipt {
        width: 60%;
      }

      .msg-send {
        margin-left: 5px;
      }
    }
  }
}
</style>
