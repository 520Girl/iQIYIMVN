<template>
	<div ref="bsWrapper" class="amx-dragRefurbishUp">
		<div class="amx-dragRefurbishUp__content" ref="contentSlot">
			<slot name="content"></slot>
			<div class="pullup-tips" style="padding-bottom: 30px">
				<div v-if="!isPullUpLoad" class="before-trigger">
					<!-- <slot name="pulldown">
                        <span style="
									width: 100%;
									display: block;
									font-size: 14px;
                                    padding-top: 10px;
									color: var(--amx-theme-color);
									text-align: center;">
                            下拉刷新获取更多内容
                            <var-icon name="arrow-down" style="vertical-align: middle" />
                        </span>
                    </slot> -->
				</div>
				<div v-else class="after-trigger">
					<slot name="loading">
						<var-loading
							:description="'正在加载...'"
							type="wave"
							color="var(--amx-theme-color)"
							style="
								font-size: 10px;
								text-align: center;
								color: var(--amx-theme-color);
								width: 100%;
							"
						/>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"
import Pullup from "@better-scroll/pull-up"
import { useThrottle } from "@/hooks"

BScroll.use(Pullup)

let bscroll: any = null
const bsWrapper = ref<HTMLElement | null>(null)
let isPullUpLoad = ref<boolean>(false)
const contentSlot = ref<HTMLElement | null>(null)
const data = ref<number>(50)
let STEP = 1
const THRESHOLD = -70 //下拉刷新距离
// const listDOM = inject('listDOM')
const emit = defineEmits(["scrollHandler", "requestHandler", "update:requestStates"])
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

onMounted(() => {
	initBScroll()
	// console.log('listDOM', listDOM.value)
})

//初始化拖拽
const initBScroll = () => {
	bscroll = new BScroll(bsWrapper.value!, {
		pullUpLoad: true,
		scrollX: true,
		bounceTime: 300,
		momentum: true,
		// // bounce: false, // 禁止弹性效果，从而禁止拖拽的回弹
		// click: true,   // 启用点击事件
		// probeType: 3,  // 探测类型，3表示全量探测，即每次滚动都触发事件
	})
	const throttle = useThrottle(scroll, 40)

	bscroll.on("pullingUp", pullingUpHandler)
	bscroll.on("scroll", throttle)
	// const hooks = bscroll.scroller.actions.hooks
	// hooks.on('beforeEnd', (event) => { console.log('end', event.target.scrollTop) })
	bscroll.on("scrollEnd", (position: { x: number; y: number; z: number }) => {
		console.log("scrollEnd", position)
		// scrollDistance(position)
	})
}
// 执行退拽回调函数 返回x ,y 值
const scroll = (position: { x: number; y: number; z: number }) => {
	emit("scrollHandler", position)
}

const pullingUpHandler = async () => {
	isPullUpLoad.value = true
	STEP += 1
	console.log("111111 为什么反复请求", STEP)
	const { requestHandler, requestStates } = props
	const result = await requestHandler()
	//请求完成
	requestStates.done = true
	requestStates.data = result * STEP

	emit("update:requestStates", requestStates)

	bscroll.finishPullUp()
	bscroll.refresh()
	isPullUpLoad.value = false
}

onUnmounted(() => {
	bscroll.destroy()
})
</script>
<style scoped lang="scss">
//外部元素设置高度
@include b(dragRefurbishUp) {
	@apply h-full w-full overflow-hidden;

	@include e(content) {
		@apply w-full overflow-hidden;
	}
}
</style>
