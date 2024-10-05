<template>
	<div>
		<Header />
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"

onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss"></style>
