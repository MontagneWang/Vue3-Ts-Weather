<script setup lang="ts">
import {ref} from 'vue'
import {useCounterStore} from '../stores'

const props = defineProps(['msg'])
const counter = useCounterStore()
console.log(props.msg)
</script>

<template>
	<h1>Ling</h1>
	<button type="button" @click="counter.increment()">count is {{ counter.count }}</button>
	<div>{{ msg }}</div>
</template>

<style scoped lang="scss">

</style>
