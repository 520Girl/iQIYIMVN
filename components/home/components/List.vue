<template>
	<ul class="amx-home-list">
		<CommonListItem v-for="(item, index) in list" :key="item.vod_id" :="item"></CommonListItem>
		<!-- <li v-for="(item, index) in list" :key="index">
			<div class="amx-home-list__img">
				<a
					:href="item.src"
					:title="item.title"
					rel=""
					class="link"
					:style="'background-image:url(/home/' + item.imgUrl + ');'"
				>
					<div class="c-rt">
						{{ item.vip ? "会员" : "免费" }}
					</div>
					<div class="c-lb">{{ item.type }}</div>
					<div class="c-rb">
						<span class="c-date"
							>
							{{ item.score }}
						</span>
					</div>
					<div class="c-lt">
						<var-icon name="star-outline" />
					</div>
				</a>
			</div>
			<div class="amx-home-list__title">
				<div class="c-title text-ellipsis">
					<a href="//m.iqiyi.com/v_12b7e5ue8cc.html" title="喜剧之王单口季">
						{{ item.title }}
					</a>
				</div>
				<div class="c-info text-ellipsis">
					<a href="//m.iqiyi.com/v_12b7e5ue8cc.html" title="小鹿犀利解构容貌焦虑">
						{{ item.description }}
					</a>
					<div class="more">
						<var-icon name="dots-vertical" />
					</div>
				</div>
			</div>
		</li> -->
	</ul>
</template>

<script lang="ts" setup>
import { ref, reactive, type Reactive } from "vue"
import type { ListItemApi, ListItem } from "@/types/api/index"
import Vod_id from "~/pages/movie/play/[type_id]/[vod_id].vue"
// const props = withDefaults(defineProps<Props>(), {
//     imgUrl: '',
//     title: '',
//     description: '',
//     NoDrama: false,
//     onlyWatch: false,
//     part: 0,
//     vip: false
// })
//! 接收父组件传过来的list 数据
const props = inject<{ data: Reactive<{ list: ListItemApi[]; page: number }> }>("requestStatesList")
console.log("propsList", props)
console.log("4444", props?.data)
const { path } = useRoute()
const store = useHomeStore()
const navClass = store.getNavClass || new Map()

const changeList = () => {
	let newArrList: ListItem[] | undefined = []
	switch (path) {
		case "/":
			console.log("首页", navClass)
			newArrList = props?.data?.list.map((item: ListItemApi) => {
				let obj = {
					imgUrl: item.vod_pic,
					title: item.vod_name,
					description: item.vod_content.replace(/<[^>]*>/g, ""),
					leftT: { type: 1, text: "图标" },
					rightT: { type: 1, text: item.vod_lang },
					rightB: { type: 1, text: item.vod_score },
					leftB: { type: 1, text: item.type_name },
					bottomT: { type: 1, text: item.vod_tag.replace(/,/g, "|") },
					src: `play/${item.type_id}/${item.vod_id}`,
					vod_id: item.vod_id,
					tag: "li",
					more: true,
				}
				return obj
			})
	}
	return newArrList
}

const list = reactive<ListItem[]>([
	// {
	// 	imgUrl: "/home/4274bd8105cc43dab19b180dadeafac4.webp",
	// 	title: "无尽神域无尽神域无尽神域无尽神域",
	// 	description: "七峰大比正式开始七峰大比正式开始七峰大比正式开始",
	// 	src: "https://m.iqiyi.com/v_12b7e5ue8cc.html",
	// 	leftT: { type: 1, text: "图标" },
	// 	rightT: { type: 3, text: "60帧|VIP" },
	// 	rightB: { type: 2, text: "新增弹幕11万" },
	// 	leftB: { type: 1, text: "电影" },
	// 	more: true,
	// 	width: 3,
	// 	tag: "li",
	// 	bottomT: { type: 2, text: "最新内容11条" },
	// },
])
list.push(...changeList()!)
console.log(list)

onMounted(() => {
	console.log("mounted")
})
watch(
	() => props?.data,
	(newVal, oldVal) => {
		console.log("propsList", newVal)
		if (newVal?.page == 1) {
			list.splice(0, list.length, ...changeList()!)
			return
		}
		list.push(...changeList()!)
	}
)
</script>
<style scoped lang="scss">
@include b(home-list) {
	@apply box-border w-full;
	padding: 10px 5px 0 5px;
	border-radius: 10px;
	background-color: #fff;

	// li {
	// 	@apply w-2/4 inline-block box-border px-1;
	// }

	// @include e(img) {
	// 	@apply w-full h-40 relative;
	// 	max-height: 90px;
	// 	.link {
	// 		@import "/assets/css/mixin.scss";
	// 		@include b-Cover;
	// 		@apply text-center;
	// 		border-radius: 5px;
	// 	}

	// 	.c-rt {
	// 		@apply absolute top-0 right-0 text-white font-semibold font-mono;
	// 		font-size: 10px;
	// 		background: linear-gradient(to right, #b7f5d0, #66e9a7);
	// 		border: 0.5px solid var(--amx-the--amx-theme-color);
	// 		padding: 0px 3px;
	// 		border-radius: 0 5px 0 6px;
	// 		color: #0a3720;
	// 	}

	// 	.c-lb {
	// 		@apply absolute text-white font-semibold font-mono;
	// 		bottom: 1px;
	// 		left: 1px;
	// 		font-size: 9px;
	// 		background-color: #23314b;
	// 		padding: 1px 3px;
	// 		border-radius: 2px;
	// 	}

	// 	.c-rb {
	// 		@apply absolute  text-white font-semibold;
	// 		right: 4px;
	// 		bottom: 2px;
	// 		.c-date {
	// 			color: #ff7f00;
	// 		}
	// 	}

	// 	.c-lt {
	// 		@apply absolute  text-white font-semibold;
	// 		top: 1px;
	// 		left: 1px;
	// 	}

	// 	.c-lrb {
	// 	}
	// }

	// @include e(title) {
	// 	padding: 4px 0px;
	// 	@apply box-border;
	// 	.c-title {
	// 		@apply truncate font-sans;
	// 		font-size: 15px;
	// 		color: #0d0d0d;
	// 	}
	// 	.c-info {
	// 		@apply truncate font-sans flex justify-between;
	// 		color: #666666;
	// 		a {
	// 			@apply truncate;
	// 			font-size: 14px;
	// 		}
	// 		.more {
	// 			font-size: 16px;
	// 			i {
	// 				vertical-align: text-top;
	// 			}
	// 		}
	// 	}
	// }
}
</style>
