<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-11-23 23:35:42
 * @LastEditTime: 2020-11-23 23:56:40
-->


<style lang="scss">
.dashboard {
  height: 100%;

  .container {
    display: block !important;
    height: 100%;

    .shadow-wrap {
      margin: 20px;

      .demo-shadow {
        height: 50px;
        width: 50%;
        border: 1px solid #eee;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px,
          rgba(0, 0, 0, 0.04) 0px 0px 6px;
      }

      .el-input { 
        display: block;
        width: 30%;
      }
    }
  }
}
</style>

<template>
  <div class="dashboard">
    <el-container class="container"> chat </el-container>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>
