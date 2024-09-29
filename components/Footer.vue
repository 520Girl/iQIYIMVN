<template>
	<footer class="amx-footer">
		<var-bottom-navigation v-model:active="active" fixed safe-area>
			<var-bottom-navigation-item label="首页" icon="home">
				<template #icon>
					<var-icon namespace="i" name="home" />
				</template>
			</var-bottom-navigation-item>
			<var-bottom-navigation-item label="随刻视频" icon="hudong">
				<template #icon>
					<var-icon namespace="i" name="hudong" />
				</template>
			</var-bottom-navigation-item>
			<var-bottom-navigation-item label="会员">
				<template #icon>
					<var-icon namespace="i" name="vip" />
				</template>
			</var-bottom-navigation-item>
			<var-bottom-navigation-item label="发现" icon="faxian">
				<template #icon>
					<var-icon namespace="i" name="faxian" />
				</template>
			</var-bottom-navigation-item>

			<var-bottom-navigation-item label="我的" icon="me" :badge="badgeProps">
				<template #icon>
					<var-icon namespace="i" name="me" />
				</template>
			</var-bottom-navigation-item>
		</var-bottom-navigation>
	</footer>
</template>
<script setup lang="ts">
import type { BadgeProps } from "@varlet/ui"
const active = ref(0)
const badgeProps = reactive<BadgeProps>({
	type: "danger",
	value: "66",
})
</script>
<style lang="scss" scoped>
@import "~/assets/virtual.icons.css";

@include b(footer) {
	width: 100%;
	@apply fixed bottom-0;
}
</style>
