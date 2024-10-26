<template>
	<div>
		<div class="amx-input" :class="{ selectInput: searchInputShow }">
			<div class="amx-input__left">
				<var-icon name="chevron-left" v-show="searchInputShow" @click="searchBack" />
				<var-avatar src="/image/header-logo.png" :round="false" v-show="!searchInputShow"
					>aiqiyi</var-avatar
				>
			</div>
			<div class="amx-input__center" @click="searchSelect">
				<div class="search">
					<div class="search-input">
						<input
							type="text"
							v-model="searchText"
							ref="inputRef"
							class="input"
							v-show="searchInputShow"
						/>

						<transition-group
							name="list"
							tag="div"
							class="block w-full h-full text-center bg-transparent"
							v-show="!searchInputShow"
						>
							<div
								v-for="(item, index) in 5"
								class="block w-full text-center search-input-text bg-transparent h-full"
								v-show="searchTextShow === index"
								:key="index"
							>
								<p>热搜榜{{ index }}</p>
								<span>(热搜榜视频)</span>
								<span>限免</span>
							</div>
						</transition-group>
					</div>
					<div class="search-icon">
						<var-icon namespace="i" name="search" />
					</div>
				</div>
			</div>
			<div class="amx-input__right">
				<span v-show="searchInputShow" @click="search">搜索</span>
				<var-space v-show="!searchInputShow">
					<var-icon namespace="i" name="lishijilu" />
					<var-icon name="plus" />
				</var-space>
			</div>
		</div>
		<div class="amx-search-result">
			<template v-if="popupClientShow">
				<var-popup
					position="bottom"
					class="amx-popup"
					v-model:show="searchResultShow"
					:overlay="false"
				>
					<div class="amx-popup__content">
						<div class="amx-s-r-title">
							<div class="amx-s-r-title__hits">
								<div class="flex justify-between items-center">
									<div class="inline-block">
										<span class="super">搜索历史</span>
										<span class="vip rounded-md">免费领取会员</span>
									</div>
									<span class="icon">
										<var-icon name="trash-can-outline" @click="clearHits" />
									</span>
								</div>
								<aside class="flex items-center justify-start flex-wrap my-3">
									<p
										class="hits-item"
										v-for="(item, index) in searchHits"
										:key="item"
										@click="searchText = item"
									>
										{{ item }}
									</p>
								</aside>
							</div>
							<div class="amx-s-r-title__recommend">
								<p class="flex justify-between items-center">
									<span class="super"> 搜索推荐</span>
									<span class="icon"><var-icon name="refresh" /></span>
								</p>
								<aside
									class="flex items-center justify-start flex-wrap my-3 grid grid-cols-2 gap-2"
								>
									<p class="recommend-item">免费检索</p>
									<p class="recommend-item">免费检索</p>
									<p class="recommend-item">免费检索</p>
								</aside>
							</div>
						</div>
						<div class="amx-s-r-body">
							<div class="amx-s-r-body__classify">
								<p class="super">热搜榜</p>
								<DragLeftRight>
									<ul class="inline-block classify whitespace-nowrap overflow-hidden">
										<li
											class="body-item"
											:class="{ 'body-item_active': classifySelect === index }"
											v-for="(item, index) in 10"
											:key="index"
											@click="classifySelect = index"
										>
											<span>总榜{{ index }}</span>
										</li>
									</ul>
								</DragLeftRight>
							</div>

							<article class="amx-s-r-body__article">
								<ul class="amx-s-r-body__list">
									<li
										v-for="(item, index) in 20"
										:key="index"
										class="flex flex-nowrap justify-start items-center box-border w-full article-list"
									>
										<span class="rank" :class="`rank_${index + 1 <= 3 ? index + 1 : 'N'}_c`">{{
											index + 1
										}}</span>
										<div class="content">
											<img
												class="img"
												height="62"
												width="42"
												src="http://localhost/upload/vod/20240418-1/d8a6d3ff1f9cce79ea9730c3d38fc14c.jpg"
												alt=""
											/>
											<div class="info">
												<h5 class="title">
													喜剧之王单口相声<span class="hot">热</span>
													<span class="limitFree">限免</span>
												</h5>
												<p class="desc">
													<span class="hot">热度破900</span><span class="hot">点赞900</span>
												</p>
												<div class="tags">
													<span class="score">8.9分</span><span class="sub">/</span>
													<span class="tag">综艺</span><span class="sub">/</span>
													<span class="duration">郭麒麟 吴征宇</span>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</article>
						</div>
					</div>
				</var-popup>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import "animate.css"

let timer: NodeJS.Timeout
const searchTextShow = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
let searchInputShow = ref(false)
let searchText = ref<string>("")
let searchResultShow = ref(false)
const searchTextData = reactive<string[]>(["1", "2"])
const home = useHomeStore()
let searchHits = home.searchHits
const popupClientShow = ref(false)
console.log("home", searchHits, import.meta.env.SSR, process.client)
//热榜选中
let classifySelect = ref(0)
//选中搜索框
const searchSelect = async () => {
	searchInputShow.value = true
	if (!searchText.value) {
		searchText.value = searchTextData[searchTextShow.value]
	}
	clearInterval(timer)
	await nextTick()
	inputRef.value?.focus()
	searchResultShow.value = true
}
//定时滚动元素
const intervalScroll = () => {
	timer = setInterval(() => {
		if (searchTextShow.value >= searchTextData.length - 1) {
			searchTextShow.value = 0
		} else {
			searchTextShow.value++
		}
	}, 3500)
}
//搜索
const search = () => {
	let value = searchHits.find(item => item === searchText.value)
	if (!value) {
		home.searchHits.push(searchText.value)
	}

	// searchInputShow.value = !searchInputShow.value
	// searchResultShow.value = !searchResultShow.value
}
//清除搜索
const clearHits = () => {
	searchHits.splice(0, searchHits.length)
}
//搜索返回
const searchBack = () => {
	searchInputShow.value = false
	searchResultShow.value = false
	searchText.value = ""
	intervalScroll()
}
onMounted(() => {
	console.log("mounted")
	intervalScroll()
	popupClientShow.value = process.client
})
onUnmounted(() => {
	console.log("unmounted")
	clearInterval(timer)
})
</script>
<style scoped lang="scss">
@import "~/assets/virtual.icons.css";
@import "~/assets/css/mixin.scss";
@include rankColor;
@include tagColor;

@include b(input) {
	@apply flex items-center justify-between;
	height: var(--amx-header-input-height);

	@include e(left) {
		width: 72px;
		@apply object-center;
		--avatar-background-color: transparent;
		--avatar-normal-size: 100%;
	}

	@include e(center) {
		padding: 0 10px 0 5px;
		max-width: 245px;
		height: var(--amx-header-search-input-height);
		@apply grow;

		:deep(.var-field-decorator__middle) {
			margin: 0;

			.var-input__input {
			}
		}

		.search {
			@apply flex items-center justify-between;
			box-shadow: inset 0 2px 30px 0 rgb(0 0 0 / 0.1);
			border-radius: 15.5px;
			height: 100%;

			.search-input {
				@apply flex items-center justify-center truncate h-full w-full flex-wrap;
				flex: 1 1 50%;

				p {
					@apply font-sans inline-block;
					font-size: 13px;
				}

				span {
					@apply font-sans;
					font-size: 11px;
					color: rgb(136 136 136);
				}

				span:last-child {
					font-size: 9px;
					color: #3fca80;
					padding: 0 5px 0 2px;
					background-color: rgb(24 160 88 / 10%);
					display: inline-block;
					margin-left: 5px;
				}

				.input {
					@apply w-full h-full;
					padding-left: 15px;
					background-color: transparent;
					border: 0;
					color: var(--amx-theme-color);
					font-size: 14px;

					/* 设置输入框光标的颜色 */
					/* 自定义边框样式 */
					&:focus {
						outline: none;
						/* 去掉输入框的默认聚焦轮廓 */
						border-color: transparent;
						/* 自定义聚焦时的边框颜色 */
						border: 0;
					}
				}

				.search-input-text {
					height: 100%;
					@apply flex items-center justify-center w-full h-full;
				}
			}

			.search-icon {
				@apply flex items-center justify-center;
				font-size: 20px;
				color: #3fca80;
				margin-right: 5px;
			}
		}
	}

	@include e(right) {
		width: 70px;

		i:frist-child {
			font-size: 22px;
		}

		i:last-child {
			font-size: 24px;
		}
	}
}

@include b(search-result) {
}

.selectInput {
	.amx-input__left {
		width: 45px;
		@apply text-center h-full;
		color: var(--amx-header-title-simple);

		i {
			font-size: 33px;
			@apply font-normal;
		}
	}

	.amx-input__center {
		padding: 0px;
		max-width: 100%;
		transition: all 0.5s ease;
	}

	.amx-input__right {
		width: 57px;
		@apply text-center h-full flex items-center justify-center;
		font-size: 15px;
	}
}

.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
</style>
<style lang="scss">
@import "~/assets/css/common/searchPopup.scss";
</style>
