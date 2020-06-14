<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-01 18:13:03
 * @LastEditTime: 2020-06-01 18:20:49
--> 
<template>
  <div class="error-page">
    <img
      :src=imgSrc
      alt=""
    >
  </div>
</template>
<script>
let errImg = require("@/assets/images/login/404.jpg");

console.log(errImg);
export default {
  data() {
    return {
      // 404页面图片
      imgSrc: errImg
    };
  }
};
</script>
<style lang="less" scope>
</style>
