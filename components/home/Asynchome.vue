<template>
	<div>
		<Suspense>
			<template #default>
				<!-- <PagesIndex /> -->
			</template>

			<template #fallback>
				<Skeleton />
			</template>
		</Suspense>
	</div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
@import url("~/assets/css/common/pageMain.scss");
</style>
