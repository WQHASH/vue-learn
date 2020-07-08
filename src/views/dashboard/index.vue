<!--
 * @Author: zhaodong
 * @Date: 2020-06-03 13:26:33
 * @LastEditTime: 2020-07-08 17:56:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yswb\src\views\home\home.vue
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
    <el-container class="container">
      <Vcharts
        :styleConfig="lineChart.styleConfig"
        :option="lineChart.option"
      ></Vcharts>
      <h1>权限说明: {{name}}</h1>

      <h2>dashboard</h2>
      <h3>{{counts}}</h3>
      <h4>{{addRoutesData}}</h4>

      <el-button @click.native="handleAddSync">同步增量</el-button>
      <el-button @click.native="handleAddAsync">异步增量</el-button>

      <div class="shadow-wrap">
        <button @click="hanleClick">Button</button>
        <p>Using mustaches: {{ rawHtml }}</p>
        <p>
          Using v-html directive:
          <span v-html="rawHtml"></span>
        </p>
        <div
          class="demo-shadow"
          v-for="(item, index) in obj"
          :key="index"
        >{{item['sname']}}</div>
        <!-- <el-input v-model="sname" placeholder="请输入内容"></el-input> -->
      </div>
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
      obj: [{ sname: "xxxxx" }],
      bool: undefined,
      rawHtml: `<span style="color:red;">this is red</span>`,
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
    console.log(this, "this");
    // console.log(this.$store, "$store");
    this.addRoutesData = this.$store.state.app.addRoutesData;
    // console.log(this.$store.state.app.addRoutesData,"addRoutesData");

    // console.log(this.$store.getters.filterCounts,"getters-fun");
    // console.log(this.filterCounts, "getters");
    // console.log(this.$store.getters.countsFilterLength, "getters");
  },
  mounted() {
    this.obj[0] = { sname: "wnagqit呀~" };
    // this.obj[0]["sname"] = "wnagqit呀yayay 冲鸭~";
    // this.$set(this.obj, 0, { sname: "wnagqit呀~" })
  },
  computed: {
    counts() {
      return this.$store.state.app.counts;
    },
    // ...mapGetters({filterCounts: 'filterCounts'})
    ...mapGetters(["name", "filterCounts"])
  },
  methods: {
    /**
     * @description: 同步
     * @param {type}
     * @return:
     */
    handleAddSync() {
      // this.$store.commit("app/increment", { num: ++this.num });
      this.$store.commit({
        type: "app/increment",
        num: ++this.num,
        age: --this.age
      });
      this.sname = "wwww";
    },

    /**
     * @description: 异步
     * @param {type}
     * @return:
     */
    handleAddAsync() {
      this.$store
        .dispatch("app/asyncIncrement", {
          num: (this.num += 2)
        })
        .then(data => {
          console.log(data, "data-Async");
        });
    },

    hanleClick() {
      console.log("hanleClick");
      // this.$router.push({ path: this.$route.path, query: { t: +new Date() } });
        this.$router.go({ path: this.$route.path, force: true });
    }
  }
};
</script>


