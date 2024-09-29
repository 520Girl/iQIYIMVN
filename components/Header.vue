<template>
	<header class="amx-header">
		<div class="amx-input">
			<div class="amx-input__left">
				<var-avatar src="/image/header-logo.png" :round="false">aiqiyi</var-avatar>
			</div>
			<div class="amx-input__center">
				<!-- <var-input placeholder="搜索" v-if="false"></var-input> -->
				<div class="search">
					<div class="search-input">
						<p>热搜榜</p>
						<span>(热搜榜视频)</span>
						<span>限免</span>
					</div>
					<div class="search-icon">
						<var-icon namespace="i" name="search" />
					</div>
				</div>
			</div>
			<div class="amx-input__right">
				<var-space>
					<var-icon namespace="i" name="lishijilu" />
					<var-icon name="plus" />
				</var-space>
			</div>
		</div>
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
					:class="{ activeListItem: active === index }"
					>{{ item.name }}</var-tab
				>
			</var-tabs>
			<!-- </div> -->
		</div>
	</header>
</template>
<script setup lang="ts">
import BScroll from "@better-scroll/core"
import type { BScrollInstance } from "@better-scroll/core"
const active = ref(0)
const list = reactive([
	{ name: "首页", disabled: false, ripple: false },
	{ name: "选项2", disabled: false, ripple: false },
	{ name: "选项3", disabled: false, ripple: false },
	{ name: "选项4", disabled: false, ripple: false },
	{ name: "选项5", disabled: false, ripple: false },
	{ name: "选项6", disabled: false, ripple: false },
	{ name: "选项7", disabled: false, ripple: false },
	{ name: "选项8", disabled: false, ripple: false },
	{ name: "选项9", disabled: false, ripple: false },
])
const scroll = ref<HTMLElement | null>(null)
let bs: BScroll
onMounted(() => {
	// scrollInit();
	// console.log(scroll, bs);
})
onBeforeUnmount(() => {
	// bs.destroy();
})
const scrollInit = () => {
	bs = new BScroll(scroll.value!, {
		scrollX: true,
		probeType: 3, // listening scroll event
	})
	bs.on("scrollStart", () => {
		console.log("scrollStart-")
	})
	bs.on("scroll", ({ y }: { y: number }) => {
		console.log("scrolling-", y)
	})
	bs.on("scrollEnd", () => {
		console.log("scrollingEnd")
	})
}
const handleResize = (size: number) => {
	console.log(size)
}
const handleClick = (active: string | number) => {
	console.log("click", active)
}
</script>
<style lang="scss" scoped>
@import "~/assets/virtual.icons.css";

@include b(header) {
	height: 76px;
	@include b(input) {
		@apply flex items-center justify-between;
		height: var(--amx-header-input-height);

		@include e(left) {
			width: 72px;
			@apply object-center;
			--avatar-background-color: transparent;
			--avatar-normal-size: 100%;
		}

		@include e(center) {
			padding: 0 10px 0 5px;
			max-width: 245px;
			height: 80%;
			@apply grow;

			::v-deep .var-field-decorator__middle {
				margin: 0;

				.var-input__input {
				}
			}

			.search {
				@apply flex items-center justify-between;
				box-shadow: inset 0 2px 30px 0 rgb(0 0 0 / 0.1);
				border-radius: 14.4px;
				height: 100%;

				.search-input {
					@apply flex items-center justify-center truncate;
					flex: 1 1 50%;

					p {
						@apply font-sans;
						font-size: 13px;
					}

					span {
						@apply font-sans;
						font-size: 11px;
						color: rgb(136 136 136);
					}

					span:last-child {
						font-size: 9px;
						color: #3fca80;
						padding: 0 5px 0 2px;
						background-color: rgb(24 160 88 / 10%);
						display: inline-block;
						margin-left: 5px;
					}
				}

				.search-icon {
					@apply flex items-center justify-center;
					font-size: 20px;
					color: #3fca80;
					margin-right: 5px;
				}
			}
		}

		@include e(right) {
			width: 70px;
			i:frist-child {
				font-size: 22px;
			}

			i:last-child {
				font-size: 24px;
			}
		}
	}

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
			padding-right: 35px;
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
