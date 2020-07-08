<!--
 * @Description: 导航栏
 * @Author: wangqi
 * @Date: 2020-06-30 00:32:54
 * @LastEditTime: 2020-07-08 16:27:41
--> 

<style lang="scss" scoped>
* {
    outline: none;
}

.nav-bar-wrap {

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
}
</style>

<template>
<div class="nav-bar-wrap" v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && (!item['alwaysShow'])">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">{{onlyOneChild.meta.title}}</el-menu-item>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
        <template slot="title">
            <!-- <el-menu-item v-if="item.meta" :icon="item.meta && item.meta.icon">{{item.meta.title}}</el-menu-item> -->
            <!-- <i class="el-icon-eleme"></i> -->
            <svg-icon icon-class="edit" class-name />
            <span>{{item.meta.title}}</span>
        </template>
        <navbar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
</div>
</template>

<script>
import path from "path";
export default {
    name: "NavbarItem",
    data() {
        this.onlyOneChild = null;
        return {};
    },
    props: {
        // 路由属性
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ""
        }
    },

    methods: {
        /**
         * @description: 路由是否有子集处理
         * @param {type}
         * @return:
         */
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    this.onlyOneChild = item;
                    return true;
                }
            });

            if (showingChildren.length === 1) {
                return true;
            }
            if (showingChildren.length === 0) {
                this.onlyOneChild = {
                    ...parent,
                    path: "",
                    noShowingChildren: true
                };
                return true;
            }
            return false;
        },

        /**
         * @description: 拼装路径
         * @param {type}
         * @return:
         */
        resolvePath(routePath) {
            if (this.isExternal(routePath)) {
                return routePath;
            }
            if (this.isExternal(this.basePath)) {
                return this.basePath;
            }
            return path.resolve(this.basePath, routePath);
        },

        isExternal(path) {
            return /^(https?:|mailto:|tel:)/.test(path);
        }
    }
};
</script>
