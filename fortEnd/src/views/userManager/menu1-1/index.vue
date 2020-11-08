<template>
<div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" />
    <input type="text" placeholder="请输入" @change="changeMethod" v-model.lazy="num"> -- {{num}}

    <input type="checkbox" id="checkbox1" value="1" v-model="checked">
    <input type="checkbox" id="checkbox2" value="2" v-model="checked">
    <input type="checkbox" id="checkbox3" value="3" v-model="checked">

    <label for="checkbox">{{ checked }}</label>

    <div id="example-5">
        <select v-model="selected">
            <option disabled value="">请选择</option>
            <option value="aa" checked>A</option>
            <option value="bb">B</option>
            <option value="cc">C</option>
        </select>
        <span>Selected: {{ selected }}</span>
    </div>

    <h4>test 组件部分：</h4>
    <test></test>
    <test></test>
    <component :is="current"></component>
</div>
</template>

<script>
import test from '../components/testCom';

export default {
    data() {
        return {
            num: 0,
            checked: [],
            selected: "",
            current:"test",
            obj: {},
        };
    },
    components:{
      test
    },
    mounted() {},
    methods: {
        changeMethod() {
            console.log(this.num,"num")
        },
        keyDown(...args) {
            console.log(args);
        },
    },
};
</script>
