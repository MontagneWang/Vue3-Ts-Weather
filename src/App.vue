<script setup lang="ts">

</script>

<template>
	<nav>
		<router-link to="/">天气站点&nbsp;&nbsp;</router-link>
		<span>|</span>
		<router-link to="/about">&nbsp;&nbsp;绫曲推送</router-link>
	</nav>
	<router-view v-slot="{ Component }">
		<keep-alive>
			<Component :is="Component" />
		</keep-alive>
	</router-view>
<!--	这样无法缓存页面 -->
<!--	<keep-alive>-->
<!--		<router-view/>-->
<!--	</keep-alive>-->
</template>

<style scoped lang="scss">
nav {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 50px;
	font-size: 20px;
	line-height: 50px;
	text-align: center;
	margin: 0 auto;
}
</style>
