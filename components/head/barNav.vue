<template>
	<var-popup
		position="right"
		class="amx-popup_bar"
		:style="[editorState ? 'width:100vw;' : '']"
		v-model:show="modelBarNavShow"
		:overlay="true"
	>
		<div class="amx-popup__content_search">
			<div class="amx-popup_bar__title sticky top-0 z-10">
				<div class="bar__title">导航</div>
				<div class="bar__button">
					<template v-if="!editorState">
						<span class="bar__button--default" @click="review">恢复默认</span>
						<span @click="editor">编辑</span>
					</template>
					<template v-else>
						<span @click="submit">完成</span>
					</template>
				</div>
			</div>
			<div class="amx-s-r-title">
				<div class="amx-s-r-title__hits bar__nav__title">
					<div class="flex justify-between items-center">
						<div class="inline-block">
							<span class="super">我的频道</span>
						</div>
					</div>
					<transition-group
						class="items-center justify-start flex-wrap my-3 grid grid-cols-3 gap-3"
						leave-active-class="animate__animated animate__hinge"
						enter-active-class="animate__animated animate__flipInY"
						tag="aside"
					>
						<div v-for="(item, index) in myNav" :key="item" @click="deleteItem(index, item)">
							<p
								class="hits-item nav-item"
								:class="{ animation_item: editorState && deleteIndex != item }"
							>
								<span class="text"> {{ item }}</span>
								<span class="plus absolute">
									<var-icon
										name="window-close"
										:class="{ invisible: !editorState }"
										class="vertical-align-inherit"
									/>
								</span>
							</p>
						</div>
					</transition-group>
				</div>
				<div class="amx-s-r-title__hits bar__nav__title">
					<div class="flex justify-between items-center">
						<div class="inline-block">
							<span class="super">我的导航</span>
						</div>
					</div>
					<transition-group
						class="items-center justify-start flex-wrap my-3 grid grid-cols-3 gap-3"
						leave-active-class="animate__animated animate__hinge"
						enter-active-class="animate__animated animate__flipInY"
						tag="aside"
					>
						<p class="hits-item nav-item no-add" v-for="(item, index) in 10" :key="item">
							<span class="text"> {{ item }}</span>
							<span class="plus absolute"
								><var-icon name="plus" class="vertical-align-inherit"
							/></span>
						</p>
					</transition-group>
				</div>
				<div class="amx-s-r-title__hits bar__nav__title">
					<div class="flex justify-between items-center">
						<div class="inline-block">
							<span class="super">我的导航</span>
						</div>
					</div>
					<aside class="amx-no__button">已全部添加到"我的频道"</aside>
				</div>
				<div class="amx-s-r-title__hits bar__nav__title">
					<div class="flex justify-between items-center">
						<div class="inline-block">
							<span class="super">我的导航</span>
						</div>
					</div>
					<template v-if="movieNav.length == 0">
						<aside class="amx-no__button">已全部添加到"我的频道"</aside>
					</template>
					<template v-else>
						<transition-group
							class="items-center justify-start flex-wrap my-3 grid grid-cols-3 gap-3"
							leave-active-class="animate__animated animate__fadeOutTopLeft"
							enter-active-class="animate__animated animate__fadeOutTopLeft"
							tag="aside"
						>
							<p
								class="hits-item nav-item"
								v-for="(item, index) in movieNav"
								:key="item"
								@click="addItem(index, item)"
							>
								<span class="text"> {{ item }}</span>
								<span class="close absolute">
									<var-icon name="plus" class="vertical-align-inherit" />
								</span>
							</p>
						</transition-group>
					</template>
				</div>
				<div class="amx-s-r-title__hits bar__nav__title">
					<div class="flex justify-between items-center">
						<div class="inline-block">
							<span class="super">我的导航</span>
						</div>
					</div>
					<aside class="items-center justify-start flex-wrap my-3 grid grid-cols-3 gap-3">
						<p class="hits-item nav-item" v-for="(item, index) in 10" :key="item">
							<span class="text"> {{ item }}</span>
							<span class="close absolute">
								<var-icon name="plus" class="vertical-align-inherit" />
							</span>
						</p>
					</aside>
				</div>
			</div>
		</div>
	</var-popup>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
const editorState = ref(false)
const deleteIndex = ref<string | number>("")
const myNav = reactive<Array<string | number>>(["电影", "直播", "影视"])
const movieNav = reactive<Array<string | number>>([
	"电影",
	"电视剧",
	"综艺",
	"动漫",
	"纪录片",
	"短片",
	"预告片",
	"电影票房",
])
const modelBarNavShow = defineModel({ type: Boolean, default: false })

//编辑
const editor = () => {
	editorState.value = true
}
//恢复默认
const review = () => {
	console.log("review")
}
//完成
const submit = () => {
	editorState.value = false
	modelBarNavShow.value = false
}
//删除
const deleteItem = (index: number, item: string | number) => {
	if (editorState.value) {
		deleteIndex.value = item
		myNav.splice(index, 1)
	}
}
//添加
const addItem = (index: number, item: string | number) => {
	if (editorState.value) {
		myNav.splice(index, 0, item)
		movieNav.splice(index, 1)
	}
}
onMounted(() => {
	console.log("mounted")
})
</script>
<style lang="scss">
.amx-popup_bar {
	width: 316px;

	.amx-popup_bar__title {
		padding: 23px 12px;
		font-size: 18px;
		@apply flex font-bold justify-between items-center box-border w-full;
		background-color: var(--amx-bc);
		border-bottom: 1px solid var(--amx-hr-color);

		.bar__title {
			font-size: inherit;
			color: var(--amx-header-title-color);
		}

		.bar__button {
			font-size: 14px;
			color: var(--amx-header-title-color);

			.bar__button--default {
				margin-right: 25px;
			}

			span {
				color: var(--amx-theme-color);
			}
		}
	}

	.bar__nav__title {
		padding: 6px 3px 8px 3px;

		.nav-item.no-add {
			background-color: var(--amx-bc);
			border: 1px solid var(--amx-hr-color);
		}

		.animation_item {
			animation: shake 800ms ease-in-out infinite;
		}

		.nav-item.hits-item {
			margin-right: 0px;
			margin-bottom: 0px;
			@apply text-center text-ellipsis relative;

			.text {
				@apply font-sans;
			}

			.plus,
			.close {
				right: 4px;
				top: 50%;
				transform: translateY(-50%);

				i {
					font-size: 12px;
					vertical-align: inherit;
				}
			}
		}

		.amx-no__button {
			padding: 22px 0px 20px 0px;
			font-size: 12px;
			color: var(--amx-play-text-smail-color);
		}

		@keyframes shake {
			/* 水平抖动，核心代码 */
			0% {
				transform: translateX(0);
			}

			25% {
				transform: translateX(-5px);
			}

			50% {
				transform: translateX(5px);
			}

			75% {
				transform: translateX(-5px);
			}

			100% {
				transform: translateX(0);
			}
		}
	}
}
</style>
