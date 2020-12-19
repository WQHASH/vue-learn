<!--
 * @Description: 
 * @Author: wangqi
 * @Date: 2020-05-29 17:18:31
 * @LastEditTime: 2020-12-19 20:32:38
-->
<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style lang="scss">
@import '@/style/variables';
@import '@/style/common';
#app {
	width: 100%;
	height: 100%;
}
</style>
<script>
export default {
	mounted() {
		// 在页面加载时读取sessionStorage里的状态信息
		// if (sessionStorage.getItem('store')) {
		// 	this.$store.replaceState(
		// 		Object.assign(
		// 			{},
		// 			this.$store.state,
		// 			JSON.parse(sessionStorage.getItem('store'))
		// 		)
		// 	);
		// }
		//在页面刷新时将vuex里的信息保存到sessionStorage里
		// window.addEventListener('beforeunload', () => {
		// 	sessionStorage.setItem('store', JSON.stringify(this.$store.state));
		// });
	},
};
</script>
