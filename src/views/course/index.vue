<!--
 * @Description: 课程管理
 * @Author: wangqi
 * @Date: 2020-06-05 16:29:37
 * @LastEditTime: 2020-06-17 14:13:10
--> 

<style lang="scss">
</style>

<template>
  <div class="course">
    <h3>coursecourse</h3>
  </div>
</template>

<script>
import { getRoby } from "@/api";
export default {
  created() {
    // getRoby()
    //   .then(data => {
    //     console.log(data, "data");
    //   })
    //   .catch(err => {
    //     console.log(err, "err");
    //   });
    

  },

  beforeRouteUpdate(to, from, next) {
    console.log(to, "to");
    console.log(from, "from");
  }
};
</script>
