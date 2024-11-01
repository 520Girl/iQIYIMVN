<template>
	<div class="amx-searchP">
		<div class="amx-searchP-input">
			<SearchSCinput
				v-model:searchText.trim="searchText"
				v-model:searchResultShow="searchResultShow"
			/>
			<div class="amx-searchP-input__scroll">
				<DragLeftRight>
					<ul class="scroll_wrapper">
						<li class="s_item">
							<span>综合</span>
						</li>
					</ul>
				</DragLeftRight>
			</div>
		</div>
		<div class="amx-searchP-result">
			<h5 class="super">相关影视</h5>
			<article class="amx-searchP-result__article">
				<div>
					<HomeComponentsList />
				</div>
				<div class="article__more">
					<hr />
					<p class="flex justify-center items-center more">
						<span>展示更多</span>
						<span><var-icon name="menu-down" /></span>
					</p>
				</div>
			</article>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
definePageMeta({
	layout: "play-layout",
})
let searchText = ref<string>("")
let searchResultShow = ref(true)
const data = reactive({
	data: {
		list: [
			{
				imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
				title: "无尽神域无尽神域无尽神域无尽神域",
				description: "七峰大比正式开始七峰大比正式开始七峰大比正式开始",
				src: "https://m.iqiyi.com/v_12b7e5ue8cc.html",
				leftT: { type: 1, text: "图标" },
				rightT: { type: 3, text: "60帧|VIP" },
				rightB: { type: 3, text: "新增弹幕11万" },
				leftB: { type: 2, text: "电影" },
				more: true,
				width: 3,
				tag: "li",
				height: "153px",
				bottomT: { type: 3, text: "最新内容11条" },
			},
			{
				imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
				title: "无尽神域无尽神域无尽神域无尽神域",
				description: "七峰大比正式开始七峰大比正式开始七峰大比正式开始",
				src: "https://m.iqiyi.com/v_12b7e5ue8cc.html",
				leftT: { type: 2, text: "2024" },
				rightT: { type: 3, text: "60帧|VIP" },
				rightB: { type: 3, text: "2021期" },
				leftB: { type: 1, text: "电影" },
				more: true,
				width: 3,
				tag: "li",
				height: "153px",
				bottomT: { type: 3, text: "最新内容11条" },
			},
			{
				imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
				title: "无尽神域无尽神域无尽神域无尽神域",
				description: "七峰大比正式开始七峰大比正式开始七峰大比正式开始",
				src: "https://m.iqiyi.com/v_12b7e5ue8cc.html",
				leftT: { type: 1, text: "图标" },
				rightT: { type: 1, text: "免费解锁" },
				rightB: { type: 2, text: "新增弹幕11万" },
				leftB: { type: 1, text: "电影" },
				more: true,
				width: 3,
				tag: "li",
				height: "153px",
				bottomT: { type: 3, text: "最新内容11条" },
			},
		],
	},
})
provide("requestStatesList", data)
onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@include b(searchP) {
	height: 100vh;
	background-color: var(--amx-main-bc-simple);
	@apply overflow-y-auto;

	@include b(searchP-input) {
		@include e(scroll) {
			height: var(--amx-header-scroll-height);
			background-color: var(--amx-main-bc);
			line-height: 1;
			@apply flex justify-start items-center;
			.scroll_wrapper {
				padding: 0 12px;
				@apply inline-block h-full;
				.s_item {
					@apply inline-block h-full text-center font-medium font-sans;
					font-size: 15px;
					color: var(--amx-theme-color);
					line-height: 1;
				}
			}
		}
	}

	@include b(searchP-result) {
		padding: 16px 4px 0 4px;
		background-color: var(--amx-main-bc);
		border-top: 1px solid var(--amx-hr-color);
		.super {
			margin-left: 4px;
			@apply font-medium font-sans;
			color: var(--amx-text-active);
		}

		@include e(article) {
			.article__more {
				margin-top: 10px;

				hr {
					border-color: var(--amx-hr-color);
				}

				.more {
					padding: 17px 0;
					font-size: 14px;
				}
			}
		}
	}
}
</style>
