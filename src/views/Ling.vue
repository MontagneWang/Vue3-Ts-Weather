<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {usePositionStore} from '../stores'
import axios from "axios";
import {ElMessage} from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps(['msg'])
const counter = usePositionStore()
let videoData = ref([])

function send() {
	axios.get('bili/wbi/search/type?__refresh__=true&_extra=&context=&page=1&page_size=50&order=pubdate&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=乐正绫 原创&qv_id=ynSAaNRU2PCYdvqzakmyrRVgjteo2SJi&ad_resource=5654&source_tag=3&category_id=&search_type=video&tids=30')
			.then(({data:{data:{result}}}: any)=>{
				// 数据 [{},...,{}]
				// arcurl 视频链接
				// bvid 形如"BV1HT411X7us"
				// description 简介
				// duration 时长
				// danmaku 弹幕数
				// favorites 收藏数
				// like 点赞数
				// pic 封面图
				// play 播放数
				// pubdate 投稿时间戳
				// review 评论数
				// title 标题（需要去除 <em class=\"keyword\">原创</em>）
				// tag 标签
				// author 作者
				// upic 作者头像图
				// mid 作者的UID,
				console.log(result)
			})
			.catch((err: Object) => {
				ElMessage.error('bili数据请求失败')
				console.log("bili数据请求失败")
				console.dir(err)
			})
}

onMounted(()=>{
	// send()
})
let testList = ref([{"code":0,"message":"0"},{"code":0,"message":"1"},{"code":0,"message":"2"},{"code":0,"message":"3"},{"code":0,"message":"4"},])
</script>

<template>
	<div class="video">
		<div class="border video2lines">
			<div class="border headerTitle">
				绫曲推送
			</div>
			<ul>
				<li v-for="item in testList" class="border">
					<ling-song :key="item.message" :data="item" class="border"/>
				</li>
			</ul>
		</div>
		<div class="border video1line">
			<div class="border headerTitle">
				绫曲推送
			</div>
			<ul>
				<li v-for="item in testList" class="border">
				  <ling-song :data="item"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	ul {
		margin-block-start: 0em;
		margin-inline-start: 0px;
		padding-inline-start: 0px;
	}
	.border {
		border-radius: 25px;
		border: 1px #66ccff solid;
		overflow: hidden;
	}
	.video{
		margin: 3% 0 3% 16%;
	}
	.headerTitle{
		height: 50px;
		margin: 2vw;
	}
	.video2lines{
		text-align: center;
		display: inline-block;
		vertical-align:top;
		width: 60%;
		ul{
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;

			li{
				width: 40%;
				height: 22vh;
				margin-bottom: 5%;
			}
		}
	}
	.video1line{
		display: inline-block;
		text-align: center;
		vertical-align:top;
		margin-left: 4%;
		width: 30%;

			li{
				margin: 0 auto 10%;
				width: 80%;
				height: 22vh;
			}
	}
</style>
