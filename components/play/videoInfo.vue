<template>
	<div class="amx-moviePlay-info">
		<div class="amx-moviePlay-info__title">
			<section class="amx-p-t">
				<h1 class="amx-p-t__h1">传说</h1>
				<div href="www.baidu.com" class="amx-p-t__span" @click="bottomPopup = true">
					详情
					<var-icon name="chevron-right" />
				</div>
			</section>
			<section class="amx-p-i" @click.stop ref="slide">
				<ul class="amx-p-i__ul">
					<li class="amx-p-i__li" :ripple="false" style="color: rgb(235 189 89)">
						<var-icon name="fire" />39642
					</li>
					<li class="amx-p-i__li" :ripple="false" style="color: rgb(255 102 125)">6.5分</li>
					<li class="amx-p-i__li" :ripple="false">60帧</li>
					<li class="amx-p-i__li" :ripple="false">电影热播榜No.6</li>
					<li class="amx-p-i__li" :ripple="false">成龙</li>
					<li class="amx-p-i__li" :ripple="false">唐三彩</li>
					<li class="amx-p-i__li" :ripple="false">是的</li>
					<li class="amx-p-i__li" :ripple="false">对头</li>
				</ul>
			</section>
		</div>
		<div class="amx-moviePlay-info__AD">
			<div class="AD">广告</div>
		</div>
		<div class="anmx-moviePlay-info__list">
			<CommonListItem v-for="(item, index) in list" :key="index" :="item" />
		</div>
		<div class="amx-moviePlay-info__more__popup">
			<var-popup position="bottom" class="amx-popup" v-model:show="bottomPopup" :overlay="false">
				<div class="amx-popup__content">
					<div class="amx-popup__content--title">
						<div class="p-t-1">详细</div>
						<var-icon name="window-close" @click="closeMorePopup" />
					</div>
					<div class="amx-popup__content--body">
						<div class="img-type">
							<div class="img">
								<img src="public/home/4274bd8105cc43dab19b180dadeafac4.webp" alt="" />
							</div>
							<div class="type">
								<h5 class="h5">抓娃娃</h5>
								<div class="tags">
									<span>抓娃娃</span>
									<span>70后</span>
									<span>70后喜剧</span>
									<span>70后喜剧</span>
									<span>70后喜剧</span>
									<span>70后喜剧</span>
								</div>
							</div>
						</div>
						<div class="score" justify="space-between">
							<div class="score-num-text">
								<div class="num">9.8</div>
								<div class="text">观众评分</div>
							</div>
							<div class="score-pro">
								<var-progress
									:value="40"
									color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)"
								/>
								<var-progress
									:value="60"
									color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)"
								/>
								<var-progress
									:value="80"
									color="linear-gradient(131.53deg, #3fecff 0%, #6149f6 100%)"
								/>
							</div>
							<div class="score-num-text">
								<div class="num n-1">9852</div>
								<div class="text t-1">
									<var-icon name="fire" />
									热度值
								</div>
							</div>
						</div>
						<div class="desc">
							这是一堆堆内容的描这是一堆堆内容的描这是一堆 堆内容的描这是一堆堆内容的描这是一堆堆
							内容的描这是一堆堆内容的描这是一堆堆内 容的描这是 一堆堆内容的描这是一堆堆内容的描
						</div>
						<div class="people">
							<h5 class="h5">演员列表：</h5>
							<div class="list">
								<var-space>
									<var-space direction="column" align="center">
										<var-avatar src="https://varletjs.org/cat.jpg" fit="fill" />
										<span>fill</span>
									</var-space>
									<var-space direction="column" align="center">
										<var-avatar>昇腾 </var-avatar>
										<span>昇腾</span>
									</var-space>
								</var-space>
							</div>
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
let bottomPopup = ref(true)
let sliderScroll: any = null
let slide = ref<HTMLElement | null>(null)
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
}
const active = ref(0)
onMounted(() => {
	console.log("mounted")
	initSlider()
})
//关闭详情信息遮蔽层
const closeMorePopup = () => {
	console.log(8888)
	bottomPopup.value = false
}
const handleClick = (active: string | number) => {
	console.log("click", active)
}
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
			border: 1px solid #f1f1f1;
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
				@apply text-gray-950 text-ellipsis;
				max-height: 140px;
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
