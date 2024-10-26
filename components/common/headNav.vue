<template>
	<div class="amx-headNav flex justify-between items-center">
		<div class="left">
			<slot name="left">
				<var-icon name="chevron-left" size="28px" @click="leftOnClick" />
			</slot>
		</div>
		<div class="content">
			<slot name="title">
				<h5 class="font-medium" style="color: var(--amx-header-title-color)">{{ title }}</h5>
			</slot>
		</div>
		<div class="right">
			<slot name="right">
				<var-icon namespace="i" name="search" color="#3fca80" size="28px" @click="rightOnClick" />
			</slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
interface Props {
	title?: string
	leftOnClick?: () => void
	rightOnClick?: () => void
}
const props = withDefaults(defineProps<Props>(), {
	title: "找片",
	leftOnClick: () => {},
	rightOnClick: () => {},
})

onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@import "~/assets/virtual.icons.css";

@include b(headNav) {
	height: var(--amx-header-input-height);
}

.content {
	padding: 0 10px 0 5px;
	font-size: 14px;
	color: var(--amx-header-title-color);
	@apply font-semibold;

	h5 {
		font-size: 14px;
		color: var(--amx-header-title-color);
		@apply font-semibold;
	}
}

.left {
	width: 72px;
	margin-left: 10px;
	@apply h-full text-center flex items-center justify-start;
}

.right {
	width: 70px;
	@apply h-full text-center flex items-center justify-center;
}
</style>
