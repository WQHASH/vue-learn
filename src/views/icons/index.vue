<!--
 * @Description: icons
 * @Author: wangqi
 * @Date: 2020-06-26 16:56:19
 * @LastEditTime: 2020-06-26 19:58:04
--> 

<style lang="scss">
.icons-wrap {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>

<template>
  <div class="icons-wrap">
    <el-tabs type="border-card">
      <el-tab-pane label="svgIcons">
        <div class="grid">
          <div v-for="(item, index) of svgIcons" :key="index" @click="handleClipboard()">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">{{ generateIconCode(item) }}</div>

              <div class="icon-item">
                <svg-icon :icon-class="item" class-name />
                <span>{{item}}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import svgIcons from "./svg-icons";

export default {
  name: "Icons",
  data() {
    return {
      svgIcons
    };
  },
  components: {},

  methods: {
    handleClipboard() {},

    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}"/>`;
    }
  }
};
</script>
