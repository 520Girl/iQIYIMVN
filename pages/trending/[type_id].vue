<template>
	<div class="amx-trending">
		<div class="amx-trending-header">
			<HeadLeftCenterRight>
				<template #left>
					<var-icon name="chevron-left" size="28px" @click="$router.go(-1)" />
				</template>
			</HeadLeftCenterRight>
		</div>
		<div class="amx-trending-content">
			<div class="amx-trending-content__classify">
				<div class="amx-trending-content__classify__bg">
					<DragLeftRight>
						<ul class="bg__item item-wrapper">
							<li class="item active">全部</li>
							<li
								class="item"
								:class="active == index ? 'active' : ''"
								v-for="(item, index) in 10"
								@click="clickActive(index)"
							>
								视剧{{ index }}
							</li>
						</ul>
					</DragLeftRight>
				</div>
				<div class="amx-trending-content__classify__sm">
					<div class="sm__slide_wrapper">
						<DragLeftRight>
							<ul class="sm__item item-wrapper">
								<li class="item active" ref="listLi">类型</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
								<li class="item">古装</li>
							</ul>
						</DragLeftRight>
					</div>
					<div class="sm__slide_wrapper" ref="classify3">
						<ul class="sm__item item-wrapper">
							<li class="item active">地区</li>
							<li class="item">内地</li>
							<li class="item">中国香港</li>
						</ul>
					</div>
				</div>
				<div class="amx-trending-content__classify__info">
					<ul class="flex items-center justify-start">
						<li class="info_item info_active">
							<span>综合排序</span>
						</li>
						<li class="info_item flex items-center"><span>最新</span></li>
						<li class="info_item"><span>最热</span></li>
						<li class="info_item"><span>高分</span></li>
					</ul>
				</div>
			</div>
			<div class="amx-trending-content__list">
				<HomeComponentsList />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
definePageMeta({
	layout: "play-layout",
})

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
				leftT: { type: 1, text: "图标" },
				rightT: { type: 3, text: "60帧|VIP" },
				rightB: { type: 2, text: "新增弹幕11万" },
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
const active = ref(0)
data.data.list.push(...data.data.list, ...data.data.list, ...data.data.list)
provide("requestStatesList", data)

//点击选中
const clickActive = (index: number) => {
	active.value = index
}
</script>
<style scoped lang="scss">
@import "@/assets/css/page/trending.scss";
</style>
