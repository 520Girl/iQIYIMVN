<template>
	<div class="amx-homeMain">
		<div>
			<Swipe
				ref="swipe"
				:style="translateY.swipe ? `transform: translate3d(0,${translateY.swipe}px,0)` : ''"
			>
			</Swipe>
			<div
				ref="homeMain"
				:style="translateY.content ? `transform: translate3d(0,${translateY.content}px,0)` : ''"
			>
				<slot>
					<HomeComponentsList />
				</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import Swipe from "@/components/Swipe.vue"
const translateY = reactive({
	content: 0,
	swipe: 0,
})
const homeMain = ref<HTMLDivElement>()
//拖拽事件 用作错位拖动
const scrollTo = (scrollTo: number) => {
	// console.log(scrollTo)
	const { top } = homeMain.value?.getBoundingClientRect() || { top: 0 }
	const headerTop = document.getElementsByTagName("header")[0].clientHeight
	if (scrollTo < 0 && top >= headerTop) {
		translateY.content = parseInt(scrollTo.toString())
		translateY.swipe = parseInt((scrollTo / 4).toString())
	}
	if (scrollTo > 0) {
		translateY.content = translateY.swipe = 0
	}
}
defineExpose({
	scrollTo,
})

onMounted(() => {})
</script>
<style scoped lang="scss"></style>
