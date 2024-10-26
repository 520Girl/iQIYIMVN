<template>
	<component
		@click.stop.prevent
		:is="tag"
		:class="['amx-ListItem', 'w-' + width, { 'disable-click': isDisable }]"
	>
		<div class="amx-ListItem__img img-height">
			<nuxt-link :to="src" :title="title" class="link" replace>
				<nuxt-img
					class="link"
					:src="imgUrl"
					:placeholder="img(`/loading/loading.svg`, { h: 20 })"
					loading="lazy"
					preload
				/>
				<template v-if="rightT.type === 1 || rightT.type === 2">
					<div :class="'c-rt c-rt-' + rightT.type">
						{{ rightT.text }}
					</div>
				</template>
				<template v-else-if="rightT.type === 3">
					<div :class="'c-rt c-rt-' + rightT.type">
						<span>{{ rightText[0] }}</span>
						<span>{{ rightText[1] }}</span>
					</div>
				</template>
				<div :class="'c-lb c-lb' + leftB.type" v-if="leftB.type === 1 || leftB.type === 2">
					{{ leftB.text }}
				</div>
				<div :class="'c-rb c-rb-' + rightB.type" v-if="rightB.type">
					<span class="c-date">
						{{ rightB.text }}
					</span>
				</div>
				<div class="c-lt" v-if="leftT.type === 1">
					<var-icon name="star-outline" />
				</div>
			</nuxt-link>
		</div>
		<div class="amx-ListItem__title">
			<div class="c-title text-ellipsis">
				<nuxt-link :to="src" :title="title" replace>
					{{ title }}
				</nuxt-link>
			</div>
			<template v-if="bottomT && (bottomT.type === 1 || bottomT.type === 2)">
				<div class="c-info text-ellipsis font-sans">
					<nuxt-link :to="src" :title="description" replace>
						{{ description }}
					</nuxt-link>
				</div>
				<div class="c-class c-info">
					<div :class="['c-tag']" v-if="bottomT.type === 1">
						<span
							:class="'c-tag-' + bottomT.type"
							v-for="(item2, index2) in bottomT.text.split('|')"
							>{{ item2 }}</span
						>
					</div>
					<div class="c-tag" v-if="bottomT.type === 2">
						<p class="c-tag-2">{{ bottomT.text }}</p>
					</div>
					<div class="more" v-if="more">
						<var-icon name="dots-vertical" />
					</div>
				</div>
			</template>
			<template v-else>
				<div class="c-info c-class text-ellipsis">
					<NuxtLink :to="src" :title="title" replace v-if="bottomT.type != 3">
						{{ description }}
					</NuxtLink>
					<div class="c-tag" v-else>
						<p class="c-tag-2">{{ bottomT.text }}</p>
					</div>
					<div class="more" v-if="more">
						<var-icon name="dots-vertical" />
					</div>
				</div>
			</template>
		</div>
	</component>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import type { ListItem } from "@/types/api/index.d.ts"

const rightText = computed(() => {
	const { type, text } = props.rightT || { type: 1, text: "" }
	return text?.split("|") || []
})

const props = withDefaults(defineProps<ListItem>(), {
	imgUrl: "",
	title: "",
	description: "",
	src: () => ({
		name: "lay-type_id-vod_id",
		params: { type_id: 0, vod_id: 0 },
	}),
	more: false,
	tag: "div",
	width: 2,
	height: "90px",
	leftT: () => ({
		type: 1,
		text: "",
	}),
	rightT: () => ({
		type: 1,
		text: "",
	}),
	rightB: () => ({
		type: 1,
		text: "",
	}),
	leftB: () => ({
		type: 1,
		text: "",
	}),
	bottomT: () => ({
		//0 不显示
		type: 0,
		text: "电影|70后|动漫",
	}),
})

const isDisable = ref(false)
const { params } = useRoute()
if (
	typeof props.src === "object" &&
	props.src !== null &&
	Number(params.type_id) === Number(props.src.params?.type_id) &&
	Number(params.vod_id) === props.src.params?.vod_id
) {
	isDisable.value = true
}
const img = useImage()
onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@import "/assets/css/mixin.scss";
@include ListItem_1;

@include b(ListItem) {
	@apply w-2/4 inline-block box-border px-1;

	@include e(img) {
		@apply w-full h-40 relative;
		height: 90px;
	}

	@include e(title) {
		padding: 4px 0px;
		@apply box-border;
	}
}

.w-1 {
	@apply w-full;
}

.w-2 {
	@apply w-2/4;
}

.w-3 {
	@apply w-4/12;

	.amx-ListItem__img {
		// @apply h-56;
		max-height: 224px;
	}
}

.img-height {
	height: v-bind(height);
}

.disable-click {
	@apply pointer-events-none;
	opacity: 0.5;
	/* 可选：增加透明度以表示禁用状态 */
}
</style>
