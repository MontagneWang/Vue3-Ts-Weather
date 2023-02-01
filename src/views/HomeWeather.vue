<script setup lang="ts">
import axios from "axios";


let weatherInfo = []
let chartInfo = []
let geoLocation = 101210101

onMounted(()=>{
	axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`)
			.then(({data: {daily: Info}}: { data: any }) => {
				weatherInfo = Info
				console.log(weatherInfo)
				chartInfo = [weatherInfo[0].tempMax, weatherInfo[1].tempMax, weatherInfo[2].tempMax, weatherInfo[0].tempMin, weatherInfo[1].tempMin, weatherInfo[2].tempMin]
			})
			.catch((err: any) => {
				console.log("请求失败，Api 接口请求次数已达今日上限")
				console.dir(err)
			})
})


// watch: {
// 	geoLocation: {
// 		handler()
// 		{
// 			this.send()
// 		}
// 	}
// }
// mounted()
// {
// 	console.log("地图接口使用 [高德] ，天气接口使用 [和风天气] 。\n" +
// 			"您可以点击 [🔄更新天气] 按钮获取最新数据，也可以点击右下角的 [🌓] 按钮进行模式切换。")
//
// 	function addDarkmodeWidget() {
// 		const darkmode = new Darkmode({
// 			label: '🌓', // default: ''
// 		});
// 		darkmode.showWidget();
// 		new Darkmode().showWidget();
// 	}
//
// 	window.addEventListener('load', addDarkmodeWidget);
//
// 	this.send()
// }

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
