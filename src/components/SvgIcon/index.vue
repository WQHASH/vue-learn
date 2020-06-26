<!--
 * @Description: svg-icon组件
 * @Author: wangqi
 * @Date: 2020-06-26 18:32:13
 * @LastEditTime: 2020-06-26 20:14:31
--> 

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    className: {
      type: String,
      default: ""
    },
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    }
  }
};
</script>
