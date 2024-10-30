import setting from "public/setting.json"
export default defineNuxtRouteMiddleware(async (to, from) => {
	const home = useHomeStore()
	//需要判断是否请求到导航数据
	if (!home.base.seo) {
		await home.getAsyncBaseData()
	}
	//设置头部seo
	useHead({
		title: "首页",
		titleTemplate: titleChunk => {
			let title = home.getHomeSeo.name ? home.getHomeSeo.name : setting.title
			return titleChunk ? `${title} - ${titleChunk}` : `${title}`
		},
	})
	setTimeout(() => {
		home.loadingShow = false
	}, 1000)
})
