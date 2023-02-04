<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {usePositionStore} from '../stores'
import axios from "axios";
import {ElMessage} from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps(['msg'])
const counter = usePositionStore()

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
</script>

<template>
	<div>
		<h1>{{ t('Ling1') }}</h1>
		<h1>{{ t('Ling2') }}</h1>
		<div>
			尝试着使用了一些新的东西<br />
			Vue3 + TypeScript + Sass + Element-plus + Vite + Pinia + Vue-router
		</div>
	</div>
</template>

<style scoped lang="scss">
	div{
		text-align: center;
		margin-top: 20vh;
	}
</style>
