<template>
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
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import "animate.css"

const { path, query } = useRoute()
//接收父组件传递过来的搜索结构和修改点击搜索后的状态
const props = withDefaults(defineProps<{ searchResultShow: boolean; searchText: string }>(), {
	searchText: "",
	searchResultShow: false,
})
const searchText = ref<string>(props.searchText || (query.wd as string) || "") // 传入
const searchResultShow = ref(props.searchResultShow || false) // 传入

const emit = defineEmits(["update:searchText", "update:searchResultShow"])

let timer: NodeJS.Timeout
const searchTextShow = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
let searchInputShow = ref(false)
const searchTextData = reactive<string[]>(["1", "2"])
const home = useHomeStore()
let searchHits = home.searchHits

const router = useRouter()
//判断是那个页面在设置搜索结果页面比较特殊
if (path.includes("search")) {
	searchInputShow.value = true
}
//选中搜索框
const searchSelect = async () => {
	searchInputShow.value = true
	console.log("searchSelect", searchText.value, "sss", searchTextData[searchTextShow.value])
	if (!searchText.value) {
		searchText.value = searchTextData[searchTextShow.value]
		emit("update:searchText", searchTextData[searchTextShow.value])
	}
	clearInterval(timer)
	await nextTick()
	inputRef.value?.focus()
	emit("update:searchResultShow", true)
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
	if (!value && searchText.value) {
		home.searchHits.push(searchText.value)
	}
	router.push({ name: "search", query: { wd: searchText.value } })
	// searchInputShow.value = !searchInputShow.value
	// searchResultShow.value = !searchResultShow.value
}
//搜索返回
const searchBack = () => {
	if (path.includes("search")) {
		router.go(-1)
		return
	}
	searchInputShow.value = false
	emit("update:searchResultShow", false)
	emit("update:searchText", "")
	intervalScroll()
}
//将兄弟组件需要使用到的值暴露出去
onMounted(() => {
	intervalScroll()
	console.log("mounted")
})
onUnmounted(() => {
	console.log("unmounted")
	clearInterval(timer)
})
</script>
<style scoped lang="scss">
@import "~/assets/virtual.icons.css";

@include b(input) {
	@apply flex items-center justify-between;
	height: var(--amx-header-input-height);
	background-color: var(--amx-bc);
	line-height: 1;

	@include e(left) {
		width: 72px;
		@apply object-center;
		--avatar-background-color: transparent;
		--avatar-normal-size: 100%;

		i {
			height: 100%;
		}
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
					font-size: 10px;
					color: #3fca80;
					padding: 2px 4px 2px 2px;
					background-color: rgb(24 160 88 / 10%);
					display: inline-block;
					margin-left: 3px;
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
