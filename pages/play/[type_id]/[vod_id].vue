<template>
	<div class="amx-playMovie">
		<var-watermark :content="setting.title" :fullscreen="true">
			<SvgIcon name="svgo-back" class="amx-playMovie__back" @click="goBack" />
			<div class="amx-playMovie__play" ref="playDOM">
				<CommonArtplayer
					ref="artPlayer"
					@get-instance="getInstance"
					:option="option"
					:style="style"
				/>
			</div>

			<div class="amx-playMovie__content" ref="listDOM">
				<div class="amx-playMovie__content__Title">
					<var-tabs
						elevation
						style=""
						disabled
						active-color="#000"
						inactive-color="#9f9a9a"
						indicator-size="0"
						v-model:active="active"
					>
						<var-tab class="p-t-1" :ripple="false">视频</var-tab>
						<var-tab class="p-t-1" :ripple="false">讨论<sub class="review-num">3266</sub></var-tab>
					</var-tabs>
				</div>
				<div class="amx-playMovie__content__List" ref="slide">
					<div class="amx-playMovie__content__List__wrapper" ref="slideWrapper">
						<div class="Item">
							<DragRefurbishUp
								@scrollHandler="scrollHandler"
								:requestHandler="requestHandler"
								v-model:requestStates="requestStates"
							>
								<template #content>
									<PlayVideoInfo />
								</template>
							</DragRefurbishUp>
						</div>
						<div class="Item">
							<DragRefurbishUp
								@scrollHandler="scrollHandler"
								:requestHandler="requestHandler"
								v-model:requestStates="requestStates"
							>
								<template #content>
									<PlayChat />
								</template>
							</DragRefurbishUp>
						</div>
					</div>
				</div>
			</div>
		</var-watermark>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import NestedScroll from "@better-scroll/nested-scroll"
import setting from "public/setting.json"
import { useGetList } from "@/hooks/useGetList"
import type { Item } from "@/types/api/index"

//! 1. 请求详细数据，并进行处理
const { params } = useRoute()
const store = usePlayStore()
const query = { t: params.type_id as string, ids: params.vod_id as string, ac: "detail" }
await store.getPlayVodDetail(query)
const detail = store.getPlayData
console.log("detail1", detail)

let slide = ref<HTMLElement | null>(null)
let listDOM = ref<HTMLElement | null>(null)
let playDOM = ref<HTMLElement | null>(null)
let artPlayer = ref<any>(null)
const slideWrapper = ref<HTMLElement | null>(null)
let active = ref<number>(0)
let sliderScroll: any = null
let requestStates = reactive<{ done: boolean; data: Item }>({
	done: false, // 请求状态
	data: {}, // 请求结果
})

//artPlayer 播放器
const option = reactive({
	url: detail.defaultUrl,
	autoSize: true,
	// 视频的海报，只会出现在播放器初始化且未播放的状态下
	poster: detail.imgUrl || "/image/video.png",
	// 视频标题，目前会出现在视频截图和迷你模式下
	title: detail.vod_name,
	// 播放器主题颜色，目前只作用于进度条上
	theme: "var(--amx-theme-color)",
	// 播放器的默认音量
	volume: 0.5,
	// 使用直播模式，会隐藏进度条和播放时间
	isLive: false,
	// 是否默认静音
	muted: false,
	// 是否自动播放
	autoplay: false,
})
const style = reactive({
	width: "100%",
	height: "100%",
	margin: "auto",
})

const getInstance = (art: any) => {
	console.log(art)
}

//通过注入的方式传递数据给子组件
// provide('listDOM', listDOM)
//! 1. 监听上下滚动 实现全屏
const scrollHandler = ({ x, y }: { x: number; y: number }) => {
	if (y > 0) {
		console.log("scrollHandler", x, y)
		listDOM.value!.style.transform = `translate3d(0,${y}px,0)`
		playDOM.value!.style.transform = `translate3d(0,${y}px,0)`
		if (y > 50) {
			artPlayer.value.fullscreen()
		}
	}
}
//! 2. 请求数据
//! 5. 获取slide 数据
const { getList } = useGetList()
const data = await getList({ ac: "list", t: params.type_id as string, pagesize: 6 })
requestStates.done = true // 显示请求状态
requestStates.data = data
provide("requestStatesList", requestStates)
const requestHandler = async (query: { page: number }) => {
	console.log("params", query)
	console.log("requestStates", requestStates)
	requestStates.done = false // 显示请求状态
	return await getList({ ac: "list", t: params.type_id as string, pagesize: 6, pg: query.page })
}

//! 3. 初始化 slide 拖拽 左右
const initSlider = () => {
	BScroll.use(NestedScroll)
	BScroll.use(Slide)
	sliderScroll = new BScroll(slide.value!, {
		scrollX: true,
		scrollY: false,
		click: true,
		slide: {
			loop: false,
			autoplay: false,
			interval: 3000,
			threshold: 0.4,
		},
		momentum: false,
		nestedScroll: true,
		bounce: false,
		probeType: 3,
		// preventDefault:false
	})
	sliderScroll.on("scrollEnd", _onScrollEnd)

	sliderScroll.on("slideWillChange", (page: any) => {
		console.log("Slide will change to => ", page)
		// let itemLength = document.querySelectorAll('.Item') as NodeListOf<HTMLDivElement>
		// for(let i=0;i<itemLength.length;i++){
		//   itemLength[i].style.display = `block`
		// }
		// document.querySelector('.amx-playMovie__content__List__wrapper').style.display = 'flex'
		active.value = page.pageX
	})

	// v2.1.0
	// sliderScroll.on('slidePageChanged', (page: any) => {
	//   console.log('CurrentPage changed to => ', page)
	// })
}
const _onScrollEnd = () => {
	console.log("CurrentPage => ", sliderScroll.getCurrentPage())
}
//! 4. 实现点击切换分类
watch(active, (newVal, oldVal) => {
	sliderScroll.goToPage(newVal, newVal)
})
//5. 返回上一页
const router = useRouter()
const goBack = () => {
	// router.back()
	router.go(-1)
	// router.push("/")
}
//当播放源数据发生变化时，更新播放器的url
watch(store.currentVideo, (newVal, oldVal) => {
	console.log("newVal", artPlayer.value)
	artPlayer.value?.changeVideoUrl(newVal.url)
})

onMounted(async () => {
	// await nextTick()
	initSlider()
	//初始化时隐藏 所以Item 显示第一个,解决显示问题
	slideWrapper.value!.style.display = "flex"
})
onUnmounted(() => {
	sliderScroll.destroy()
})
</script>
<style scoped lang="scss">
// :deep(.var-swipe__track){
//  max-height:  calc(100vh - var(--amx-play-height) - 38px);
//   overflow: hidden;
// }
@include b(playMovie) {
	height: 100vh;
	@apply bg-black;
	overflow: hidden;

	@include e(back) {
		@apply absolute;
		z-index: 23;
		font-size: 30px;
		left: 5px;
		top: 5px;
	}

	@include e(play) {
	}

	@include e(play) {
		height: var(--amx-play-height);
		width: var(--amx-play-width);
		background-color: #000;
	}

	@include e(content) {
		height: calc(100vh - var(--amx-play-height));
		width: 100%;
		@apply bg-white;
		border-radius: 8px 8px 0 0;

		@include e(Title) {
			height: var(--amx-play-info-title);
			overflow: hidden;
			width: 100%;
			border-bottom: 1px solid #f1f1f1;
			border-radius: 8px;

			:deep(.var-tabs) {
				@apply w-full h-full inline-block shadow-none flex-none;
			}

			:deep(.var-tab) {
				@apply flex-none;
			}

			.active {
			}
		}

		@include e(List) {
			height: calc(100vh - var(--amx-play-height) - 38px);
			@apply w-full overflow-hidden relative;
			overflow: hidden;

			@include e(wrapper) {
				@apply w-full overflow-hidden relative h-full;
			}
		}

		.Item {
			height: 100%;
			overflow: hidden;
			display: block;
		}
	}
}

.review-num {
	color: var(--amx-theme-color);
	font-size: 10px;
	vertical-align: text-bottom;
	display: inline-block;
	padding-left: 2px;
}

// 需要注意容器必须为指定高度 内容必须超过容器高度才能触发
</style>
