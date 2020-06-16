<!--
 * @Description: 课程管理
 * @Author: wangqi
 * @Date: 2020-06-05 16:29:37
 * @LastEditTime: 2020-06-16 20:58:45
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
    getRoby()
      .then(data => {
        console.log(data, "data");
      })
      .catch(err => {
        console.log(err, "err");
      });

    // -----------------------
    let obj = {
      "0.4": {
        sorting: "4"
      },
      "0.6": {
        sorting: "6"
      },
      "0.07": {
        sorting: "1"
      },
      "0.003": {
        sorting: "3"
      }
    };

    for (let key in obj) {
      for (let k in obj) {
        if (obj[key]['sorting'] > obj[k]['sorting']) {
          var temp = obj[key];
          obj[key] = obj[k];
          obj[k] = temp;
        }
      }

    }

  console.log(obj,"obj")

  },

  beforeRouteUpdate(to, from, next) {
    console.log(to, "to");
    console.log(from, "from");
  }
};
</script>
