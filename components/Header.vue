<template>
	<header class="amx-header">
		<Search />
		<div class="amx-scroll">
			<div class="amx-scroll__nav">
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
						:class="{ activeListItem: active === index }"
					>
						<nuxt-link :to="item.src">
							{{ item.name }}
						</nuxt-link>
					</var-tab>
				</var-tabs>
			</div>
			<div class="amx-scroll__bar">
				<SvgIcon name="svgo-menu" class="more-btn__icon" @click="barClick" />
			</div>
		</div>
		<HeadBarNav v-model="barNavShow" v-model:active="active" />
	</header>
</template>
<script setup lang="ts">
// import BScroll from "@better-scroll/core"
import useSetHead from "~/hooks/useSetHead"
import Search from "./search.vue"
const store = useHomeStore()
const navMap = store.getNavArr
// const { data, pending, error, refresh } = await useAsyncData('dragAsyncData2', () => $fetch(`${import.meta.env.VITE_API_URL || process.env.NUXT_API_URL}/api.php/Aqiyim/homeBase`))

const { params } = toRefs(useRoute())
//判断当前页面选中状态确定
const currentNavIndex = store.currentNav.findIndex(item => item.id === Number(params.value.type_id))
const active = ref(currentNavIndex === -1 ? 0 : currentNavIndex)
let list = reactive(store.currentNav)
const barNavShow = ref(false)
//! 1.2 设置头部 这样写是为了实现作用域的缓存方便在函数中调用自定义hooks，

watch(
	() => params.value.type_id,
	() => {
		//! 设置title
		const currentNav = navMap.find(item => item.id === Number(params.value.type_id))
		if (currentNav) {
			useHead({
				title: currentNav?.name,
				meta: [
					{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
					{ name: "keywords", content: currentNav?.key },
					{ name: "description", content: currentNav?.desc },
					{ name: "author", content: store.getHomeSeo.name },
				],
			}) // Set page title
		}
	}
)
const handleClick = () => {
	console.log("handleClick", active.value)
	// getSlider()
	// console.log(route)
}
const barClick = () => {
	barNavShow.value = !barNavShow.value
}
</script>
<style lang="scss" scoped>
@include b(header) {
	height: 76px;

	@include b(scroll) {
		// --tabs-padding:50px;
		@apply w-full h-full flex items-center justify-between overflow-hidden;
		height: var(--amx-header-scroll-height);
		background-color: var(--amx-bc);

		.activeListItem {
			font-size: 16px;
			transition: font-size 0.2s;
			color: #000;
			@apply font-semibold;
		}

		.var-tabs--layout-horizontal-padding {
			// padding-right: 35px;
		}

		@include e(nav) {
			width: calc(100% - var(--amx-header-scroll-bar-width));
			@apply box-border h-full;
			--tabs-padding: 0px;
			padding: 0 0 0 12px;
		}

		@include e(bar) {
			width: var(--amx-header-scroll-bar-width);
			// background-color: red;
			@apply box-border h-full text-center flex justify-center items-end cursor-pointer;

			font-size: 32px;

			svg {
				margin-bottom: 2px;
			}
		}

		@include b(scrollWrapper) {
			white-space: nowrap;
			overflow: hidden;
		}

		@include e(scrollContent) {
			// display: inline-block;
			box-shadow: none;
		}
	}
}
</style>
