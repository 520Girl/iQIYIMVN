<template>
	<div class="amx-playMovie">
		<div class="amx-playMovie__play">potplay</div>
		<div class="amx-playMovie__content" ref="listDOM">
			<div class="amx-playMovie__content__Title">
				<var-tabs
					elevation
					style=""
					disabled
					active-color="#000"
					inactive-color="#000"
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
						<!-- <DragRefurbishUp @scrollHandler="scrollHandler" :requestHandler="requestHandler"
              v-model:requestStates="requestStates">
              <template #content> -->
						<!-- <PlayVideoInfo /> -->
						<!-- </template>
            </DragRefurbishUp> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"
import Slide from "@better-scroll/slide"
import NestedScroll from "@better-scroll/nested-scroll"

BScroll.use(NestedScroll)
BScroll.use(Slide)

let slide = ref<HTMLElement | null>(null)
let listDOM = ref<HTMLElement | null>(null)
const slideWrapper = ref<HTMLElement | null>(null)
let active = ref<number>(0)
let sliderScroll: any = null
const requestStates = reactive<{ done: boolean; data: number }>({
	done: false, // 请求状态
	data: 20, // 请求结果
}) // 请求状态

//通过注入的方式传递数据给子组件
// provide('listDOM', listDOM)
//! 1. 监听上下滚动 实现全屏
const scrollHandler = ({ x, y }: { x: number; y: number }) => {
	if (y > 0) {
		console.log("scrollHandler", x, y)
		listDOM.value!.style.transform = `translate3d(0,${y}px,0)`
	}
}
//! 2. 请求数据
const requestHandler = async () => {
	requestStates.done = false // 显示请求状态
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(5)
		}, 1000)
	})
}

//! 3. 初始化 slide 拖拽 左右
const initSlider = () => {
	sliderScroll = new BScroll(slide.value!, {
		scrollX: true,
		scrollY: false,
		click: true,
		slide: {
			loop: false,
			autoplay: false,
			interval: 3000,
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
	const width = listDOM.value!.getBoundingClientRect().width
	slideWrapper.value!.style.transform = `translateX(${-newVal * width}px)`
})

onMounted(async () => {
	// await nextTick()
	initSlider()
	//初始化时隐藏 所以Item 显示第一个,解决显示问题
	slideWrapper.value!.style.display = "flex"
})
</script>
<style scoped lang="scss">
// :deep(.var-swipe__track){
//  max-height:  calc(100vh - var(--amx-play-height) - 38px);
//   overflow: hidden;
// }
@include b(playMovie) {
	height: 100vh;

	// overflow: hidden;
	@include e(play) {
		height: var(--amx-play-height);
		width: var(--amx-play-width);
	}

	@include e(content) {
		height: calc(100vh - var(--amx-play-height));
		width: 100%;

		@include e(Title) {
			height: var(--amx-play-info-title);
			overflow: hidden;
			width: 100%;
			border: 1px solid #f1f1f1;

			:deep(.var-tabs) {
				@apply w-full h-full inline-block shadow-none flex-none;
			}

			:deep(.var-tab) {
				@apply flex-none;
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
