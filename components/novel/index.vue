<template>
	<div class="amx-novel-main">
		<div class="amx-novel-main__aside">
			<CommonAside v-for="(item, index) in list" :="item" :key="index"></CommonAside>
		</div>
		<div class="amx-novel-main__List">
			<NovelComponentsList />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
const props = defineProps({
	data: {},
})
const list = reactive([
	{
		text: "男频",
		src: 1,
		icon: "boy",
	},
	{
		text: "女频",
		src: 2,
		icon: "girl",
	},
	{
		text: "听书",
		src: 3,
		icon: "tingBook",
	},
	{
		text: "书架",
		src: 4,
		icon: "shu",
	},
	{
		text: "找书",
		src: 5,
		icon: "searchNovel",
	},
])

onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@include b(novel-main) {
	@include e(aside) {
		@apply flex;
		padding: 15px 9px;
	}
	@include e(List) {
	}
}
</style>
