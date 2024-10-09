<template>
	<div class="pulldown">
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
									z-index: 3;
									line-height: 50px;
									text-align: center;
								"
							>
								下拉刷新{{ id }}
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
									style="
										height: 50px;
										font-size: 10px;
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

BScroll.use(Pullup)
BScroll.use(PullDown)
const id = useId()
let bscroll: any = null
const bsWrapper = ref<HTMLElement | null>(null)
const TIME_BOUNCE = 800 //回弹时间
const REQUEST_TIME = 1000
const THRESHOLD = 70 //下拉刷新距离
const STOP = 56 //下拉刷新后停留的高度
let STEP = 0
const stateReFurish = reactive({
	beforePullDown: true, //是否上下拉动
	isPullingDown: false, //是否刷新成功
	dataList: [], // 获得的数据列表
})
const store = useHomeStore()
//子组件给父组件传递一个方法,通知滚动距离

const emit = defineEmits(["scrollHandler", "requestHandler", "update:requestStates"])
const scroll = async ({ x, y }: { x: number; y: number }) => {
	emit("scrollHandler", { x, y })
}

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

onMounted(async () => {
	initBscroll()
})

const initBscroll = () => {
	bscroll = new BScroll(bsWrapper.value!, {
		scrollY: true,
		pullUpLoad: true,
		bounceTime: TIME_BOUNCE,
		useTransition: false,
		pullDownRefresh: {
			threshold: THRESHOLD,
			stop: STOP,
		},
	})
	const throttle = useThrottle(scroll, 40)
	bscroll.on("pullingDown", pullingDownHandler)
	bscroll.on("pullingUp", pullingDownHandler)
	bscroll.on("scroll", throttle)
	bscroll.on("scrollEnd", ({ x, y }: { x: number; y: number }) => {
		// console.log('scrollEnd', x, y)
	})
}
const pullingDownHandler = async () => {
	stateReFurish.beforePullDown = false
	stateReFurish.isPullingDown = true
	STEP += 1

	let { requestHandler, requestStates } = props
	// const result = await store.dragAsyncData("888")
	const result = await setTimeout(() => {
		return requestHandler()
	}, REQUEST_TIME)
	// console.log('请求完成',props.requestStates,result)
	requestStates.done = true
	requestStates.data = { result: result }
	emit("update:requestStates", requestStates)
	console.log("请求完成", result)
	stateReFurish.isPullingDown = false
	finishPullDown()
}
const finishPullDown = async () => {
	//结束下拉刷新行为
	bscroll.finishPullDown()
	setTimeout(() => {
		stateReFurish.beforePullDown = true
		//dom 发生变化刷新bscroll
		bscroll.refresh()
	}, TIME_BOUNCE + 100)
}
const requestData = async () => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("success")
		}, 2000)
	})
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
