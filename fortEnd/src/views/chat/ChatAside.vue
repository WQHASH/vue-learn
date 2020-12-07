<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-12-07 21:43:00
 * @LastEditTime: 2020-12-07 23:36:21
-->
<template>
  <div class="chat-aside">
    <ul class="chat-list">
      <li v-for="(item, index) in friendList" :key="index" class="list-info">
        <img :src="imgUrl" alt="" class="user-portrait" />
        <span class="user-name">{{ item.name }}</span>
      </li>
    </ul>
    <div class="chat-add">
      <p><i class="el-icon-plus"></i></p>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/images/chat/user.png";
export default {
  name: "ChatAside",
  data() {
    return {
      msg: "群聊",
      imgUrl: imgUrl,
      friendList: [
        {
          id: "123",
          name: "wq1",
        },
        {
          id: "456",
          name: "wq2",
        },
      ],
    };
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
