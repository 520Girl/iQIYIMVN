<template>
	<div class="amx-Galloping-steak">
		<!-- <var-overlay v-model:show="home.loadingShow">
			<img src="@/public/loading/loading.webp" alt="" />
		</var-overlay> -->
		<slot />
	</div>
</template>
<script setup lang="ts">
const home = useHomeStore()
</script>
<style scoped lang="scss">
.amx-Galloping-steak {
	background-color: var(--amx-play-button-bc);
}
</style>
