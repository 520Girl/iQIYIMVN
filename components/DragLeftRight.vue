<template>
	<div class="overflow-hidden w-full" ref="dragLeftRight">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"

const dragLeftRight = ref<HTMLElement | null>(null)
let bs: BScroll
const scrollInit = () => {
	bs = new BScroll(dragLeftRight.value!, {
		scrollX: true,
		bounceTime: 300,
		momentum: true,
		click: true, // 启用点击事件
		probeType: 3, // 探测类型，3表示全量探测，即每次滚动都触发事件
	})
	bs.on("scrollEnd", (data: any) => {
		console.log("scrollEnd", data, bs)
	})
}
onMounted(async () => {
	await nextTick()
	scrollInit()
})
</script>
<style scoped lang="scss"></style>
