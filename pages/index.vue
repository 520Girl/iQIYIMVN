<template>
	<div class="amx-index">
		<!-- Header -->
		<Header />
		<main class="amx-index-main" ref="main">
			<dragRefurbish
				@scrollHandler="scrollHandler"
				:requestHandler="requestHandler"
				v-model:requestStates="requestStates"
			>
				<template #content>
					<component :is="Home" ref="homeContent" />
				</template>
			</dragRefurbish>
		</main>
		<!-- <Banner /> -->

		<!-- Content Grid -->
		<!-- <ContentGrid /> -->

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue" // Import Header component
import Home from "@/components/home/index.vue"
import Footer from "@/components/Footer.vue" // Import Footer component
import { onMounted, ref } from "vue"
import BScroll from "@better-scroll/core"
import PullDown from "@better-scroll/pull-down"

const main = ref<HTMLDivElement | null>(null)
const homeContent = ref<any>(null) // 引用子组件
const requestStates = reactive({
	done: false, // 请求状态
	data: {}, // 请求结果
}) // 请求状态
let bs: BScroll

// 监听滚动条位置
const scrollHandler = ({ y, x }: { y: number; x: number }) => {
	homeContent.value.scrollTo(y) // 调用子组件的方法来设置 scrollTop
	// console.log('接收子组件传递的方法', y, x)
}

//异步请求数据
const requestHandler = async () => {
	requestStates.done = false // 显示请求状态
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("数据请求成功")
		}, 2000)
	})
}

const dragInit = () => {
	bs = new BScroll(main.value!, {
		probeType: 3,
		click: true,
		bounce: { top: true }, //开启回弹
	})
	bs.on("scrollStart", () => {
		console.log("scrollStart-")
	})
	bs.on("scroll", ({ y }: { y: number }) => {
		homeContent.value.scrollTo(y) // 调用子组件的方法来设置 scrollTop
	})
	bs.on("scrollEnd", ({ x, y }: { x: number; y: number }) => {
		console.log("结束", x, y)
	})
}
onMounted(async () => {
	await nextTick()
	// dragInit()
})
onUnmounted(() => {
	// bs.destroy() // 销毁 BetterScroll 实例
})
</script>
<style lang="scss" scoped>
@include b(index) {
	@apply flex flex-col;
	height: 100vh;
}

@include b(index-main) {
	flex: 1;
	overflow: auto;
	/* 隐藏滚动条的样式 */
	// scrollbar-width: none;
	// /* Firefox */
	// -ms-overflow-style: none;
	/* Internet Explorer 和 Edge */
	height: calc(100vh - (var(--amx-header-input-height) + var(--amx-header-scroll-height)));
}

// main::-webkit-scrollbar {
// 	display: none;
// 	/* Safari 和 Chrome */
// }
</style>
