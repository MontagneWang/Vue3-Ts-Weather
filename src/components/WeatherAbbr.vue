<template>
<!--	因为数据是异步加载的，加上 v-if="info" 可以防止在 props 还没有数据时读取到 undefined -->
	<div id="tomorrow" class="border" v-if="info">
    <span class="fxDate"
          v-text="`${info.fxDate}`"
    >
    </span>
		<span class="iconDay"
		      v-html="`<i class=qi-${info.iconDay}></i>\xa0\xa0${info.textDay}`"
		>
		</span>
		<span class="tempMax"
		      v-text="`🔼\xa0\xa0${info.tempMax} ℃\xa0\xa0\xa0🔽\xa0\xa0${info.tempMin} ℃`"
		>
		</span>
		<span class="tempMin"
		      v-text="`${info.windDirDay}\xa0\xa0\xa0${info.windScaleDay} 级`"
		>
		</span>
	</div>
</template>

<script>
export default {
	name: "WeatherAbbr",
	props: ['info'],
}
</script>

<style lang="scss" scoped>
div {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 20%;
	margin-left: 3%;
}

span {
	width: 100%;
	height: 20%;
}

#tomorrow, #twoDays {
	background: #2980B9; /* fallback for old browsers */
	background: -webkit-linear-gradient(to top, #FFFFFF, #66ccff); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to top, #FFFFFF, #66ccff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


	span:nth-child(2) {
		flex: 2;
		line-height: 80px;
		font-size: 2em;
	}
}
</style>
