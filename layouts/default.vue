<template>
	<div class="amx-Galloping-steak" data-editable="true">
		<var-overlay v-model:show="home.loadingShow">
			<img src="@/public/loading/loading.webp" alt="" />
		</var-overlay>
		<Header />
		<slot />
		<Footer />
	</div>
</template>
<script setup lang="ts">
const home = useHomeStore()
onMounted(() => {
	// document.getElementsByTagName("html")[0].classList.add("dark")
})
</script>
<style scoped lang="scss">
.amx-Galloping-steak {
	// background-color: var(--amx-main-bc-simple);
	height: 100vh;
}
</style>
