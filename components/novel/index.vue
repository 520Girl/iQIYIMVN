<template>
	<div class="amx-novel-main">
		<div class="amx-novel-main__aside">
			<CommonAside v-for="(item, index) in list" :item="item" :key="item.bc"></CommonAside>
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
		bc: "#d9f4fd",
	},
	{
		text: "女频",
		src: 2,
		icon: "girl",
		bc: "#fee4e7",
	},
	{
		text: "听书",
		src: 3,
		icon: "tingBook",
		bc: "#fdf5c4",
	},
	{
		text: "书架",
		src: 4,
		icon: "shu",
		bc: "#defaeb",
	},
	{
		text: "找书",
		src: 5,
		icon: "searchNovel",
		bc: "#f2eaff",
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
