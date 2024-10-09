<template>
	<div class="amx-novel-m-l">
		<div v-for="(item, index) in list" :key="index" class="amx-novel-m-l__article">
			<p class="title">{{ item.title }}</p>
			<ul class="amx-novel-m-l__list">
				<li class="amx-ListItem" v-for="(data, index2) in item.data" :key="index2">
					<div class="amx-ListItem__img">
						<a
							:href="data.src"
							:title="data.title"
							rel=""
							class="link"
							:style="'background-image:url(' + data.imgUrl + ');'"
						>
							<template v-if="data.rightT?.type === 1 || data.rightT?.type === 2">
								<div :class="'c-rt c-rt-' + data.rightT?.type">
									{{ data.rightT?.text }}
								</div>
							</template>
						</a>
					</div>
					<div class="amx-ListItem__title">
						<div class="c-title text-ellipsis">
							<a href="//m.iqiyi.com/v_12b7e5ue8cc.html" title="喜剧之王单口季">
								{{ data.title }}
							</a>
						</div>
						<div class="c-info text-ellipsis">
							<a href="//m.iqiyi.com/v_12b7e5ue8cc.html" title="小鹿犀利解构容貌焦虑">
								{{ data.description }}
							</a>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="amx-novel-m-l__more">
			<div class="more-btn">
				<SvgIcon name="svgo-cplay" class="more-btn__icon" />
				<span class="more-btn__text">更多推荐</span>
			</div>
			<div class="refresh-btn">
				<SvgIcon name="svgo-crefresh" class="more-btn__icon" />
				<span class="more-btn__text">换一批</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import type { NovelList, NItem, NovelItem } from "@/types/api/index"
const props = withDefaults(defineProps<{ list?: NovelList }>(), {
	list: () => [
		{
			title: "最近在读",
			data: [
				{
					imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
					title: "天龙八部",
					description: "这是一部好看",
					src: "",
					rightT: {
						type: 1,
						text: "漫画",
					},
				},
				{
					imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
					title: "天龙八部",
					description: "这是一部好看",
					src: "",
					rightT: {
						type: 1,
						text: "漫画",
					},
				},
				{
					imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
					title: "天龙八部",
					description: "这是一部好看",
					src: "",
					rightT: {
						type: 1,
						text: "漫画",
					},
				},
				{
					imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
					title: "天龙八部",
					description: "这是一部好看",
					src: "",
					rightT: {
						type: 1,
						text: "漫画",
					},
				},
				{
					imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
					title: "天龙八部",
					description: "这是一部好看",
					src: "",
					rightT: {
						type: 1,
						text: "漫画",
					},
				},
			],
		},
	],
})

onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@import "/assets/css/mixin.scss";
@include ListItem_1;

@include b(novel-m-l) {
	padding: 0 4px 0 4px;
	@apply w-full box-border;
	.title {
		@apply flex text-lg p-7;
		padding: 0 15px 12px 5px;
	}

	@include e(list) {
		@apply w-full;
	}
	.amx-ListItem {
		@apply inline-block w-1/3 box-border;
		padding: 0 5px;
	}
	@include e(more) {
		@apply flex justify-between items-center box-border w-full flex-row;
		padding: 8px 2px;
	}
	.more-btn {
		margin-right: 8px;
		@apply box-border text-center flex items-center justify-center;
		width: 50%;
		background-color: #f2f5fa;
		font-size: 15px;
		padding: 5px 0;
	}
	.refresh-btn {
		@apply box-border text-center flex items-center justify-center;
		width: 50%;
		background-color: #f2f5fa;
		border-radius: 4px;
		font-size: 15px;
		padding: 5px 0;
	}
	.more-btn__text {
		margin-left: 2px;
	}
	.more-btn__icon {
	}
}
</style>
