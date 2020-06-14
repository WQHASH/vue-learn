<!--
 * @Description: 课程管理
 * @Author: wangqi
 * @Date: 2020-06-05 16:29:37
 * @LastEditTime: 2020-06-08 13:03:24
--> 

<style lang="scss">
</style>

<template>
  <div class="course">
    <h3>coursecourse</h3>
  </div>
</template>
<script>
export default {
  created() {
    console.log(this.$route, "$route");
  },

  beforeRouteUpdate(to, from, next) {
    console.log(to, "to");
    console.log(from,"from");
  }
};
</script>
