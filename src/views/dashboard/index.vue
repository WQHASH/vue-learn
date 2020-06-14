<!--
 * @Author: zhaodong
 * @Date: 2020-06-03 13:26:33
 * @LastEditTime: 2020-06-15 01:00:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yswb\src\views\home\home.vue
--> 
<template>
  <div class="dashboard">
    <el-container class="container">
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

export default {
  name: "dashboard",
  data() {
    return {
      num: 9,
      age: 11
    };
  },
  components: {},
  created() {
    console.log(this.$store, "$store");
    // console.log(this.$store.state.addRoutesData,"addRoutesData");

    // console.log(this.$store.getters.filterCounts,"getters");
    console.log(this.filterCounts, "getters");
    console.log(this.$store.getters.countsFilterLength, "getters");
  },
  computed: {
    counts() {
      return this.$store.state.counts;
    },
    ...mapState(["addRoutesData"]),
    // ...mapGetters({filterCounts: 'filterCounts'})
    ...mapGetters(["filterCounts"])
  },
  methods: {
    ...mapMutations(["increment"]),
    ...mapActions(["asyncIncrement"]),

    handleAddSync() {
      // this.$store.commit("increment", { num: ++this.num });
      // this.$store.commit({
      //   type: "increment",
      //   num: ++this.num,
      //   age: --this.age
      // });

      this.increment({ num: ++this.num, age: --this.age });
    },

    handleAddAsync() {
      // this.$store.dispatch('asyncIncrement', { num: this.num+=2 });
      this.asyncIncrement({ num: (this.num += 2) })
        .then(data => {
          console.log(data, "data");
        })
        .catch(err => {
          console.log(err, "err");
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
