<template>
	<div>
		<SearchSCinput
			v-model:searchText.trim="searchText"
			v-model:searchResultShow="searchResultShow"
		/>
		<div class="amx-search-result">
			<template v-if="popupClientShow">
				<var-popup
					position="bottom"
					class="amx-popup_search"
					v-model:show="searchResultShow"
					:overlay="false"
				>
					<div class="amx-popup__content_search">
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

let searchText = ref<string>("")
let searchResultShow = ref(false)
const home = useHomeStore()
let searchHits = home.searchHits
const popupClientShow = ref(false)
console.log("home", searchHits, import.meta.env.SSR, process.client)
//热榜选中
let classifySelect = ref(0)

//清除搜索
const clearHits = () => {
	searchHits.splice(0, searchHits.length)
}

onMounted(() => {
	console.log("mounted")
	popupClientShow.value = process.client
})
onUnmounted(() => {
	console.log("unmounted")
})
</script>
<style lang="scss">
@import "~/assets/css/common/searchPopup.scss";
</style>
