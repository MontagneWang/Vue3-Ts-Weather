<script setup lang="ts">
const props = defineProps(['info'])
import * as echarts from "echarts"

function callEcharts(max1: string,
                     max2: string,
                     max3: string,
                     min1: string,
                     min2: string,
                     min3: string):void {
	const charEle = document.getElementById('chart') as HTMLElement;
	let myChart = echarts.init(charEle)
	let option = {
		grid: {
			x: 30,
			y: 35,
			x2: 20,
			y2: 25,
			borderWidth: 1
		},
		title: {
			text: ' 气温走向',
		},
		xAxis: {
			data: ['今天', '明天', '后天',],
		},
		yAxis: {
			scale: true,
		},
		legend: {
			data: ['最高温度', '最低温度']
		},
		series: [
			{
				name: '最高温度',
				type: 'line',
				data: [max1, max2, max3],
				label: {
					show: true,
					position: 'top',
					textStyle: {
						fontSize: 16
					}
				},
			},
			{
				name: '最低温度',
				type: 'line',
				data: [min1, min2, min3],
				label: {
					show: true,
					position: 'top',
					textStyle: {
						fontSize: 12
					}
				},
				lineStyle: {
					normal: {
						color: 'green',
						type: 'dashed'
					}
				},
			}
		]
	}

	myChart.setOption(option)

	// echarts的图表只绘制一次，需要在更改窗口大小后重新绘制
	window.onresize = function () {
		myChart.resize()
	}
}

onUpdated(() => {
	callEcharts(props.info[0], props.info[1], props.info[2], props.info[3], props.info[4], props.info[5])
})


</script>

<template>
	<div id="chart" class="darkmode-ignore border" v-if="info">
		图表正在加载 ……
	</div>
</template>

<style lang="scss" scoped>
#chart {
	margin-left: 7%;
	height: 100%;
	width: 60%;
	text-align: center;
	vertical-align: center;
	font-size: 3em;
	line-height: 200px;
	background: url("../assets/233.png") no-repeat bottom;
	background-size: 100% 100%;
}
</style>
