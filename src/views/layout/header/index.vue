<!--
 * @Description: 页面头部
 * @Author: wangqi
 * @Date: 2020-06-04 14:28:00
 * @LastEditTime: 2020-06-28 20:42:45
--> 

<style lang="scss">
.head-nav {
  .sign-out {
    height: 60px;
    line-height: 60px;
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
        <!-- $router.options.routes -->
        <el-menu
          mode="horizontal"
          router
          :default-active="activeMenu"
          @select="handleSelect"
          :background-color="menuObj.bgColor"
          :text-color="menuObj.textColor"
          :active-text-color="menuObj.activeTextColor"
        >
          <template v-for="(route, index) in permissionRoutes">
            <template v-if="!route.hidden && route.children.length>1">
              <el-submenu
                :index="route.path"
                :key="index"
              >
                <template slot="title">{{route.title}}</template>
                <template v-for="(item, itemIndex) in route.children">
                  <el-menu-item
                    :index="route.path+'/'+item.path"
                    :key="itemIndex"
                  >{{item.meta.title}}</el-menu-item>
                </template>
              </el-submenu>
            </template>

            <template v-else>
              <template v-if="!route.hidden">
                <el-menu-item
                  :index="route.redirect"
                  :key="index"
                >{{route.children[0].meta.title}}</el-menu-item>
              </template>
            </template>
          </template>

        </el-menu>
      </el-col>

      <el-col
        :span="2"
        class="sign-out"
        @click.native="signOut"
      >
        <i class="el-icon-user"></i>
        <div class="grid-content bg-purple">退出</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  created() {},

  computed: {
    ...mapGetters(["permissionRoutes"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      return path;
    }
  },
  components: {},
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
