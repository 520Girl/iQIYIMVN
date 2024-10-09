<template>
	<div class="amx-novel-main">
		<div class="amx-novel-main__header">
			<div class="left">
				<nuxt-img src="https://varletjs.org/cat.jpg" />
				<div class="title">
					<h5 class="h5">爱奇艺巴塔</h5>
					<p class="des">
						<span>福利天天领</span>
						<span>现时免费看</span>
					</p>
				</div>
			</div>
			<div class="right">
				<span class="button">点击下载</span>
			</div>
		</div>
		<div class="amx-novel-main__aside">
			<CommonAside v-for="(item, index) in list" :item="item" :key="item.bc" />
		</div>
		<div class="amx-novel-main__List">
			<ComicComponentsList />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import ComicComponentsList from "@/components/comic/components/List.vue"
const props = defineProps({
	data: {},
})
const list = reactive([
	{
		text: "分类",
		src: 1,
		icon: "cclass",
		bc: "#ecf9df",
	},
	{
		text: "排行榜",
		src: 2,
		icon: "crank",
		bc: "#f9f3dd",
	},
	{
		text: "书架",
		src: 3,
		icon: "cbook",
		bc: "#f4f1f8",
	},
	{
		text: "下载吧塔",
		src: 4,
		icon: "cdownload",
		bc: "#f9f3dd",
	},
	{
		text: "更多",
		src: 5,
		icon: "cmore",
		bc: "#e4f7fe",
	},
])

onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@include b(novel-main) {
	padding: 15px 9px;
	@include e(header) {
		@apply flex justify-between items-center box-border;
		padding: 14px 10px;
		margin-bottom: 10px;
		background-color: #f4f0fe;
		border-radius: 8px;
		border: 1px solid #ede3fd;
		.left {
			@apply flex items-center;
			img {
				height: 42px;
				width: 42px;
				border-radius: 10px;
				@apply object-cover;
				margin-right: 5px;
			}
			.title {
				@apply flex flex-col justify-items-start;
				.h5 {
					font-size: 16px;
					@apply font-sans font-medium;
				}
				.des {
					span {
						margin-right: 5px;
						font-size: 12px;
						color: var(--amx-play-text-smail-color);
					}
				}
			}
		}
		.right {
			.button {
				background-color: #8e65ff;
				padding: 6px 10px;
				border-radius: 18px;
				font-size: 14px;
				color: #fff;
			}
		}
	}
	@include e(aside) {
		@apply flex;
		padding: 0 0 15px 0;
	}

	@include e(List) {
	}
}
</style>
