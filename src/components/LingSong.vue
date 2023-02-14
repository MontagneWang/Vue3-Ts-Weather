<script lang="ts" setup>
defineProps<{ data: object }>()

</script>

<template>
	<div class="song">
		<div class="pic">

		</div>
		<div class="info">
		<div class="avatar">

		</div>
		<div class="words">
			<div class="title"></div>
			<div class="author"></div>
			<div class="pubtime"></div>
		</div>
	</div>
	</div>
</template>

<style lang="scss" scoped>
	.song{
		width: 100%;
		height: 100%;
		img{
			width: 100%;
		}
		.pic{
			width: 100%;
			height: 100%;
		}
		.info{
			width: 100%;
			height: 30%;
		}
	}
</style>
