<!--
 * @Description: 主页面
 * @Author: wangqi
 * @Date: 2020-06-04 13:24:25
 * @LastEditTime: 2020-07-08 16:28:02
--> 

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      padding: 0px;
    }
    .el-main {
      width: 100%;
      height: 100%;
      padding: 10px;
    }
  }
}
</style>

<template>
  <div class="layout">
    <el-container>
      <el-header>
        <header-nav></header-nav>
      </el-header>

      <el-main>
        <router-view :key="key"></router-view>
      </el-main>

      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import HeaderNav from "./header";
import Footer from "./footer";
export default {
  name: "layout",
  data() {
    return {
      gg:"xx",
    };
  },
  computed: {
    key() {
      return this.$route.fullpath;
    }
  },
  components: {
    HeaderNav,
    Footer
  }
};
</script>
