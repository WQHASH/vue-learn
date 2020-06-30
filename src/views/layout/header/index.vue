<!--
 * @Description: 页面头部
 * @Author: wangqi
 * @Date: 2020-06-04 14:28:00
 * @LastEditTime: 2020-06-30 22:11:09
--> 

<style lang="scss">
.head-nav {
    .el-menu {
        display: flex;
        flex-direction: row;
    }

    /* 水平样式 */
    .el-menu--horizontal>div>.el-submenu {
        float: left;
    }

    /* 一级菜单的样式 */
    .el-menu--horizontal>div>.el-menu-item {
        float: left;
        height: 60px;
        line-height: 60px;
        margin: 0;
        border-bottom: 2px solid transparent;
        color: #909399;
    }

    /* 解决下图1 下拉三角图标 */
    .el-menu--horizontal>div>.el-submenu .el-submenu__icon-arrow {
        position: static;
        vertical-align: middle;
        margin-left: 8px;
        margin-top: -3px;
    }

    /* 解决下图2 无下拉菜单时 不对齐问题 */
    .el-menu--horizontal>div>.el-submenu .el-submenu__title {
        height: 60px;
        line-height: 60px;
        border-bottom: 2px solid transparent;
        color: #909399;
    }

    .sign-out {
        height: 56px;
        line-height: 56px;
        color: #fff;
        background: #545c64;
        cursor: pointer;

        i {
            font-size: 22px;
            position: relative;
            top: 2px;
        }

        div {
            margin: 0px 15px;
            display: inline-block;
        }
    }
}
</style>

<template>
<div class="head-nav">
    <el-row>
        <el-col :span="22">
            <el-menu mode="horizontal" router :default-active="activeMenu" @select="handleSelect" :background-color="menuObj.bgColor" :text-color="menuObj.textColor" :active-text-color="menuObj.activeTextColor" class="el-menu-demo">
                <navbar-item v-for="(route, index) in permissionRoutes" :key="index" :item="route" :base-path="route.path"></navbar-item>
            </el-menu>
        </el-col>

        <el-col :span="2" class="sign-out" @click.native="signOut">
            <i class="el-icon-user"></i>
            <div class="grid-content bg-purple">退出</div>
        </el-col>
    </el-row>
</div>
</template>

<script>
import path from "path";
import {
    mapGetters
} from "vuex";
import NavbarItem from "./NavbarItem";

export default {
    name: "HeaderNav",
    props: {
        basePath: {
            type: String,
            default: ""
        }
    },
    data() {
        // this.onlyOneChild = null;
        return {
            menuObj: {
                bgColor: "#545c64",
                textColor: "#fff",
                activeTextColor: "#ffd04b",
                activeIndex: "dashboard",
                // 当前子路由数据
                onlyOneChild: null
            }
        };
    },
    created() {},

    computed: {
        ...mapGetters(["permissionRoutes"]),
        activeMenu() {
            const route = this.$route;
            const {
                meta,
                path
            } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        }
    },
    components: {
        NavbarItem
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },

        /**
         * @description: 退出
         * @param {type}
         * @return:
         */
        async signOut() {
            await this.$store.dispatch("user/logout");
            this.$router.push({
                // path: `/login?redirect=${this.$route.fullPath}`
                path: `/login`
            });
        }
    }
};
</script>
