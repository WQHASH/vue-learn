<!--
 * @Description: 拓扑图动态端口图
 * @Author: wangqi
 * @Date: 2020-08-06 13:37:21
 * @LastEditTime: 2020-08-13 23:51:29
-->

<style lang="scss" scoped>
.topology-dynamic-ports {
    display: flex;
    flex-direction: column;

    .el-row {
        text-align: right;
    }

    #dynamic-ports-wrap {
        width: 100%;
        height: 600px;
        border: 1px solid #333;
        margin: 10px 0px;
    }
}
</style>
<template>
<div class="topology-dynamic-ports">
    <el-row>
        <el-button @click.native="save">保存</el-button>
        <el-button @click.native="load">加载</el-button>
    </el-row>
    <div id="dynamic-ports-wrap"></div>
</div>
</template>

<script>
const go = require("../../../vendor/go-debug.js");
const $ = go.GraphObject.make;
import CustomLink from "../utils/CustomLink";
import Store from "@/tools/Store";
import {
    mapGetters
} from "vuex";

export default {
    name: "topologyDynamicPorts",
    data() {
        return {
            go: go,
            myDiagram: {},
            topologyData: {
                class: "go.GraphLinksModel",
                copiesArrays: true,
                copiesArrayObjects: true,
                linkFromPortIdProperty: "fromPort",
                linkToPortIdProperty: "toPort",
                nodeDataArray: [{
                        key: 1,
                        name: "wqwqwqw",
                        loc: "101 204",
                        leftArray: [{
                            portColor: "red",
                            portId: "left0"
                        }],
                        topArray: [{
                            portColor: "#545c64",
                            portId: "top0"
                        }],
                        bottomArray: [{
                            portColor: "#545c64",
                            portId: "bottom0"
                        }],
                        rightArray: [{
                                portColor: "#545c64",
                                portId: "right0"
                            },
                            {
                                portColor: "#545c64",
                                portId: "right1"
                            }
                        ]
                    },
                    {
                        key: 2,
                        name: "Unit Two",
                        loc: "320 152",
                        leftArray: [{
                                portColor: "#545c64",
                                portId: "left0"
                            },
                            {
                                portColor: "#545c64",
                                portId: "left1"
                            },
                            {
                                portColor: "#545c64",
                                portId: "left2"
                            }
                        ],
                        topArray: [{
                            portColor: "#545c64",
                            portId: "top0"
                        }],
                        bottomArray: [{
                                portColor: "#545c64",
                                portId: "bottom0"
                            },
                            {
                                portColor: "#545c64",
                                portId: "bottom1"
                            },
                            {
                                portColor: "#545c64",
                                portId: "bottom2"
                            }
                        ],
                        rightArray: []
                    },
                    {
                        key: 3,
                        name: "Unit Three",
                        loc: "384 319",
                        leftArray: [{
                                portColor: "#545c64",
                                portId: "left0"
                            },
                            {
                                portColor: "#545c64",
                                portId: "left1"
                            },
                            {
                                portColor: "#545c64",
                                portId: "left2"
                            }
                        ],
                        topArray: [{
                            portColor: "#545c64",
                            portId: "top0"
                        }],
                        bottomArray: [{
                            portColor: "#545c64",
                            portId: "bottom0"
                        }],
                        rightArray: []
                    },

                ],
                linkDataArray: [{
                        from: 4,
                        to: 2,
                        fromPort: "top0",
                        toPort: "bottom0"
                    },
                    {
                        from: 4,
                        to: 2,
                        fromPort: "top0",
                        toPort: "bottom0"
                    },
                    {
                        from: 3,
                        to: 2,
                        fromPort: "top0",
                        toPort: "bottom1"
                    },
                    {
                        from: 4,
                        to: 3,
                        fromPort: "right0",
                        toPort: "left0"
                    },
                    {
                        from: 4,
                        to: 3,
                        fromPort: "right1",
                        toPort: "left2"
                    },
                    {
                        from: 1,
                        to: 2,
                        fromPort: "right0",
                        toPort: "left1"
                    },
                    {
                        from: 1,
                        to: 2,
                        fromPort: "right1",
                        toPort: "left2"
                    }
                ]
            }
        };
    },

    mounted() {
        this.init();
    },
    watch: {

    },
    methods: {
        init() {
            let self = this;
            go.Diagram.inherit(CustomLink, go.Link);
            let portSize = new go.Size(8, 8);

            this.myDiagram = $(go.Diagram, "dynamic-ports-wrap", {
                "draggingTool.dragsLink": true,
                "draggingTool.isGridSnapEnabled": true,
                "linkingTool.isUnconnectedLinkValid": true,
                "linkingTool.portGravity": 20,
                "relinkingTool.isUnconnectedLinkValid": true,
                "relinkingTool.portGravity": 20,

                "undoManager.isEnabled": true
            });

            this.myDiagram.nodeTemplate = $(
                go.Node,
                "Table", {
                    locationObjectName: "BODY",
                    locationSpot: go.Spot.Center,
                    selectionObjectName: "BODY",
                    contextMenu: self.nodeMenu()
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
                    go.Point.stringify
                ),

                // the body
                $(
                    go.Panel,
                    "Auto", {
                        row: 1,
                        column: 1,
                        name: "BODY",
                        stretch: go.GraphObject.Fill
                    },
                    $(go.Shape, "Rectangle", {
                        fill: "#dbf6cb",
                        stroke: null,
                        strokeWidth: 0,
                        cursor: "pointer",
                        minSize: new go.Size(80, 80)
                    }),
                    $(
                        go.TextBlock, {
                            margin: 10,
                            textAlign: "center",
                            font: "bold 14px Segoe UI,sans-serif",
                            stroke: "#484848",
                            editable: true
                        },
                        new go.Binding("text", "name").makeTwoWay()
                    )
                ), // end Auto Panel body

                // the Panel holding the left port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.leftArray
                $(go.Panel, "Vertical", new go.Binding("itemArray", "leftArray"), {
                    row: 1,
                    column: 0,
                    itemTemplate: $(
                        go.Panel, {
                            _side: "left", // internal property to make it easier to tell which side it's on
                            fromSpot: go.Spot.Left,
                            toSpot: go.Spot.Left,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: self.portMenu()
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(1, 0)
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ) // end itemTemplate
                }), // end Vertical Panel

                // the Panel holding the top port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.topArray
                $(go.Panel, "Horizontal", new go.Binding("itemArray", "topArray"), {
                    row: 0,
                    column: 1,
                    itemTemplate: $(
                        go.Panel, {
                            _side: "top",
                            fromSpot: go.Spot.Top,
                            toSpot: go.Spot.Top,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: self.portMenu()
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(0, 1)
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ) // end itemTemplate
                }), // end Horizontal Panel

                // the Panel holding the right port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.rightArray
                $(go.Panel, "Vertical", new go.Binding("itemArray", "rightArray"), {
                    row: 1,
                    column: 2,
                    itemTemplate: $(
                        go.Panel, {
                            _side: "right",
                            fromSpot: go.Spot.Right,
                            toSpot: go.Spot.Right,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            contextMenu: self.portMenu()
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(1, 0)
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ) // end itemTemplate
                }), // end Vertical Panel

                // the Panel holding the bottom port elements, which are themselves Panels,
                // created for each item in the itemArray, bound to data.bottomArray
                $(go.Panel, "Horizontal", new go.Binding("itemArray", "bottomArray"), {
                    row: 2,
                    column: 1,
                    itemTemplate: $(
                        go.Panel, {
                            _side: "bottom",
                            fromSpot: go.Spot.Bottom,
                            toSpot: go.Spot.Bottom,
                            fromLinkable: true,
                            toLinkable: true,
                            cursor: "pointer",
                            // contextMenu: self.portMenu()
                            contextMenu: $("ContextMenu", this.makeButton("Swap order", function (e, obj) {
                                self.swapOrder(obj.part.adornedObject);
                            })),
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(0, 1)
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ) // end itemTemplate
                }) // end Horizontal Panel
            );

            this.myDiagram.linkTemplate = $(
                CustomLink, // defined below
                {
                    routing: go.Link.AvoidsNodes,
                    corner: 4,
                    curve: go.Link.JumpGap,
                    reshapable: true,
                    resegmentable: true,
                    relinkableFrom: true,
                    relinkableTo: true,
                    // 禁止线或节点拖拽
                    movable:false,
                },
                // 未连接的先是否能保存
                // new go.Binding("points").makeTwoWay(),
                $(go.Shape, {
                    stroke: "#2F4F4F",
                    strokeWidth: 2
                })
            );

            //   this.toolManager.clickCreatingTool.archetypeNodeData = {
            //       name: "Unit",
            //       leftArray: [],
            //       rightArray: [],
            //       topArray: [],
            //       bottomArray: []
            //   };
            this.load();

            // 连线事件
            this.linkDrawnEvent();
        },

        /**
         * @description: 加载拓扑图数据
         * @param {type} 
         * @return {type} 
         */
        load() {
            let data = Store.get("topologyDynamicPortsData");
            if (data) {
                this.myDiagram.model = go.Model.fromJson(data);
            } else {
                this.myDiagram.model = go.Model.fromJson(JSON.stringify(this.topologyData));
            }
        },

        /**
         * @description: 保存
         * @param {type} 
         * @return {type} 
         */
        save() {
            this.topologyData = JSON.parse(this.myDiagram.model.toJson());
            Store.set("topologyDynamicPortsData", this.myDiagram.model.toJson());
        },

        /**
         * @description: 连线事件
         * @param {type} 
         * @return {type} 
         */
        linkDrawnEvent() {
            this.myDiagram.addDiagramListener("LinkDrawn", function (e) {
                console.log(e.subject.data, "xxxx") //这是这个线条的数据
            });
        },

        /**
         * @description: 动态创建端口, 以及按钮
         * @param {type}
         * @return {type}
         */
        makeButton(text, action, visiblePredicate) {
            return $(
                "ContextMenuButton",
                $(go.TextBlock, text), {
                    click: action
                },
                // don't bother with binding GraphObject.visible if there's no predicate
                visiblePredicate ?
                new go.Binding("visible", "", function (o, e) {
                    return o.diagram ? visiblePredicate(o, e) : false;
                }).ofObject() : {}
            );
        },

        /**
         * @description: 生成按钮组
         * @param {type}
         * @return {type}
         */
        nodeMenu() {
            let self = this;
            return $(
                "ContextMenu",
                this.makeButton("Copy", function (e, obj) {
                    e.diagram.commandHandler.copySelection();
                }),
                this.makeButton("Delete", function (e, obj) {
                    e.diagram.commandHandler.deleteSelection();
                }),
                $(go.Shape, "LineH", {
                    strokeWidth: 2,
                    height: 1,
                    stretch: go.GraphObject.Horizontal
                }),
                this.makeButton("Add top port", function (e, obj) {
                    self.addPort("top");
                }),
                this.makeButton("Add left port", function (e, obj) {
                    self.addPort("left");
                }),
                this.makeButton("Add right port", function (e, obj) {
                    self.addPort("right");
                }),
                this.makeButton("Add bottom port", function (e, obj) {
                    self.addPort("bottom");
                })
            );
        },

        /**
         * @description: 生成端口组
         * @param {type}
         * @return {type}
         */
        portMenu() {
            let self = this;
            return $(
                "ContextMenu",
                this.makeButton("Swap order", function (e, obj) {
                    self.swapOrder(obj.part.adornedObject);
                }),
                this.makeButton(
                    "Remove port",
                    // in the click event handler, the obj.part is the Adornment;
                    // its adornedObject is the port
                    function (e, obj) {
                        self.removePort(obj.part.adornedObject);
                    }
                ),
                this.makeButton("Change color", function (e, obj) {
                    self.changeColor(obj.part.adornedObject);
                }),
                this.makeButton("Remove side ports", function (e, obj) {
                    self.removeAll(obj.part.adornedObject);
                })
            );
        },

        addPort(side) {
            let self = this;
            this.myDiagram.startTransaction("addPort");
            this.myDiagram.selection.each(function (node) {
                // skip any selected Links
                if (!(node instanceof go.Node)) return;
                // compute the next available index number for the side
                var i = 0;
                while (node.findPort(side + i.toString()) !== node) i++;
                // now this new port name is unique within the whole Node because of the side prefix
                var name = side + i.toString();
                // get the Array of port data to be modified
                var arr = node.data[side + "Array"];
                if (arr) {
                    // create a new port data object
                    var newportdata = {
                        portId: name,
                        portColor: self.getPortColor()
                        // if you add port data properties here, you should copy them in copyPortData above
                    };
                    // and add it to the Array of port data
                    self.myDiagram.model.insertArrayItem(arr, -1, newportdata);
                }
            });
            this.myDiagram.commitTransaction("addPort");
        },

        swapOrder(port) {
            var arr = port.panel.itemArray;
            if (arr.length >= 2) {
                // only if there are at least two ports!
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].portId === port.portId) {
                        this.myDiagram.startTransaction("swap ports");
                        if (i >= arr.length - 1) i--; // now can swap I and I+1, even if it's the last port
                        var newarr = arr.slice(0); // copy Array
                        newarr[i] = arr[i + 1]; // swap items
                        newarr[i + 1] = arr[i];
                        // remember the new Array in the model
                        this.myDiagram.model.setDataProperty(
                            port.part.data,
                            port._side + "Array",
                            newarr
                        );
                        this.myDiagram.commitTransaction("swap ports");
                        break;
                    }
                }
            }
        },

        removePort(port) {
            this.myDiagram.startTransaction("removePort");
            var pid = port.portId;
            var arr = port.panel.itemArray;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].portId === pid) {
                    this.myDiagram.model.removeArrayItem(arr, i);
                    break;
                }
            }
            this.myDiagram.commitTransaction("removePort");
        },

        removeAll(port) {
            this.myDiagram.startTransaction("removePorts");
            var nodedata = port.part.data;
            var side = port._side; // there are four property names, all ending in "Array"
            this.myDiagram.model.setDataProperty(nodedata, side + "Array", []); // an empty Array
            this.myDiagram.commitTransaction("removePorts");
        },

        changeColor(port) {
            this.myDiagram.startTransaction("colorPort");
            var data = port.data;
            this.myDiagram.model.setDataProperty(data, "portColor", this.getPortColor());
            this.myDiagram.commitTransaction("colorPort");
        },

        /**
         * @description: 生成端口的颜色
         * @param {type} 
         * @return {type} 
         */
        getPortColor() {
            var portColors = [
                "#fae3d7",
                "#d6effc",
                "#ebe3fc",
                "#eaeef8",
                "#fadfe5",
                "#6cafdb",
                "#66d6d1"
            ];
            // return portColors[Math.floor(Math.random() * portColors.length)];
            return "#545c64";
        }
    }
};
</script>
