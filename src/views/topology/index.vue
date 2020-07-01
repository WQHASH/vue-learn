<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-28 19:25:58
 * @LastEditTime: 2020-07-01 17:20:36
--> 
<template>
  <div class="goDemo">
    <div
      id="myDiagramDiv"
      style="border: solid 1px blue; width:1000px; height:500px"
    ></div>
  </div>
</template>

<script>

const go = require("../../vendor/go-debug.js");
// const go = require("../../vendor/go.js");
const $ = go.GraphObject.make;

export default {
  data() {
    return {};
  },
  created() {
    console.log(go, "go");
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      const diagramWrap = document.getElementById("myDiagramDiv");
      var myDiagram = $(go.Diagram, "myDiagramDiv", {
        "undoManager.isEnabled": true
      });

      var myModel = $(go.Model);
      // for each object in this Array, the Diagram creates a Node to represent it
      myModel.nodeDataArray = [
        { key: "Alpha" },
        { key: "Beta" },
        { key: "Gamma" }
      ];
      myDiagram.model = myModel;
    }
  }
};
</script>
