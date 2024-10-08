<template>
	<!-- <NuxtRouteAnnouncer /> -->
	<NuxtPage />
</template>

<script setup lang="ts">
import setting from "public/setting.json"
// const router = useRouter()
const home = useHomeStore()
// const { data, pending, error, refresh } = await useAsyncData('dragAsyncData2', () => $fetch(`${import.meta.env.VITE_API_URL || process.env.NUXT_API_URL}/api.php/Aqiyim/homeBase`))
if (!home.base.seo) {
	const { data, pending, error, refresh } = await useAsyncData("dragAsyncDataSeo", () =>
		getHomeBase()
	)
	//! 项目初始化时更新配置
	home.$patch(store => {
		if (data.value) {
			const { list, from, seo } = data!.value as any
			store.base = { list, from, seo }
		}
	})
}
useHead({
	title: "首页",
	titleTemplate: titleChunk => {
		let title = home.getHomeSeo.name ? home.getHomeSeo.name : setting.title
		return titleChunk ? `${title} - ${titleChunk}` : `${title}`
	},
})
// showError({
// 	statusCode: 500,
// 	message: "出现问题了请联系管理员"
// })
</script>
