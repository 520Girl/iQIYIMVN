<template>
	<div class="div">
		Home
		<About />
	</div>
</template>

<script>
import About from "@/pages/about"

export default {
	components: { About },
}
</script>
<style lang="scss" scoped>
.div {
	height: 50px;
	background-color: red;
}
</style>
