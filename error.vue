<script setup lang="ts">
defineProps({
	error: Object,
})

function handleError() {
	clearError({ redirect: "/" })
}
</script>

<template>
	<Header />
	<div style="margin: auto; text-align: center; margin-top: 20px">
		<h1>{{ error?.message }}{{ error?.statusCode }}</h1>
		There was an error 😱
		<div>
			<var-button type="primary" @click="handleError"> Clear error </var-button>
		</div>
	</div>
</template>
