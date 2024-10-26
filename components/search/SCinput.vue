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
let timer: NodeJS.Timeout
const searchTextShow = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
let searchInputShow = ref(false)
let searchText = ref<string>("")
let searchResultShow = ref(false)

const searchTextData = reactive<string[]>(["1", "2"])
const home = useHomeStore()
let searchHits = home.searchHits
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
//搜索返回
const searchBack = () => {
	searchInputShow.value = false
	searchResultShow.value = false
	searchText.value = ""
	intervalScroll()
}
//将兄弟组件需要使用到的值暴露出去
provide("SearchSCinput", {
	searchResultShow,
	searchText,
})
onMounted(() => {
	intervalScroll()
	console.log("mounted")
})
onUnmounted(() => {
	console.log("unmounted")
	clearInterval(timer)
})
</script>
<style scoped lang="scss"></style>
