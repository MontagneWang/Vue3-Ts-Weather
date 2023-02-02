<script setup lang="ts">
import {ref} from 'vue'
import {usePositionStore} from '../stores'

const props = defineProps(['msg'])
const counter = usePositionStore()
</script>

<template>
	<h1>Ling</h1>
	<button type="button" @click="counter.increment()">count is {{ counter.count }}</button>
	<div>{{ msg }}</div>
</template>

<style scoped lang="scss">

</style>
