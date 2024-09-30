<template>
	<component :is="tag" :class="['amx-ListItem', 'w-' + width]">
		<div class="amx-ListItem__img">
			<a
				:href="src"
				:title="title"
				rel=""
				class="link"
				:style="'background-image:url(' + imgUrl + ');'"
			>
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
				<div class="c-lb" v-if="leftB.type === 1">{{ leftB.text }}</div>
				<div :class="'c-rb c-rb-' + rightB.type" v-if="rightB.type">
					<span class="c-date">
						{{ rightB.text }}
					</span>
				</div>
				<div class="c-lt" v-if="leftT.type === 1">
					<var-icon name="star-outline" />
				</div>
			</a>
		</div>
		<div class="amx-ListItem__title">
			<div class="c-title text-ellipsis">
				<a href="//m.iqiyi.com/v_12b7e5ue8cc.html" title="喜剧之王单口季">
					{{ title }}
				</a>
			</div>
			<div class="c-info text-ellipsis">
				<a href="//m.iqiyi.com/v_12b7e5ue8cc.html" title="小鹿犀利解构容貌焦虑">
					{{ description }}
				</a>
				<div class="more" v-if="more">
					<var-icon name="dots-vertical" />
				</div>
			</div>
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
	src: "",
	more: false,
	tag: "div",
	width: 2,
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
})

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
		max-height: 90px;
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
		@apply h-56;
		max-height: 224px;
	}
}
</style>
