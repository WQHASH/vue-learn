<!--
 * @Author: zhaodong
 * @Date: 2020-06-03 13:26:33
 * @LastEditTime: 2020-06-17 20:28:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yswb\src\views\home\home.vue
--> 
<template>
  <div class="dashboard">
    <el-container class="container">
      <Vcharts
        :styleConfig="lineChart.styleConfig"
        :option="lineChart.option"
      ></Vcharts>
      <h1>dashboard</h1>
      <h1>dashboard</h1>
      <h1>{{counts}}</h1>
      <h2>{{addRoutesData}}</h2>

      <el-button @click.native="handleAddSync">同步增量</el-button>
      <el-button @click.native="handleAddAsync">异步增量</el-button>
    </el-container>
  </div>
</template>

<script>
import { getRoby, getPost, api_login } from "@/api";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import Vcharts from "@/components/Vcharts";

export default {
  name: "dashboard",
  data() {
    return {
      num: 9,
      age: 11,
      addRoutesData: undefined,
      lineChart: {
        styleConfig: {
          id: "line-chart",
          width: "50%",
          height: "300px"
        },
        option: {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }
      }
    };
  },
  components: {
    Vcharts
  },
  created() {
    console.log(this.$store, "$store");
    this.addRoutesData = this.$store.state.app.addRoutesData;
    // console.log(this.$store.state.app.addRoutesData,"addRoutesData");

    // console.log(this.$store.getters.filterCounts,"getters-fun");
    console.log(this.filterCounts, "getters");
    // console.log(this.$store.getters.countsFilterLength, "getters");
  },
  computed: {
    counts() {
      return this.$store.state.app.counts;
    },
    // ...mapGetters({filterCounts: 'filterCounts'})
    ...mapGetters(["filterCounts"])
  },
  methods: {
    handleAddSync() {
      // this.$store.commit("app/increment", { num: ++this.num });
      this.$store.commit({
        type: "app/increment",
        num: ++this.num,
        age: --this.age
      });
    },

    handleAddAsync() {
      this.$store
        .dispatch("app/asyncIncrement", {
          num: (this.num += 2)
        })
        .then(data => {
          console.log(data, "data-Async");
        });
    }
    
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
