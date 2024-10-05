<template>
	<!-- <NuxtRouteAnnouncer /> -->
	<NuxtPage />
</template>

<script setup lang="ts">
import setting from "public/setting.json"
// const router = useRouter()
const home = useHomeStore()
useHead({
	title: "我的",
	titleTemplate: titleChunk => {
		let title = home.getHomeSeo.name ? home.getHomeSeo.name : setting.title
		return titleChunk ? `${title} - ${titleChunk}` : `${title}`
	},
})
// showError({
// 	statusCode: 500,
// 	message: "出现问题了请联系管理员"
// })
const nav = [
	{ label: "Home", to: "/" },
	{ label: "About", to: "/about" },
	{ label: "Parent", to: "/parent" },
]
</script>
