<script setup lang="ts">
import axios from "axios";
import {onMounted, reactive} from "vue";
import {usePositionStore} from '../stores'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps(['info'])
const position = usePositionStore()
let timer: number // 计时器
const state = reactive({
	nowTime: new Date().toLocaleString(),
})
const {nowTime} = toRefs(state)
let data = reactive({
	icon: '',
	text: '',
	temp: '',
	feelsLike: '',
	adm1: '',
	adm2: '',
	name: '',
	closeText: '',
	feelText: '',
})

function getNowTime(nowTime: any): any {
	timer = setInterval(() => {
		let date = new Date();
		nowTime.value = date.toLocaleString();
	}, 1000)
}

function send() {
	Promise.all([
		// axios.get(`https://api.qweather.com/v7/weather/now?location=${position.geoLocation}&key=a7cf9cf279f14eb1b5a5b3712323f092`),
		// axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${position.geoLocation}&key=a7cf9cf279f14eb1b5a5b3712323f092`),
		// axios.get(`https://api.qweather.com/v7/indices/1d?type=3,8&location=${position.geoLocation}&key=a7cf9cf279f14eb1b5a5b3712323f092`)])
		axios.get(`https://devapi.qweather.com/v7/weather/now?location=${position.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`),
		axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${position.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`),
		axios.get(`https://devapi.qweather.com/v7/indices/1d?type=3,8&location=${position.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`)])
			.then((response) => {

				let {data: resWeather} = response[0]
				let {now: {icon, text, temp, feelsLike}} = resWeather

				let {data: {location: resGeo}} = response[1]
				let [{adm1, adm2, name}] = resGeo

				let {data: {daily: resFeel}} = response[2]
				let [{text: closeText}, {text: feelText}] = resFeel

				data.icon = icon
				data.text = text
				data.temp = temp
				data.feelsLike = feelsLike
				data.adm1 = adm1
				data.adm2 = adm2
				data.name = name
				data.closeText = closeText
				data.feelText = feelText
			})
			.catch((err) => {
				console.log("请求失败，Api 接口请求次数已达今日上限")
				console.dir(err)
			})
}

watchEffect(() => {
	// position.geoLocation 发生变化，重新发送请求
	send()
})

onMounted(() => {
	getNowTime(nowTime)
	send()
})

onBeforeUnmount(() => {
	if (timer) {
		clearInterval(timer);
	}
})
</script>

<template>
	<!--	因为数据是异步加载的，加上 v-if="info" 可以防止在 props 还没有数据时读取到 undefined -->
	<section class="mainInfo border" v-if="info">
		<div class="top">
			<div id="location" class="border" v-text="`📍\xa0\xa0${data.adm1} ${data.adm2} ${data.name}`"></div>
			<span onclick="location.reload();" style="margin-bottom:10px">
				<el-button type="primary" plain>
					{{t('refresh')}}
				</el-button>
			</span>
			<div id="currentTime" class="border">{{ nowTime }}</div>
		</div>

		<div id="weatherIcon" class="border">
			<span id="statusNow"
			      :title="data.closeText"
			      v-html="`<i class=qi-${data.icon}></i>\n ${data.text} ${data.temp} ℃`">
			</span>
			<span id="feelLike"
			      style="font-size: 14px; width: 100%;"
			      :title="data.feelText">{{t('feelLike')}} {{data.feelsLike}} ℃
			</span>
		</div>

		<div class="otherInfo border">
      <span>
          <p id="maxTemp">{{ `🔼\xa0\xa0${info.tempMax} ℃` }}</p>
          <p id="minTemp">{{ `🔽\xa0\xa0${info.tempMin} ℃` }}</p>
      </span><span>
          <p id="now.windDir">{{ info.windDirDay }}</p>
          <p id="now.windScale">{{ `${info.windScaleDay}\xa0\xa0` }}{{t('scale')}}</p>
      </span>
			<span id="now.vis">{{t('visibility')}}<br>{{ `\n ${info.vis} km` }}</span>
			<span id="now.humidity">{{t('humidity')}}<br>{{ `\n ${info.humidity} %` }}</span>
		</div>
	</section>
</template>

<style lang="scss" scoped>

.mainInfo {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 55%;
	align-content: flex-start;
	background: #FFEEEE; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #DDEFBB, #FFEEEE); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #DDEFBB, #FFEEEE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 7%;
	line-height: 100px;
	text-align: center;
	vertical-align: center;
	width: 90%;

	span {
		font-size: 14px;
		line-height: 16px;
		height: 20px;
		text-align: center;
		cursor: pointer;
	}
}

#location {
	height: 30px;
	width: 42%;
	overflow: hidden;
	line-height: 30px;
}

#currentTime {
	overflow: hidden;
	text-align: center;
	line-height: 30px;
	height: 30px;
	width: 30%;
}

.iconDay {
	overflow: hidden;
}

.border {
	border-radius: 25px;
	border: 1px #66ccff solid;
	overflow: hidden;
	box-shadow: 7px 7px 7px #ccc;
}

#weatherIcon {
	font-size: 4em;
	overflow: hidden;
	margin: -2% 7%;
	line-height: 100px;
	text-align: center;
	vertical-align: center;
	width: 90%;
	height: 100px;

	#statusNow {
		margin-right: 7%;
	}
}

.otherInfo {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	text-align: center;
	width: 90%;
	height: 80px;
	line-height: 38px;
	margin: 7%;

	span {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 10%;
		height: 100%;

		p {
			flex: 1;
			height: 50%;
		}
	}
}
</style>
