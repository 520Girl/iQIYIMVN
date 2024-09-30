<template>
	<!-- <svg :width="width" :height="height" aria-hidden="true" :fill="fill" :name="name">
      <use :xlink:href='`#icon-${name}`' :fill="fill"></use>
    </svg> -->
	<component :is="name" :width="width" :height="height" />
</template>

<script setup lang="ts">
import type { IconItem } from "~/types/api"
const props = withDefaults(defineProps<IconItem>(), {
	name: "",
	height: "1em",
	width: "1em",
})
</script>

<style scoped lang="scss">
.nuxt-icon {
	width: 1em;
	height: 1em;
	margin-bottom: 0.125em;
	vertical-align: middle;
}
.nuxt-icon--fill,
.nuxt-icon--fill * {
	fill: revert-layer;
}
</style>
