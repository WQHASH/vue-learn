<!--
 * @Description: 页面头部
 * @Author: wangqi
 * @Date: 2020-06-04 14:28:00
 * @LastEditTime: 2020-06-14 12:06:29
--> 

<style lang="scss">
.head-nav {}
</style>

<template>
<div class="head-nav">
    <el-menu mode="horizontal" router :default-active="$route.path" @select="handleSelect" :background-color="menuObj.bgColor" :text-color="menuObj.textColor" :active-text-color="menuObj.activeTextColor">
        <template v-for="(route, index) in $router.options.routes">
            <template v-if="!route.hidden && route.children.length>1">
                <el-submenu :index="route.path" :key="index">
                    <template slot="title"> {{route.title}} </template>
                    <template v-for="(item, itemIndex) in route.children">
                        <el-menu-item :index="route.path+'/'+item.path" :key="itemIndex">{{item.meta.title}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>

            <template v-else>
                <template v-if="!route.hidden">
                    <el-menu-item :index="route.path" :key="index">{{route.children[0].meta.title}}</el-menu-item>
                </template>
            </template>
        </template>
        <el-menu-item index="7" disabled>消息中心</el-menu-item>
    </el-menu>
</div>
</template>

<script>
export default {
    name: "HeaderNav",
    data() {
        return {
            menuObj: {
                bgColor: "#545c64",
                textColor: "#fff",
                activeTextColor: "#ffd04b",
                activeIndex: "dashboard"
            }

        };
    },
    created() {
        console.log(this.$router, "router")
    },
    components: {},
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
};
</script>
