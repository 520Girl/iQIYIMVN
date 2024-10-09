<template>
	<aside class="amx-novel-aside">
		<nuxt-link :to="{ path: '/', query: { t: src } }" tag="a" class="amx-aside-inner">
			<div class="amx-aside-inner__logo background" :style="{ background: bc }">
				<SvgIcon :name="'svgo-' + icon" />
				<!-- <component :is="'svgo-'+icon" class="amx-aside-inner__logo-icon"></component> -->
			</div>
			<div class="amx-aside-inner__text">
				{{ text }}
			</div>
		</nuxt-link>
	</aside>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import type { AsideItem } from "@/types/api/index.d.ts"
const router = useRouter()
const props = withDefaults(defineProps<{ item: AsideItem }>(), {
	item: () => ({
		text: "男频",
		src: 1,
		icon: "boy",
		bc: "#fff",
	}),
})
const { text, src, icon, bc } = toRefs(props.item)
onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
.background {
	background-color: v-bind(bc);
}

@import "~/assets/virtual.icons.css";

@include b(novel-aside) {
	@apply w-1/5 box-border text-center inline-block;
}

@include b(aside-inner) {
	@apply w-full inline-block;

	@include e(logo) {
		font-size: 28px;
		background-color: var(--amx-theme-color);
		width: 45px;
		height: 45px;
		border-radius: 50%;
		@apply flex items-center justify-center rounded-full m-auto;
		// background-color: red;
	}

	.boy {
		background-color: #d9f4fd;
	}

	.girl {
		background-color: #fee4e7;
	}

	.searchNovel {
		background-color: #f2eaff;
	}

	.shu {
		background-color: #defaeb;
	}

	.tingBook {
		background-color: #fdf5c4;
	}

	@include e(text) {
		@apply text-center font-sans;
		font-size: 14px;
	}
}
</style>
