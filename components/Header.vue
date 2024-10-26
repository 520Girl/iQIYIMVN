<template>
	<header class="amx-header">
		<Search />
		<div class="amx-scroll">
			<!-- <div class="amx-scrollWrapper" ref="scroll"> -->
			<!-- <var-tabs elevation class="amx-scroll__scrollContent" color="var(--color-primary)"
                active-color="var(--color-on-primary)" inactive-color="var(--color-on-info)" v-model:active="active"> -->
			<var-tabs
				@click="handleClick"
				elevation
				disabled
				class="amx-scroll__scrollContent"
				active-color="#000"
				inactive-color="#000"
				indicator-size="0"
				v-model:active="active"
			>
				<var-tab
					v-for="(item, index) in list"
					:key="item.name"
					:ripple="item.ripple"
					:disabled="item.disabled"
					:class="{ activeListItem: activeLi === index }"
				>
					<nuxt-link :to="item.src">
						{{ item.name }}
					</nuxt-link>
				</var-tab>
			</var-tabs>
			<!-- </div> -->
		</div>
	</header>
</template>
<script setup lang="ts">
// import BScroll from "@better-scroll/core"
import useSetHead from "~/hooks/useSetHead"
import Search from "./search.vue"
const store = useHomeStore()
// const { data, pending, error, refresh } = await useAsyncData('dragAsyncData2', () => $fetch(`${import.meta.env.VITE_API_URL || process.env.NUXT_API_URL}/api.php/Aqiyim/homeBase`))

const route = useRoute()
const scroll = ref<HTMLElement | null>(null)
// let bs: BScroll
const active = ref(0)
let list = reactive(store.getNavArr)
//! 1.2 设置头部 这样写是为了实现作用域的缓存方便在函数中调用自定义hooks，
const { setHeader } = useSetHead()
setHeader()
//! 1.3 设置swiper

//!1.3 路由切换选中状态切换
const activeLi = computed(() => {
	const path = route.path
	const index = list.findIndex(item => item.src === path)
	return index > -1 ? index : ""
})
// console.log(import.meta.env.VITE_API_URL || process.env.NUXT_API_URL)

onMounted(() => {
	// scrollInit();
	// console.log(scroll, bs);
})
onBeforeUnmount(() => {
	// bs.destroy();
})
const scrollInit = () => {
	// bs = new BScroll(scroll.value!, {
	// 	scrollX: true,
	// 	probeType: 3, // listening scroll event
	// })
	// bs.on("scrollStart", () => {
	// 	console.log("scrollStart-")
	// })
	// bs.on("scroll", ({ y }: { y: number }) => {
	// 	console.log("scrolling-", y)
	// })
	// bs.on("scrollEnd", () => {
	// 	console.log("scrollingEnd")
	// })
}
const handleResize = (size: number) => {
	console.log(size)
}
const handleClick = () => {
	// getSlider()
	// console.log(route)
}
</script>
<style lang="scss" scoped>
@include b(header) {
	height: 76px;

	@include b(scroll) {
		// --tabs-padding:50px;
		width: 100%;
		overflow: hidden;
		height: var(--amx-header-scroll-height);

		.activeListItem {
			font-size: 17px;
			transition: font-size 0.2s;
			color: #000;
			@apply font-semibold;
		}

		.var-tabs--layout-horizontal-padding {
			// padding-right: 35px;
		}

		@include b(scrollWrapper) {
			white-space: nowrap;
			overflow: hidden;
		}

		@include e(scrollContent) {
			display: inline-block;
			box-shadow: none;
		}
	}
}
</style>
