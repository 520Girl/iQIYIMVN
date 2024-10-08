<template>
	<div class="pulldown" ref="pulldownContent">
		<div class="pulldown-bswrapper" style="overflow: hidden" ref="bsWrapper">
			<div class="pulldown-scroller">
				<div class="pulldown-wrapper">
					<div v-show="stateReFurish.beforePullDown">
						<!-- //拉下来显示的内容 -->
						<slot name="pulldown">
							<span
								style="
									height: 50px;
									width: 100%;
									display: block;
									font-size: 12px;
									color: var(--amx-theme-color);
									position: absolute;
									top: -20px;
									z-index: 3;
									line-height: 50px;
									text-align: center;
								"
								:style="{ top: '-' + STOP + 'px' }"
							>
								下拉刷新
								<var-icon name="arrow-down" style="vertical-align: middle" />
							</span>
						</slot>
					</div>
					<div v-show="!stateReFurish.beforePullDown">
						<div v-show="stateReFurish.isPullingDown">
							<slot name="loading">
								<var-loading
									:description="'正在加载...'"
									type="wave"
									color="var(--amx-theme-color)"
									:style="{ top: '-' + STOP + 'px' }"
									style="
										height: 50px;
										font-size: 10px;
										position: absolute;
										top: -50px;
										z-index: 3;
										color: var(--amx-theme-color);
										text-align: center;
										width: 100%;
									"
								/>
							</slot>
						</div>
						<div v-show="!stateReFurish.isPullingDown">
							<slot name="finish">
								<span
									style="
										height: 50px;
										width: 100%;
										display: block;
										font-size: 12px;
										color: rgb(136, 136, 136);
										position: absolute;
										top: -20px;
										z-index: 3;
										text-align: center;
									"
									>获取数据成功</span
								>
							</slot>
						</div>
					</div>
				</div>
				<slot name="content"></slot>
				<div class="pulldown-wrapper">
					<div v-show="stateReFurish.beforePullUp">
						<!-- //拉下来显示的内容 -->
						<slot name="pulldown">
							<span
								style="
									height: 50px;
									width: 100%;
									display: block;
									font-size: 12px;
									color: var(--amx-theme-color);
									line-height: 50px;
									text-align: center;
								"
							>
								下拉刷新{{ id }}
								<var-icon name="arrow-down" style="vertical-align: middle" />
							</span>
						</slot>
					</div>
					<div v-show="!stateReFurish.beforePullUp">
						<div v-show="stateReFurish.isPullingUp">
							<slot name="loading">
								<var-loading
									:description="'正在加载...'"
									type="wave"
									color="var(--amx-theme-color)"
									style="
										height: 50px;
										font-size: 10px;
										color: var(--amx-theme-color);
										text-align: center;
										width: 100%;
									"
								/>
							</slot>
						</div>
						<div v-show="!stateReFurish.isPullingUp">
							<slot name="finish">
								<span
									style="
										height: 50px;
										width: 100%;
										display: block;
										font-size: 12px;
										color: rgb(136, 136, 136);
										z-index: 3;
										text-align: center;
									"
									>获取数据成功</span
								>
							</slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"
import PullDown from "@better-scroll/pull-down"
import Pullup from "@better-scroll/pull-up"
import { useThrottle } from "~/hooks"
import { useGetList } from "~/hooks/useGetList"

BScroll.use(Pullup)
BScroll.use(PullDown)
const id = useId()
let bscroll: any = null
const bsWrapper = ref<HTMLElement | null>(null)
const pulldownContent = ref<HTMLElement | null>(null)
const TIME_BOUNCE = 800 //回弹时间
const REQUEST_TIME = 1000 //什么时候可以二次请求方式返回数据过快反复拖拽
const THRESHOLD = 70 //下拉刷新距离
const STOP = 56 //下拉刷新后停留的高度
let STEP = 0
const stateReFurish = reactive({
	beforePullDown: true, //是否上下拉动
	isPullingDown: false, //是否刷新成功
	isPullingUp: false, //是否上拉加载
	beforePullUp: true, //是否下拉刷新
	isOverDataStatus: false, //是否已经拉到底部
	isOverData: "亲没有更多数据了不要再拉了", //是否已经拉到底部
	dataList: [], // 获得的数据列表
})

//子组件给父组件传递一个方法,通知滚动距离
const emit = defineEmits(["scrollHandler", "requestHandler", "update:requestStates"])
const scroll = async ({ x, y }: { x: number; y: number }) => {
	const { top } = pulldownContent.value!.getBoundingClientRect()
	const headerTop = document.getElementsByTagName("header")[0].clientHeight
	// console.log('y', y, top, headerTop)
	emit("scrollHandler", { x, y })
}
//! 1. 获取列表数据
const store = useHomeStore()
const { getList } = useGetList()
const data = await getList({})

//子组件传给父组件 通知请求数据，请求完成通知请求完成
interface ChildProps {
	requestHandler: () => Promise<any> // 接收的函数类型，可以根据返回的数据类型更改
	requestStates: {
		done: boolean // 请求是否完成
		data: any // 请求返回的数据
	}
}

const props = withDefaults(defineProps<ChildProps>(), {
	requestHandler: () => Promise.resolve({}),
	requestStates: () => ({ done: false, data: null }),
})
//! 1.2 数据的传递当得到数据将其注入到对象中然后在子组件总获取
const { requestHandler, requestStates } = props
requestStates.done = true
requestStates.data = data
//! 1.1.1 在这个data 中我可以获取到 pagecount 也就是总页码
emit("update:requestStates", requestStates)
console.log("初始化", requestStates)
provide("requestStatesList", requestStates)
onMounted(async () => {
	initBscroll()
})

const initBscroll = () => {
	bscroll = new BScroll(bsWrapper.value!, {
		scrollY: true,
		click: true,
		pullUpLoad: {
			threshold: 100,
		},
		bounceTime: TIME_BOUNCE,
		useTransition: false,
		pullDownRefresh: {
			threshold: THRESHOLD,
			stop: STOP,
		},
	})
	const throttle = useThrottle(scroll, 0)
	bscroll.on("pullingDown", pullingDownHandler)
	bscroll.on("pullingUp", pullingUpHandler)
	bscroll.on("scroll", throttle)
	bscroll.on("scrollEnd", ({ x, y }: { x: number; y: number }) => {
		// console.log('scrollEnd', x, y)
	})
}
//下拉
const pullingDownHandler = async () => {
	stateReFurish.beforePullDown = false
	stateReFurish.isPullingDown = true
	STEP = 1
	// const { requestHandler, requestStates } = props
	const result = await getList({ pg: STEP })
	// console.log('请求完成',props.requestStates,result)
	requestStates.done = true
	requestStates.data = result
	emit("update:requestStates", requestStates)
	console.log("请求完成Down", result)
	stateReFurish.isPullingDown = false
	stateReFurish.beforePullDown = true
	bscroll.finishPullDown()
	bscroll.refresh()
}
//上拉
const pullingUpHandler = async () => {
	stateReFurish.beforePullUp = false
	stateReFurish.isPullingUp = true
	STEP += 1
	// const { requestHandler, requestStates } = props
	const result = await getList({ pg: STEP })
	// console.log('请求完成',props.requestStates,result)
	requestStates.done = true
	requestStates.data = result
	emit("update:requestStates", requestStates)
	console.log("请求完成up", result)
	console.log("请求完成up requestStates", requestStates)
	bscroll.finishPullUp()
	bscroll.refresh()
	stateReFurish.isPullingUp = false
	stateReFurish.beforePullUp = true
}
const handleClick = () => {
	requestStates.data = { name: 888 + 1 }
	console.log("点击", requestStates.data)
}
</script>

<style scoped lang="scss">
.pulldown {
	height: 100%;
}

.pulldown-bswrapper {
	// position: relative;
	height: 100%;
	// padding: 0 10px;
	// border: 1px solid #ccc;
	overflow: hidden;
}

.pulldown-list {
	// padding: 0;
}

.pulldown-list-item {
	// padding: 10px 0;
	// list-style: none;
	// border-bottom: 1px solid #ccc;
}

.pulldown-wrapper {
	// position: absolute;
	width: after;
	height: 100%;
	// padding: 20px;
	// box-sizing: border-box;
	// transform: translateY(-100%) translateZ(0);
	// text-align: center;
}
</style>
