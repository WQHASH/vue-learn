<!--
 * @Author: zhaodong
 * @Date: 2020-06-03 13:26:33
 * @LastEditTime: 2020-06-14 11:07:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yswb\src\views\home\home.vue
--> 
<template>
  <div class="dashboard">
    <el-container class="container">
      <h1>dashboard</h1>
      <h1>dashboard</h1>
      <h1>dashboard</h1>
    </el-container>
  </div>
</template>

<script>
import { getRoby, getPost, api_login } from "@/api";

export default {
  name: "dashboard",
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {
  }
};
</script>

<style lang="scss">
.dashboard {
  height: 100%;
}

.container {
  display: block !important;
  height: 100%;
}

.main_wrap {
  background-color: #e9eef3;
  color: #333;
  height: calc(100% - 121px);
  overflow-y: auto;
}
</style>
