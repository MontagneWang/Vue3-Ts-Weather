<script setup lang="ts">
import axios from "axios";
import {usePositionStore} from '../stores'
// @ts-ignore
import Darkmode from 'darkmode-js'

const position = usePositionStore()
let weatherInfo = ref([])
let chartInfo = ref([])

function send() {
	axios.get(`https://api.qweather.com/v7/weather/3d?location=${position.geoLocation}&key=a7cf9cf279f14eb1b5a5b3712323f092`)
			.then(({data: {daily: Info}}: { data: any }) => {
				// 直接写 weatherInfo 是没有用的，需要写上 .value
				weatherInfo.value = Info
				chartInfo.value = [weatherInfo.value[0]['tempMax'],
					weatherInfo.value[1]['tempMax'],
					weatherInfo.value[2]['tempMax'],
					weatherInfo.value[0]['tempMin'],
					weatherInfo.value[1]['tempMin'],
					weatherInfo.value[2]['tempMin']]
			})
			.catch((err: Object) => {
				console.log("请求失败，Api 接口请求次数已达今日上限")
				console.dir(err)
			})
}

watchEffect(() => {
	// position.geoLocation 发生变化，重新发送请求
	send()
})

onMounted(() => {
	console.log("地图接口使用 [高德] ，天气接口使用 [和风天气] 。\n" + "您可以点击 [🔄更新天气] 按钮获取最新数据，也可以点击右下角的 [🌓] 按钮进行模式切换。")
	send()
	function addDarkmodeWidget() {
		const darkmode = new Darkmode({
			label: '🌓', // default: ''
		});
		darkmode.showWidget();
		new Darkmode().showWidget();
	}
	window.addEventListener('load', addDarkmodeWidget);
})
</script>

<template>
	<div id="app">
		<nav class="topInfo">
			<WeatherInfo :info="weatherInfo[0]"/>
			<WeatherMap/>
		</nav>

		<footer class="future">
			<WeatherAbbr :info="weatherInfo[1]"/>
			<WeatherAbbr :info="weatherInfo[2]"/>
			<WeatherChart :info="chartInfo"/>
		</footer>
	</div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 720px) {
	body, .future {
		margin-top: 15% !important;
	}

	.map {
		display: none;
	}

	.topInfo {
		margin-top: 10%;
	}

	.mainInfo {
		width: 100% !important;
	}

	#weatherIcon span {
		font-size: 1em;
	}

}

@media screen and (max-width: 900px) {
	#currentTime, #tomorrow, #twoDays {
		display: none;
	}

	#weatherIcon span {
		font-size: .8em;
	}

	#chart {
		margin: 0 !important;
		width: 100% !important;
	}
}

@media screen and (max-width: 1200px) {
	#feelLike {
		display: none;
	}
}

* {
	padding: 0;
	margin: 0;
}

.border {
	border-radius: 25px;
	border: 1px #66ccff solid;
	overflow: hidden;
	box-shadow: 7px 7px 7px #ccc;
}

body {
	min-width: 320px;
	max-width: 1260px;
	height: 100%;
	box-sizing: border-box;
}

.topInfo {
	display: flex;
	justify-content: space-between;
	margin: 2.5% 15%;
}

.future {
	display: flex;
	margin: -1% 15%;
	width: 70%;
	height: 200px;
	text-align: center;
	vertical-align: center;
	line-height: 40px;
}
</style>
