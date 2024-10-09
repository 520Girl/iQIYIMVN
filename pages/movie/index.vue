<template>
	<div class="amx-index">
		<!-- Header -->
		<Header />
		<!-- {{ requestStates.data?.list[0] ?? [] }} -->
		<main class="amx-index-main" ref="main">
			<DragRefurbish
				@scrollHandler="scrollHandler"
				:requestHandler="requestHandler"
				v-model:requestStates="requestStates"
			>
				<template #content>
					<component :is="Movie" ref="homeContent" />
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
	title: "首页",
}) // 调用 useHead() 钩子函数
import Header from "@/components/Header.vue" // Import Header component
import Movie from "@/components/movie/index.vue"
import Footer from "@/components/Footer.vue" // Import Footer component
import type { Item } from "@/types/api"
import { onMounted, ref } from "vue"
import { useGetList } from "@/hooks/useGetList"

const main = ref<HTMLDivElement | null>(null)
const homeContent = ref<any>(null) // 引用子组件
const requestStates = reactive<{ done: boolean; data: Item }>({
	done: false, // 请求状态
	data: {}, // 请求结果
})

// 监听滚动条位置
const scrollHandler = ({ y, x }: { y: number; x: number }) => {
	homeContent.value.scrollTo(y) // 调用子组件的方法来设置 scrollTop
	// console.log('接收子组件传递的方法', y, x)
}

//! 1. 获取列表数据
const { getList } = useGetList()
const data = await getList({ pagesize: 9 })
const route = useRoute()
const { query } = toRefs(route)
console.log("data", data)
requestStates.data = data
requestStates.done = true // 请求完成
provide("requestStatesList", requestStates)
const requestHandler = async (params: { page: number; class?: string | undefined }) => {
	requestStates.done = false // 显示请求状态
	//当出现了分类切换的情况时候，需要传入分类参数
	return await getList({
		ac: "list",
		pagesize: 9,
		pg: params.page,
		class: params.class || query.value.class,
	})
}
watch(
	() => requestStates.data,
	(newVal, oldVal) => {
		console.log("请求结果", newVal, oldVal)
	}
)
</script>
<style lang="scss" scoped>
@import url("~/assets/css/common/pageMain.scss");
</style>
