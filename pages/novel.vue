<template>
	<div class="amx-index">
		<!-- Header -->
		<Header />
		<main class="amx-index-main" ref="main">
			<DragRefurbish
				@scrollHandler="scrollHandler"
				:requestHandler="requestHandler"
				v-model:requestStates="requestStates"
			>
				<template #content>
					<Home ref="homeContent">
						<template #default>
							<Novel :data="11223"></Novel>
						</template>
					</Home>
				</template>
			</DragRefurbish>
		</main>
		<!-- <Banner /> -->

		<!-- Content Grid -->
		<!-- <ContentGrid /> -->

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script setup lang="ts">
useHead({
	title: "小说",
}) // Set page title
import Header from "@/components/Header.vue" // Import Header component
import Novel from "@/components/novel/index.vue"
import Footer from "@/components/Footer.vue" // Import Footer component
import { onMounted, ref } from "vue"

const main = ref<HTMLDivElement | null>(null)
const homeContent = ref<any>(null) // 引用子组件
const requestStates = reactive({
	done: false, // 请求状态
	data: {}, // 请求结果
}) // 请求状态

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

onMounted(async () => {
	await nextTick()
	// dragInit()
})
onUnmounted(() => {
	// bs.destroy() // 销毁 BetterScroll 实例
})
</script>
<style lang="scss" scoped>
@import url("~/assets/css/common/pageMain.scss");
</style>
