<script setup lang="ts">


</script>

<template>
	<nav>
		<router-link to="/">天气站点&nbsp;&nbsp;</router-link>
		<span>|</span>
		<router-link to="/about">&nbsp;&nbsp;绫曲推送</router-link>
	</nav>
	<router-view/>
</template>

<style scoped lang="scss">
nav {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 50px;
	font-size: 20px;
	line-height: 50px;
	margin: 0 auto;
}
</style>
