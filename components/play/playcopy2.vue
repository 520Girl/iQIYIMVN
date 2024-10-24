<template>
	<div class="amx-playMovie">
		<div class="amx-playMovie__play">potplay</div>
		<div class="amx-playMovie__content">
			<div class="amx-playMovie__content__Title">
				<var-tabs
					elevation
					color="var(--color-primary)"
					active-color="var(--color-on-primary)"
					inactive-color="var(--color-on-info)"
					v-model:active="active"
				>
					<var-tab>选项1{{ active }}</var-tab>
					<var-tab>选项2</var-tab>
					<var-tab>选项3</var-tab>
				</var-tabs>
			</div>
			<div class="amx-playMovie__content__List">
				<div class="Item" v-show="active === 0">
					<DragRefurbishUp
						@scrollHandler="scrollHandler"
						:requestHandler="requestHandler"
						v-model:requestStates="requestStates"
					>
						<template #content>
							呜啦啦啦火车笛，随着奔腾的马蹄。 小妹妹吹着口琴，夕阳下美了剪影。
							我用子弹写日记，介绍完了风景。 呜啦啦啦火车笛，随着奔腾的马蹄。
							小妹妹吹着口琴，夕阳下美了剪影。 我用子弹写日记，介绍完了风景。
							呜啦啦啦火车笛，随着奔腾的马蹄。 小妹妹吹着口琴，夕阳下美了剪影。
							我用子弹写日记，介绍完了风景。 呜啦啦啦火车笛，随着奔腾的马蹄。
							小妹妹吹着口琴，夕阳下美了剪影。 我用子弹写日记，介绍完了风景。
							<div style="height: 52px" v-for="(item, index) in requestStates.data">{{ item }}</div>
						</template>
					</DragRefurbishUp>
				</div>
				<div class="Item" v-show="active === 1">
					<DragRefurbishUp
						@scrollHandler="scrollHandler"
						:requestHandler="requestHandler"
						v-model:requestStates="requestStates"
					>
						<template #content>
							soejdfaijfoda fjdaoijfjodsaf 接下来换介绍我自己。 我虽然是个牛仔，在酒吧只点牛奶。
							为什么不喝啤酒，因为啤酒伤身体。 接下来换介绍我自己。 我虽然是个牛仔，在酒吧只点牛奶。
							为什么不喝啤酒，因为啤酒伤身体。 接下来换介绍我自己。 我虽然是个牛仔，在酒吧只点牛奶。
							为什么不喝啤酒，因为啤酒伤身体。 接下来换介绍我自己。 我虽然是个牛仔，在酒吧只点牛奶。
							为什么不喝啤酒，因为啤酒伤身体。 接下来换介绍我自己。 我虽然是个牛仔，在酒吧只点牛奶。
							为什么不喝啤酒，因为啤酒伤身体。
						</template>
					</DragRefurbishUp>
				</div>
				<div class="Item" v-if="active === 2">88</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"
import Pullup from "@better-scroll/pull-up"
import type { Item } from "@/types/api"
// BScroll.use(Pullup)
let bscroll: any = null
const bsWrapper = ref<HTMLElement | null>(null)
let isPullUpLoad = ref<boolean>(false)
let data = ref<number>(5)
let active = ref<number>(0)
let distance = reactive<Map<number, any>>(new Map())
const isClient = ref(false)
let requestStates = reactive<{ done: boolean; data: number }>({
	done: false, // 请求状态
	data: 9, // 请求结果
}) // 请求状态

// 监听上下滚动
const scrollHandler = ({ x, y }: { x: number; y: number }) => {
	console.log(x, y)
}

const requestHandler = async () => {
	requestStates.done = false // 显示请求状态
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(5)
		}, 10000)
	})
}

const scrollDistance = (
	{ x, y }: { x?: number; y?: number; z?: number } = { x: 0, y: 0, z: 0 }
) => {
	distance.set(active.value, { x, y, z: 0 })
	console.log(distance)
}

const tabsActive = watch(
	() => requestStates.data,
	(newV, oldV) => {
		console.log("发生变化", newV, oldV)
	}
)
</script>
<style scoped lang="scss">
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
		background-color: sandybrown;

		@include e(Title) {
			height: 38px;
			width: 100%;
		}

		@include e(List) {
			height: calc(100vh - var(--amx-play-height) - 38px);
			width: 100%;
			overflow: hidden;
			position: relative;
		}
		.Item {
			height: 100%;
			overflow: hidden;
		}
	}
}

.pullup-wrapper {
	height: 100%;
	// padding: 0 10px;
	// border: 1px solid #ccc;
	overflow: hidden;
	width: 100%;
}

.pullup-list-item {
	overflow: hidden;
	width: 100%;
	// padding: 10px 0;
	// list-style: none;
	// border-bottom: 1px solid #ccc;
}

.pullup-tips {
	padding: 20px;
	text-align: center;
}

// 需要注意容器必须为指定高度 内容必须超过容器高度才能触发
</style>
