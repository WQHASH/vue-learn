<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-07-06 14:38:02
 * @LastEditTime: 2020-07-08 16:30:32
--> 
<style lang="scss" scoped>
.topologyNavBar {
  .el-row {
    margin: 10px 0px;
    text-align: right;
  }
}
</style>
<template>
  <div class="topologyNavBar">
    <el-row>
      <el-button @click.native="save">保存</el-button>
      <el-button type="primary" @click.native="load">加载</el-button>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Store from "@/tools/Store";
export default {
  name: "topologyNavBar",
  props: {
    initGo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      go: this.initGo
    };
  },
  computed: {
    ...mapGetters(["topologyDiagram"])
  },
  mounted() {},
  methods: {
    /**
     * @description: 保存
     * @param {type}
     * @return:
     */
    save() {
      let { diagram } = this.topologyDiagram;
      console.log("save");
      // console.log(diagram, "Xxx");
      let data = this.initGo.Point.stringify(diagram.position);
      diagram.model.modelData.position = data;
      Store.set("diagramModel", diagram.model.toJson());
      // console.log( diagram.model.toJson(), "data");
    },

    /**
     * @description: 重新加载
     * @param {type}
     * @return:
     */
    load() {
      console.log("load");
      let { diagram } = this.topologyDiagram;
      diagram.model = this.initGo.Model.fromJson(diagram.model.toJson());
      var pos = diagram.model.modelData.position;
      if (pos) {
        diagram.initialPosition = this.initGo.Point.parse(pos);
      }
    }
  }
};
</script>
