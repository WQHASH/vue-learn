<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-06-28 19:25:58
 * @LastEditTime: 2020-06-28 20:51:01
--> 
<template>
<div>
    <div id="myDiagramDiv" style="width:600px; height:350px; background-color: #DAE4E4;"></div>
</div>
</template>

<script>
import gojs from "gojs";

export default {
    data() {
        return {};
    },
    created() {
        console.log(gojs);
    },
    methods: {
        init() {

            var $ = go.GraphObject.make;
            var myDiagram =
                $(go.Diagram, "myDiagramDiv", { // enable Ctrl-Z to undo and Ctrl-Y to redo
                    "undoManager.isEnabled": true
                });

            var myModel = $(go.Model);
            // for each object in this Array, the Diagram creates a Node to represent it
            myModel.nodeDataArray = [{
                    key: "Alpha"
                },
                {
                    key: "Beta"
                },
                {
                    key: "Gamma"
                }
            ];
            myDiagram.model = myModel;

        }
    }
};
</script>
