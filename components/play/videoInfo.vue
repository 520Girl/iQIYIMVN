<template>
	<div class="amx-moviePlay-info">
		<div class="amx-moviePlay-info__title">
			<section class="amx-p-t">
				<h1 class="amx-p-t__h1">{{ detail.vod_name }}</h1>
				<div href="www.baidu.com" class="amx-p-t__span" @click="popupDetail = true">
					详情
					<var-icon name="chevron-right" />
				</div>
			</section>
			<section class="amx-p-i" @click.stop ref="slide">
				<ul class="amx-p-i__ul">
					<li class="amx-p-i__li" :ripple="false" style="color: rgb(235 189 89)">
						<var-icon name="fire" />{{ detail.vod_hits }}
					</li>
					<li class="amx-p-i__li" :ripple="false" style="color: rgb(255 102 125)">
						{{ detail.vod_score }}分
					</li>
					<li class="amx-p-i__li" :ripple="false">{{ detail.type_name }}</li>
					<li class="amx-p-i__li" :ripple="false">{{ detail.remarks }}</li>
					<li class="amx-p-i__li" :ripple="false">{{ detail.class }}</li>
					<li class="amx-p-i__li" :ripple="false">{{ detail.director }}</li>
					<li
						class="amx-p-i__li"
						:ripple="false"
						v-for="(item, index) in detail.actor"
						:key="index"
					>
						{{ item }}
					</li>
					<li class="amx-p-i__li" :ripple="false">
						<var-icon name="thumb-up" />{{ detail.vod_up }}
					</li>
					<li class="amx-p-i__li" :ripple="false">
						<var-icon name="thumb-down" />{{ detail.vod_down }}
					</li>
				</ul>
			</section>
		</div>
		<div class="amx-moviePlay-info__title" v-if="detail.from.length > 0">
			<section class="amx-p-t">
				<div class="amx-p-t__h2 flex items-center">
					<h5>选集</h5>
					<h5 class="amx-p-t__h2__span" v-if="detail.from.length > 0 && playSourceFrom.length > 0">
						源:
						<span
							:class="{ 'span-active': source === index }"
							@click="sourceClick(index)"
							v-for="(item, index) in playSourceFrom"
							:key="item?.alias"
							>{{ item?.name }}</span
						>
					</h5>
				</div>
				<div href="www.baidu.com" class="amx-p-t__span-2" @click="popupLevel = true">
					{{ episode?.length }}集{{ detail.vod_isend === 1 ? "全" : "" }}
					<var-icon name="chevron-right" />
				</div>
			</section>
			<section class="amx-p-i" @click.stop ref="slideLevel">
				<ul class="amx-p-i__ul">
					<li
						:class="['amx-p-i__li', 'amx-p-i__li-2', index + 1 === episodeActive ? 'active' : '']"
						@click="episodeClick(index)"
						:ripple="false"
						v-for="(item, index) in episode"
						:key="item.src"
					>
						<span class="c-rt-1">限免</span>
						{{ index + 1 }}
					</li>
				</ul>
			</section>
		</div>
		<div class="amx-moviePlay-info__AD">
			<div class="AD">广告</div>
		</div>
		<div class="anmx-moviePlay-info__list">
			<HomeComponentsList />
			<!-- <CommonListItem v-for="(item, index) in list" :key="index" :="item" /> -->
		</div>
		<div class="amx-moviePlay-info__more__popup">
			<var-popup position="bottom" class="amx-popup" v-model:show="popupDetail" :overlay="false">
				<div class="amx-popup__content">
					<div class="amx-popup__content--title">
						<div class="p-t-1">详细</div>
						<var-icon name="window-close" @click="closeMorePopup('detail')" />
					</div>
					<div class="amx-popup__content--body">
						<div class="img-type">
							<div class="img">
								<nuxt-img
									:src="detail.imgUrl"
									:alt="detail.vod_name"
									:placeholder="img(`/loading/loading.svg`, { h: 20 })"
									loading="lazy"
									preload
								/>
							</div>
							<div class="type">
								<h5 class="h5">{{ detail.vod_name }}</h5>
								<div class="tags">
									<span>{{ detail.class }}</span>
									<span v-for="(item, index) in detail.tag" :key="index">{{ item }}</span>
									<span>{{ detail.type_name }}</span>
								</div>
							</div>
						</div>
						<div class="score" justify="space-between">
							<div class="score-num-text">
								<div class="num">{{ detail.vod_score }}</div>
								<div class="text">观众评分</div>
							</div>
							<div class="score-pro">
								<var-progress
									:value="item"
									v-for="(item, index) in scoreRate"
									:key="index"
									:color="`linear-gradient(131.53deg, #3fecff ${item}%, #6149f6 ${item}%)`"
								/>
							</div>
							<div class="score-num-text">
								<div class="num n-1">{{ detail.vod_hits }}</div>
								<div class="text t-1">
									<var-icon name="fire" />
									热度值
								</div>
							</div>
						</div>
						<div class="desc">
							{{ detail.content }}
						</div>
						<div class="people">
							<h5 class="h5">演员列表：</h5>
							<div class="list">
								<var-space>
									<var-space direction="column" align="center">
										<var-avatar src="/image/director.png" fit="fill" />
										<span>{{ detail.director }}</span>
									</var-space>
									<var-space
										direction="column"
										align="center"
										v-for="(item, index) in detail.actor"
										:key="index"
									>
										<var-avatar src="/image/actor.png"></var-avatar>
										<span>{{ item }}</span>
									</var-space>
								</var-space>
							</div>
						</div>
					</div>
				</div>
			</var-popup>
			<var-popup
				position="bottom"
				class="amx-popup"
				v-model:show="popupLevel"
				:overlay="false"
				v-if="detail.from.length > 0"
			>
				<div class="amx-popup__content">
					<div class="amx-popup__content--title">
						<div class="p-t-1">选集</div>
						<var-icon name="window-close" @click="closeMorePopup('level')" />
					</div>
					<div class="amx-popup__content--body">
						<div class="amx-moviePlay-info__AD">
							<div class="AD">广告</div>
						</div>
						<div class="amx-moviePlay-info" style="padding: 0 0">
							<section class="amx-p-t">
								<h1 class="amx-p-t__h2">
									{{ episode?.length }}集{{ detail.vod_isend === 1 ? "全" : "" }}
								</h1>
								<div href="www.baidu.com" class="amx-p-t__span-2" @click="popupLevel = true">
									<var-switch
										variant
										v-model="leaveTitleSwitch"
										color="var(--amx-theme-color)"
										size="12"
										class="align-sub"
									/>
									分集标题
								</div>
							</section>
							<ul class="flex flex-wrap w-full box-border">
								<li
									:class="[
										'amx-p-i__li',
										'amx-p-i__li-2',
										index + 1 === episodeActive ? 'active' : '',
									]"
									v-for="(item, index) in episode"
									:key="index"
									:ripple="false"
									style="margin-bottom: 4px"
									@click="episodeClick(index)"
									:style="{
										width: leaveTitleSwitch ? '100%' : '17%',
										'text-align': leaveTitleSwitch ? 'left' : 'center',
									}"
								>
									<span class="c-rt-1">限免</span>

									{{ index + 1 }}
									<span
										v-show="leaveTitleSwitch"
										style="font-size: 15px"
										:style="{ color: leaveTitleSwitch ? 'var(--amx-theme-color)' : '#000' }"
										>{{ item.name }}</span
									>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</var-popup>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import BScroll from "@better-scroll/core"
import NestedScroll from "@better-scroll/nested-scroll"

BScroll.use(NestedScroll)
const store = usePlayStore()
const detail = store.getPlayData
const img = useImage()
const list = reactive([
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
		width: 2,
		height: "234px",
		tag: "li",
		bottomT: { type: 2, text: "最新内容11条" },
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
		width: 2,
		height: "234px",
		tag: "li",
		bottomT: { type: 2, text: "最新内容11条" },
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
		width: 2,
		height: "234px",
		tag: "li",
		bottomT: { type: 2, text: "最新内容11条" },
	},
])
let popupDetail = ref(false)
let popupLevel = ref(false)
let source = ref(0)
let episodeActive = ref(1)
let currentEpisode = reactive({ name: "", url: "", index: 1, from: "" }) //当前章节
let leaveTitleSwitch = ref(false)
let sliderScroll: any = null
let slide = ref<HTMLElement | null>(null)
let slideLevel = ref<HTMLElement | null>(null)
const initSlider = () => {
	sliderScroll = new BScroll(slide.value!, {
		scrollX: true,
		scrollY: false,
		click: true,
		momentum: false,
		nestedScroll: true,
		bounce: false,
		probeType: 3,
	})
	sliderScroll = new BScroll(slideLevel.value!, {
		scrollX: true,
		scrollY: false,
		click: true,
		momentum: false,
		nestedScroll: true,
		bounce: false,
		probeType: 3,
	})
}
const active = ref(0)
onMounted(() => {
	console.log("mounted")
	initSlider()
})
//关闭详情信息遮蔽层
const closeMorePopup = (type = "detail") => {
	type === "detail" ? (popupDetail.value = false) : (popupLevel.value = false)
}
//! 计算播放源的名称
const homeStore = useHomeStore()
const from = homeStore.getFrom || []
//初始化处理
Object.assign(
	currentEpisode,
	{ url: detail.defaultUrl },
	{ name: detail.defaultPlayName },
	{ index: episodeActive.value },
	{ from: detail.from[source.value] }
)
store.setCurrentVideo(currentEpisode)
console.log("detail2", detail)
console.log("from", from)
const playSourceFrom = computed(() => {
	let arr =
		detail.from.map((item: string, index: number) => {
			return from.filter((i: { alias: string; name: string }) => i.alias === item)[0]
		}) || []
	return arr
})
//! 1.2 获取当前播放源
const episode = computed(() => {
	return detail.url.get(detail.from[source.value])
})
//计算得到的评分率
const scoreRate = computed(() => {
	let score = detail.vod_score_all
	let up = detail.vod_up
	let down = detail.vod_down
	let hits = detail.vod_hits
	let arr = [up, down, hits, score]
	function getRate(arr: number[]): number[] {
		arr = arr.sort((a, b) => a - b)

		let newArr = arr.map((item: number, index) => {
			return (item / 10).toFixed(2)
		})
		let maxNum = newArr.find((item: string) => parseFloat(item) > 100)
		let resArr = newArr.map((item: string) => parseFloat(item))
		if (maxNum) {
			return getRate(resArr)
		}
		return resArr
	}
	return getRate(arr)
})
console.log("scoreRate", scoreRate)
console.log("playSourceFrom", playSourceFrom)
console.log("from", from)
//! 1.3点击源
const sourceClick = (index: number) => {
	source.value = index
	episodeActive.value = 0
	if (detail.from[source.value] === currentEpisode.from) {
		episodeActive.value = currentEpisode.index
	}
}

//! 1.4点击集数
const episodeClick = (index: number) => {
	episodeActive.value = index + 1
	Object.assign(
		currentEpisode,
		episode.value[episodeActive.value],
		{ index: episodeActive.value },
		{ from: detail.from[source.value] }
	)
	store.setCurrentVideo(currentEpisode)
}

onUnmounted(() => {
	sliderScroll.destroy()
})
</script>
<style scoped lang="scss">
@import "~/assets/css/common/moviePlayInfo.scss";
</style>
<style lang="scss">
@include b(popup) {
	height: calc(100vh - var(--amx-play-height));
	@apply w-full box-border;

	@include e(content) {
		@apply w-full h-full;

		@include m(title) {
			height: var(--amx-play-info-title);
			border-bottom: 1px solid #f1f1f1;
			padding: 0 15px;
			font-size: var(--tab-active-font-size);
			@apply w-full overflow-hidden flex justify-between items-center font-semibold;
		}

		@include m(body) {
			padding: 15px 15px;

			.img-type {
				@apply flex justify-between items-center;

				.img {
					width: 85px;
					height: 112px;
					@apply flex-shrink-0 shadow-lg;

					img {
						@apply w-full h-full object-cover shadow-lg;
						border-radius: 8px;
					}
				}

				.type {
					flex: 1 1 auto;
					padding-left: 10px;
					@apply flex flex-col;

					.h5 {
						@apply text-sm font-bold;
					}

					.tags {
						padding: 5px 10px 5px 0;

						span {
							padding: 1px 5px;
							border: 1px solid #f1f1f1;
							font-size: 14px;
							line-height: 1.5;
							margin: 2px 5px;
							display: inline-block;
							border-radius: 5px;
						}
					}
				}
			}

			.score {
				padding: 10px 0px;
				@apply flex justify-between items-center;

				.score-num-text {
					@apply text-center;

					.num {
						font-size: 18px;
						color: #fe6900;
					}

					.n-1 {
						color: #ef073f;
					}

					i {
						color: #ff5039;
					}

					.text {
						color: #b1b1b1;
						font-size: 14px;
					}
				}

				.score-pro {
					width: 50%;
					@apply m-auto;

					.var-progress {
						margin-top: 2px;
					}
				}
			}

			.desc {
				font-size: 14px;
				@apply text-gray-950 text-ellipsis overflow-hidden w-full line-clamp-6;
				max-height: 12em;
			}

			.people {
				.h5 {
					@apply text-sm font-bold;
				}

				.list {
					@apply flex flex-wrap justify-start items-center w-full box-border;
					padding-left: 30px;
				}
			}
		}
	}
}
</style>
