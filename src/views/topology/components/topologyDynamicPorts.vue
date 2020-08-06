<!--
 * @Description: 拓扑图动态端口图
 * @Author: wangqi
 * @Date: 2020-08-06 13:37:21
 * @LastEditTime: 2020-08-06 15:12:21
-->

<style lang="scss" scoped>
.topology-dynamic-ports {
    display: flex;
    flex-direction: row;

    #dynamic-ports-wrap {
        width: 100%;
        height: 600px;
    }
}
</style>
<template>
<div class="topology-dynamic-ports">
    <div id="dynamic-ports-wrap"></div>
</div>
</template>

<script>
const go = require("../../../vendor/go-debug.js");
const $ = go.GraphObject.make;
import Store from "@/tools/Store";
import {
    mapGetters
} from "vuex";

export default {
    data() {
        return {
            go: go,
            myDiagram: {},
        };
    },

    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.myDiagram = $(go.Diagram, "dynamic-ports-wrap", {
                "undoManager.isEnabled": true,
            });

            this.myDiagram.nodeTemplate = $(
                go.Node,
                "Table", {
                    locationObjectName: "BODY",
                    locationSpot: go.Spot.Center,
                    selectionObjectName: "BODY",
                    contextMenu: nodeMenu,
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
                        stretch: go.GraphObject.Fill,
                    },
                    $(go.Shape, "Rectangle", {
                        fill: "#dbf6cb",
                        stroke: null,
                        strokeWidth: 0,
                        minSize: new go.Size(60, 60),
                    }),
                    $(
                        go.TextBlock, {
                            margin: 10,
                            textAlign: "center",
                            font: "bold 14px Segoe UI,sans-serif",
                            stroke: "#484848",
                            editable: true,
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
                            contextMenu: portMenu,
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(1, 0),
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ), // end itemTemplate
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
                            contextMenu: portMenu,
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(0, 1),
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ), // end itemTemplate
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
                            contextMenu: portMenu,
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(1, 0),
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ), // end itemTemplate
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
                            contextMenu: portMenu,
                        },
                        new go.Binding("portId", "portId"),
                        $(
                            go.Shape,
                            "Rectangle", {
                                stroke: null,
                                strokeWidth: 0,
                                desiredSize: portSize,
                                margin: new go.Margin(0, 1),
                            },
                            new go.Binding("fill", "portColor")
                        )
                    ), // end itemTemplate
                }) // end Horizontal Panel
            );
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
                    click: action,
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
            $(
                "ContextMenu",
                makeButton("Copy", function (e, obj) {
                    e.diagram.commandHandler.copySelection();
                }),
                makeButton("Delete", function (e, obj) {
                    e.diagram.commandHandler.deleteSelection();
                }),
                $(go.Shape, "LineH", {
                    strokeWidth: 2,
                    height: 1,
                    stretch: go.GraphObject.Horizontal,
                }),
                makeButton("Add top port", function (e, obj) {
                    addPort("top");
                }),
                makeButton("Add left port", function (e, obj) {
                    addPort("left");
                }),
                makeButton("Add right port", function (e, obj) {
                    addPort("right");
                }),
                makeButton("Add bottom port", function (e, obj) {
                    addPort("bottom");
                })
            );
        },

        /**
         * @description: 生成端口组
         * @param {type}
         * @return {type}
         */
        portMenu() {},
    },
};
</script>
