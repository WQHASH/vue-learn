<!--
 * @Description: echarts图 
 * @Author: wangqi
 * @Date: 2020-01-10 16:25:49
 * @LastEditTime: 2020-06-15 13:14:13
 -->

<template>
  <div :id="styleConfig.id" :style="{width:styleConfig.width, height:styleConfig.height}"></div>
</template>

<script>
  import * as echarts from "echarts";
  export default {
    props: {
      option: {
        type: Object,
        default: () => ({})
      },
      styleConfig: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        width: "100%",
        height: "300px",
        // 图表容器
        charts: {}
      };
    },
    watch: {
      option: {
        deep: true,
        handler(newName, oldName) {
          this.initChart();
        }
      }
    },
    mounted() {
      this.initChart();
    },

    methods: {
      /**
       * @description: 初始化图表
       * @param {type}
       * @return:
       */
      initChart() {
        this.$nextTick(() => {
          this.charts[this.styleConfig.id] = echarts.init(
            document.getElementById(this.styleConfig.id)
          );
          this.charts[this.styleConfig.id].setOption(this.option);
          window.addEventListener("resize", this.resize);
        });
      },

      /**
       * @description: 窗口改变相应
       * @param {type}
       * @return:
       */
      resize() {
        for (let [key, value] of Object.entries(this.charts)) {
          value.resize();
        }
      },

      /**
       * @description: 销毁
       * @param {type}
       * @return:
       */
      dispose() {
        for (let [key, value] of Object.entries(this.charts)) {
          if (!key) {
            return;
          }
          value.dispose();
          value = null;
        }
      }
    },

    beforeDestroy() {}
  };
</script>