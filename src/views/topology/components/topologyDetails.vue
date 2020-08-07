<!--
 * @Description: 流程图
 * @Author: wangqi
 * @Date: 2020-07-05 22:50:30
 * @LastEditTime: 2020-08-07 16:28:50
--> 
<style lang="scss" scoped>
.topology-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  #myPaletteDiv {
    width: 105px;
    margin-right: 2px;
    background-color: whitesmoke;
    border: solid 1px black;
  }
  #myDiagramDiv {
    flex-grow: 1;
    height: 620px;
    border: solid 1px black;
  }
}
</style>
<template>
  <div class="topology">
    <topology-nav-bar :initGo="go"></topology-nav-bar>
    <div class="topology-wrap">
      <div id="myPaletteDiv"></div>
      <div id="myDiagramDiv"></div>
    </div>
  </div>
</template>

<script>
const go = require("../../../vendor/go-debug.js");
// const go = require("../../../vendor/go.js");
const $ = go.GraphObject.make;
import cat from "@/assets/images/topology/cat.png";

import Store from "@/tools/Store";
import TopologyNavBar from "./topologyNavBar";
import { mapGetters } from "vuex";
export default {
  name:"topologyDetails",
  data() {
    return {
      myDiagram: {},
      go: go
    };
  },
  created() {},

  mounted() {
    // 初始化
    this.init();

    // 传递图表实例给 navBar 子组件
    this.$store.commit({
      type: "topology/SET_TOPOLOGYDATA",
      diagram: this.myDiagram
    });
  },
  computed: {},
  components: { TopologyNavBar },
  methods: {
    init() {
      let self = this;

      this.myDiagram = $(go.Diagram, "myDiagramDiv", {
        "draggingTool.dragsLink": true,
        "draggingTool.isGridSnapEnabled": true,
        "linkingTool.isUnconnectedLinkValid": true,
        "linkingTool.portGravity": 20,
        "relinkingTool.isUnconnectedLinkValid": true,
        "relinkingTool.portGravity": 20,
        "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
          segmentIndex: 0,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "tomato",
          stroke: "darkred"
        }),
        "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
          segmentIndex: -1,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "darkred",
          stroke: "tomato"
        }),
        "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        "rotatingTool.handleAngle": 270,
        "rotatingTool.handleDistance": 30,
        "rotatingTool.snapAngleMultiple": 15,
        "rotatingTool.snapAngleEpsilon": 15,
        "undoManager.isEnabled": true,
        // "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        "clickCreatingTool.archetypeNodeData": {
          text: "new node"
        }
      });
     
      this.myDiagram.nodeTemplate = $(
        go.Node,
        "Spot",
        {
          locationSpot: go.Spot.Center,
          doubleClick: function(e, node) {
            self.doubleClick(e, node, myDiagram);
          }
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          selectable: true,
          selectionAdornmentTemplate: this.nodeSelectionAdornmentTemplate()
        },
        {
          resizable: true,
          resizeObjectName: "PANEL",
          resizeAdornmentTemplate: this.nodeResizeAdornmentTemplate()
        },
        {
          rotatable: true,
          rotateAdornmentTemplate: this.nodeRotateAdornmentTemplate()
        },
        new go.Binding("angle").makeTwoWay(),
        // the main object is a Panel that surrounds a TextBlock with a Shape
        $(
          go.Panel,
          "Auto",
          {
            name: "PANEL"
          },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
            go.Size.stringify
          ),
          $(
            go.Shape,
            "Rectangle", // default figure
            {
              portId: "", // the default port: if no spot on link data, use closest side
              fromLinkable: true,
              toLinkable: true,
              cursor: "pointer",
              fill: "white", // default color
              strokeWidth: 2
            },
            new go.Binding("figure"),
            new go.Binding("fill")
          ),
          $(
            go.TextBlock,
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true
            },
            new go.Binding("text").makeTwoWay()
          )
        ),
        // four small named ports, one on each side:
        this.makePort("T", go.Spot.Top, false, true),
        this.makePort("L", go.Spot.Left, true, true),
        this.makePort("R", go.Spot.Right, true, true),
        this.makePort("B", go.Spot.Bottom, true, false),
        {
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function(e, node) {
            self.showSmallPorts(node, true);
          },
          mouseLeave: function(e, node) {
            self.showSmallPorts(node, false);
          }
        }
      );

      this.myDiagram.linkTemplate = $(
        go.Link,
        {
          selectable: true,
          selectionAdornmentTemplate: self.linkSelectionAdornmentTemplate()
        },

        {
          relinkableFrom: true,
          relinkableTo: true,
          reshapable: true,

          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4,
          mouseEnter: function(e, link) {
            link.elt(0).stroke = "rgba(0,90,156,0.3)";
          },
          mouseLeave: function(e, link) {
            link.elt(0).stroke = "rgba(0, 0, 0, 1)";
          }
        },

        new go.Binding("points").makeTwoWay(),
        $(
          go.Shape, // the link path shape
          {
            isPanelMain: true,
            strokeWidth: 2
          }
        ),
        $(
          go.Shape, // the arrowhead
          {
            toArrow: "Standard",
            stroke: null
          }
        ),
        $(
          go.Panel,
          "Auto",
          new go.Binding("visible", "isSelected").ofObject(),
          $(
            go.Shape,
            "RoundedRectangle", // the link shape
            {
              fill: "#87cefa",
              stroke: null
            }
          ),
          $(
            go.TextBlock,
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "red",
              margin: 2,
              minSize: new go.Size(10, NaN),
              editable: true
            },
            new go.Binding("text").makeTwoWay()
          )
        )
      );

      let myPalette = $(go.Palette, "myPaletteDiv", {
        maxSelectionCount: 1,
        nodeTemplateMap: self.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
        // simplify the link template, just in this Palette
        // linkTemplate: linkTemplate,
        model: new go.GraphLinksModel(
          [
            // specify the contents of the Palette
            {
              text: "Start",
              figure: "Circle",
              fill: "#00AD5F"
            },
            {
              text: "Step"
            },
            {
              text: "DB",
              figure: "Database",
              fill: "lightgray"
            },
            {
              text: "???",
              figure: "Diamond",
              fill: "lightskyblue"
            },
            {
              text: "End",
              figure: "Circle",
              fill: "#CE0620"
            },
            {
              text: "Comment",
              figure: "RoundedRectangle",
              fill: "lightyellow"
            }
          ],
          [
            // the Palette also has a disconnected Link, which the user can drag-and-drop
            {
              points: new go.List(/*go.Point*/).addAll([
                new go.Point(0, 0),
                new go.Point(30, 0),
                new go.Point(30, 40),
                new go.Point(60, 40)
              ])
            }
          ]
        )
      });

      myPalette.linkTemplate = $(
        go.Link,
        {
          // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
          // to line up the Link in the same manner we have to pretend the Link has the same location spot
          locationSpot: go.Spot.Center,
          selectionAdornmentTemplate: $(
            go.Adornment,
            "Link",
            {
              locationSpot: go.Spot.Center
            },
            $(go.Shape, {
              isPanelMain: true,
              fill: null,
              stroke: "deepskyblue",
              strokeWidth: 0
            }),
            $(
              go.Shape, // the arrowhead
              {
                toArrow: "Standard",
                stroke: null
              }
            )
          )
        },
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5,
          toShortLength: 4
        },
        new go.Binding("points"),
        $(
          go.Shape, // the link path shape
          {
            isPanelMain: true,
            strokeWidth: 2
          }
        ),
        $(
          go.Shape, // the arrowhead
          {
            toArrow: "Standard",
            stroke: null
          }
        )
      );

      // 初始化流程图
      this.load();
    },

    /**
     * @description: 初始化流程图
     * @param {type}
     * @return:
     */
    load() {
      let data = Store.get("diagramModel");
      let myDiagram = this.myDiagram;
      if (data) {
        myDiagram.model = go.Model.fromJson(data);
        var pos = myDiagram.model.modelData.position;
        if (pos) {
          myDiagram.initialPosition = go.Point.parse(pos);
        }
      }
    },

    makePort(name, spot, output, input) {
      return $(go.Shape, "Circle", {
        fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
        stroke: null,
        desiredSize: new go.Size(15, 15),
        alignment: spot, // align the port on the main Shape
        alignmentFocus: spot, // just inside the Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: "pointer" // show a different cursor to indicate potential link point
      });
    },
    // node模板双击事件
    doubleClick(e, node, myDiagram) {
      console.log("doubleClick", "data");
    },

    nodeSelectionAdornmentTemplate() {
      return $(
        go.Adornment,
        "Auto",
        $(go.Shape, {
          fill: null,
          stroke: "deepskyblue",
          strokeWidth: 1.5,
          strokeDashArray: [4, 2]
        }),
        $(go.Placeholder)
      );
    },

    nodeResizeAdornmentTemplate() {
      return $(
        go.Adornment,
        "Spot",
        {
          locationSpot: go.Spot.Right
        },
        $(go.Placeholder),
        $(go.Shape, {
          alignment: go.Spot.TopLeft,
          cursor: "nw-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        $(go.Shape, {
          alignment: go.Spot.Top,
          cursor: "n-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        $(go.Shape, {
          alignment: go.Spot.TopRight,
          cursor: "ne-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),

        $(go.Shape, {
          alignment: go.Spot.Left,
          cursor: "w-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        $(go.Shape, {
          alignment: go.Spot.Right,
          cursor: "e-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),

        $(go.Shape, {
          alignment: go.Spot.BottomLeft,
          cursor: "se-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        $(go.Shape, {
          alignment: go.Spot.Bottom,
          cursor: "s-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        $(go.Shape, {
          alignment: go.Spot.BottomRight,
          cursor: "sw-resize",
          desiredSize: new go.Size(6, 6),
          fill: "lightblue",
          stroke: "deepskyblue"
        })
      );
    },

    nodeRotateAdornmentTemplate() {
      return $(
        go.Adornment,
        {
          locationSpot: go.Spot.Center,
          locationObjectName: "CIRCLE"
        },
        $(go.Shape, "Circle", {
          name: "CIRCLE",
          cursor: "pointer",
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue"
        }),
        $(go.Shape, {
          geometryString: "M3.5 7 L3.5 30",
          isGeometryPositioned: true,
          stroke: "deepskyblue",
          strokeWidth: 1.5,
          strokeDashArray: [4, 2]
        })
      );
    },

    showSmallPorts(node, show) {
      node.ports.each(function(port) {
        if (port.portId !== "") {
          // don't change the default port, which is the big shape
          port.fill = show ? "rgba(0,0,0,.3)" : null;
        }
      });
    },

    linkSelectionAdornmentTemplate() {
      return $(
        go.Adornment,
        "Link",
        $(
          go.Shape,
          // isPanelMain declares that this Shape shares the Link.geometry
          {
            isPanelMain: true,
            fill: null,
            stroke: "deepskyblue",
            strokeWidth: 0
          }
        ) // use selection object's strokeWidth
      );
    }
  }
};
</script>
