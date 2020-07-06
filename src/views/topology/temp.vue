<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-28 19:25:58
 * @LastEditTime: 2020-07-05 23:37:28
--> 
<template>
  <div class="goDemo">
    <div id="myDiagramDiv" style="border: solid 1px blue; width:1000px; height:500px"></div>
  </div>
</template>

<script>
const go = require("../../vendor/go-debug.js");
// const go = require("../../vendor/go.js");
const $ = go.GraphObject.make;
import cat from '@/assets/images/topology/cat.png';

console.log(cat,"cat")
export default {
  data() {
    return {
    };
  },
  created() {
    console.log(go, "go");
  },
  mounted() {
    this.init();
    // this.goMthods();
  },

  methods: {
    init() {
      var myDiagram = $(go.Diagram, "myDiagramDiv", {
        //  grid: $(
        //   go.Panel,
        //   "Grid",
        //   $(go.Shape, "LineH", {
        //     stroke: "lightgray",
        //     strokeWidth: 0.5
        //   }),
        //   $(go.Shape, "LineH", {
        //     stroke: "gray",
        //     strokeWidth: 0.5,
        //     interval: 10
        //   }),
        //   $(go.Shape, "LineV", {
        //     stroke: "lightgray",
        //     strokeWidth: 0.5
        //   }),
        //   $(go.Shape, "LineV", {
        //     stroke: "gray",
        //     strokeWidth: 0.5,
        //     interval: 10
        //   })
        // ),
        "undoManager.isEnabled": true,
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        "clickCreatingTool.archetypeNodeData": {
          text: "new node"
        }
      });


      myDiagram.nodeTemplate = $( 
        go.Node,
        "Auto",
        { locationSpot: go.Spot.Center },
        new go.Binding("location", "loc"),
          // "isSelected", sel =>{return sel ? "dodgerblue" : "lightgray"} .ofObject()
        $(go.Shape, { figure: "RoundedRectangle", fill: "white" }, new go.Binding('fill', "color"), 
        //  $(go.Shape, { figure: "RoundedRectangle", fill: "white" }, new go.Binding('fill', "isSelected", sel =>{return sel ? "dodgerblue" : "lightgray"}).ofObject(), 
        new go.Binding("fill","highlight", v => v ? "#e7eaed" : "yellow" )),
        $(go.TextBlock, { text: "hello!", margin: 5 }, new go.Binding("text", "key"))
      );

      myDiagram.linkTemplate = $(
        go.Link, 
        $(go.Shape, new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "thick")), 
        $(go.Shape, {toArrow: "OpenTriangle", fill: null}, new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "thick")),
      );

      var nodeDataArray = [
        { key: "Alpha", color: "pink", loc: new go.Point(0, 0)}
        ,{ key: "Beta" , color:"yellow", loc: new go.Point(100, 100)}
        ,{ key: "Beta22" , color:"yellow", highlight: true, count: 17,loc: new go.Point(0, 300)}
      ];

      var linkDataArray = [
        {from: "Alpha", to: "Beta",  color: "#545c64", thick: 2}
        ,{from: "Alpha", to: "Beta22",  color: "#545c64", thick: 2}
        ,{from: "Beta22", to: "Alpha",  color: "#545c64", thick: 2}];
      // myDiagram.model.removeNodeData({ key: "Beta" , color:"yellow", count: 17});

      myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
      var data = myDiagram.model.findNodeDataForKey("Beta22");
      // 修改属性：setDataProperty
      // if (data !== null) myDiagram.model.setDataProperty(data, "color", "red");

      function flash() {
        myDiagram.model.commit(function(m) {
          // 改变颜色属性
          var nodeData = m.nodeDataArray[2];  
          m.set(nodeData, "highlight", !nodeData.highlight);

          // 改变连线
          var linkData = m.linkDataArray[0];  
          if (m.getToKeyForLinkData(linkData) === "Beta"){
            m.setToKeyForLinkData(linkData, "Beta22");
          }else{
            m.setToKeyForLinkData(linkData, "Beta");
          }
        }, "flash");
      };
      flash();

      function loop() {
        setTimeout(function() { flash(); loop(); }, 1000);
      }
      // loop();
   
      myDiagram.animationManager.initialAnimationStyle = go.AnimationManager.AnimateLocations;
      // myDiagram.model = go.Model.fromJSON(myDiagram.model.toJSON());
    },

    goMthods(){
        var diagram = $(go.Diagram, "myDiagramDiv", {
          "undoManager.isEnabled": true,
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
          "clickCreatingTool.archetypeNodeData": {
            text: "new node"
          }
        });

        diagram.add($(go.Part, "Vertical",  { isClipping: true, scale: 2  }
          ,$(go.Picture, {source: cat, width:50,height:50,margin:2})
          ,$(go.TextBlock,  {text:"Tom猫", editable:true}) ));
      


    },
  }
};
</script>
