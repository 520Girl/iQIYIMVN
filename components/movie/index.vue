<template>
	<div class="amx-movie">
		<Swipe
			ref="swipe"
			:style="translateY.swipe ? `transform: translate3d(0,${translateY.swipe}px,0)` : ''"
		>
		</Swipe>
		<div
			class="amx-movie-main"
			ref="homeMain"
			:style="translateY.content ? `transform: translate3d(0,${translateY.content}px,0)` : ''"
		>
			<div class="amx-class" ref="slide">
				<ul class="amx-class-wrapper" v-if="movieClass">
					<li
						class="amx-class__item"
						v-for="(item, index) in movieClass"
						:key="index"
						@click.stop.prevent.capture="event => goClass(event, item)"
					>
						<span class="text" :class="{ active: item === classActive }">{{ item }}</span>
					</li>
				</ul>
			</div>

			<div class="amx-movie-content" style="position: relative">
				<slot>
					<var-loading
						v-if="classActiveLoading"
						type="cube"
						color="var(--color-success)"
						style="margin: 10px 0"
					/>
					<HomeComponentsList />
				</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, type Reactive } from "vue"
import BScroll from "@better-scroll/core"
import { useGetList } from "@/hooks/useGetList"

const translateY = reactive({
	content: 0,
	swipe: 0,
})
let classActive = ref("")
let classActiveLoading = ref(false)
const slide = ref<HTMLElement | null>(null)
let bsScroll: any = null
const homeMain = ref<HTMLDivElement>()
const store = useHomeStore()
const navClass = store.getNavMap
const { path } = useRoute()
const movieClass = navClass?.get(path)?.class.split(",") || []
console.log("path", movieClass)
//! 1. 实例化分类拖拽
const initBScroll = () => {
	bsScroll = new BScroll(slide.value!, {
		scrollX: true,
		bounceTime: 300,
		momentum: true,
		// // bounce: false, // 禁止弹性效果，从而禁止拖拽的回弹
		click: true, // 启用点击事件
		probeType: 3, // 探测类型，3表示全量探测，即每次滚动都触发事件
	})
}
//拖拽事件 用作错位拖动
const scrollTo = (scrollTo: number) => {
	// console.log(scrollTo)
	const { top } = homeMain.value?.getBoundingClientRect() || { top: 0 }
	const headerTop = document.getElementsByTagName("header")[0].clientHeight
	if (scrollTo < 0 && top >= headerTop) {
		translateY.content = parseInt(scrollTo.toString())
		translateY.swipe = parseInt((scrollTo / 4).toString())
	}
	if (scrollTo > 0) {
		translateY.content = translateY.swipe = 0
	}
}

//! 点击分类 发送请求，将数据发送的pinia 中传给list 组件
const router = useRouter()
const bsScrollInject: Function = inject("bscroll") || (() => {})
const goClass = async (event: MouseEvent, item: string) => {
	router.push({ name: "movie", query: { class: item } })
	let startTime = new Date().getTime()

	classActiveLoading.value = true
	classActive.value = item

	bsScrollInject(item)
	// Object.assign(res, { data: res, done: true })
	// provide('requestStatesList', { data: res, done: true })
	let endTime = new Date().getTime()
	let loadingTime = endTime - startTime > 1000 ? endTime - startTime : 1000
	setTimeout(() => {
		classActiveLoading.value = false
	}, loadingTime)
}
defineExpose({
	scrollTo,
})

onMounted(() => {
	console.log("mounted")
	initBScroll()
})
</script>
<style scoped lang="scss">
@include b(movie) {
	overflow: hidden;
	position: relative;

	@include b(movie-main) {
		background-color: var(--amx-bc);
		border-radius: 8px;
	}
}

@include b(class) {
	width: 100%;
	@apply w-full box-border;
	padding: 10px 5px 0 5px;

	@include b(class-wrapper) {
		@apply inline-block whitespace-nowrap text-ellipsis overflow-hidden text-center m-auto;
	}

	@include e(item) {
		@apply inline-block whitespace-nowrap;
		margin-right: 8px;
		background-color: var(--amx-play-button-bc);
		border-radius: 28px;
		width: 75px;
		line-height: 2.5;
	}
}

.text {
	font-size: 14px;
}

.active {
	color: var(--amx-theme-color);
}
</style>
