<template>
	<!-- <NuxtRouteAnnouncer /> -->
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
import setting from "public/setting.json"
// import DisableDevtool from "disable-devtool"
if (process.client) {
	// import("@/utils/NOdevtool")
	// 仅在客户端加载 disable-devtool 插件
	// 	import('disable-devtool').then(module => {
	// 		const DisableDevtool = module.default;
	// 		const options = {
	// 			md5: 'GallopingSteak', // 加密密钥，默认为空，不加密
	// 			clearLog: true, // 是否每次都清除log
	// 			disableSelect: true, // 是否禁用选择文本 默认为false
	// 			disableCopy: true, // 是否禁用复制 默认为false
	// 			disableCut: true, // 是否禁用剪切 默认为false
	// 			disablePaste: true, // 是否禁用粘贴 默认为false
	// 			// rewriteHTML:'禁止访问！！',
	// 			timeOutUrl: `/`, // 超时跳转地址，默认为空，不跳转
	// 		};
	// 		DisableDevtool(options);
	// 	}).catch(err => {
	// 		console.error("Failed to load disable-devtool:", err);
	// 	});
}
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
<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}

.page-enter-from {
	opacity: 0;
	transform: translate(-20px, 0);
}

.page-leave-to {
	opacity: 0;
	transform: translate(20px, 0);
}
/* .page-enter-active {
  transition: all 0.3s ease-out;
}

.page-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.page-enter-from,
.page-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */
</style>
