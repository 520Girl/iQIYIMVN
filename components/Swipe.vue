<template>
	<div class="amx-swipe" ref="swipeElement ">
		<!-- //:autoplay="4000" -->
		<var-swipe class="swipe">
			<var-swipe-item v-for="(item, index) in swipeList" :key="item.src">
				<a :href="item.src" :title="item.title">
					<img class="swipe-image" :src="item.imgUrl" :alt="item.title" />
					<div class="swipe-title">{{ item.title }}</div>
					<div class="swipe-AD">广告</div>
				</a>
			</var-swipe-item>
			<template #indicator="{ index, length, to }">
				<div class="amx-swipe__indicators">
					<div
						class="amx-swipe__indicator"
						v-for="(l, idx) in length"
						:key="l"
						:class="{ 'amx-swipe--active-indicator': idx === index }"
						@click="to(idx)"
					></div>
				</div>
			</template>
		</var-swipe>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
const swipeList = reactive([
	{
		src: "https://varletjs.org/cat.jpg",
		imgUrl: "https://varletjs.org/cat.jpg",
		title: "cat好看的小猫",
	},
	{ src: "https://varletjs.org/cat2.jpg", imgUrl: "https://varletjs.org/cat.jpg", title: "cat1" },
	{ src: "https://varletjs.org/cat3.jpg", imgUrl: "https://varletjs.org/cat.jpg", title: "cat2" },
])

onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@include b(swipe) {
	height: 196px;
	overflow: hidden;

	@include e(indicators) {
		position: absolute;
		display: flex;
		bottom: 10px;
		right: 10px;
	}

	@include e(indicator) {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #fff;
		opacity: 0.3;
		margin: 0 2px;
		transition: opacity 0.3s;
	}

	@include m(active-indicator) {
		opacity: 1;
	}

	.swipe {
		height: 100%;

		.var-swipe-item {
			position: relative;
		}

		.swipe-title {
			position: absolute;
			bottom: 5px;
			z-index: 2;
			left: 15px;
			color: #fff;
			padding: 5px;
			text-align: center;
			@apply font-sans text-lg;
		}

		.swipe-AD {
			position: absolute;
			top: 5px;
			right: 15px;
			color: #fff;
			padding: 5px;
			font-size: 10px;
			text-align: center;
		}

		&-enter-active,
		&-leave-active {
			transition: all 0.3s;
		}

		&-enter,
		&-leave-to {
			transform: translateY(-100%);
		}
	}

	.swipe-image {
		width: 100%;
		height: 100%;
		@apply object-cover;
	}
}
</style>
