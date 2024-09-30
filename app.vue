<template>
	<!-- <NuxtRouteAnnouncer /> -->
	<NuxtPage />
</template>

<script setup lang="ts">
import setting from "public/setting.json"
// const router = useRouter()
useHead({
	title: "我的",
	titleTemplate: titleChunk => {
		return titleChunk ? `${setting.title} - ${titleChunk}` : `${setting.title}`
	},
})
const nav = [
	{ label: "Home", to: "/" },
	{ label: "About", to: "/about" },
	{ label: "Parent", to: "/parent" },
]
</script>
