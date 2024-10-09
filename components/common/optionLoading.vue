<template>
	<div class="amx-loading-wrapper" @dragstart.prevent>
		<div class="amx-loading-content"></div>
		<div class="amx-loading-main">
			<div class="loading">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"

const props = defineProps({
	zIndex: {
		type: Number,
		default: 2,
	},
	top: {
		type: String,
		default: "20%",
	},
	color: {
		type: String,
		default: "#3fca80",
	},
})
onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@import "~/assets/css/mixin.scss";

@include b(loading-wrapper) {
	@include b-Cover;
	@apply m-auto text-center;
	@apply pointer-events-none;
	-webkit-user-drag: none; /* 对于 Webkit 浏览器 */
	user-drag: none; /* 对于 Firefox */
}

@include b(loading-content) {
	opacity: 0.4;
	background-color: #87978e;
	@include b-Cover;
	z-index: v-bind(zIndex);
}
@include b(loading-main) {
	margin: auto;
	position: absolute;
	top: 20%;
	right: 50%;
	transform: translateX(50%);
}

.loading,
.loading > div {
	position: relative;
	box-sizing: border-box;
}

.loading {
	display: block;
	font-size: 0;
	color: v-bind(color);
}

.loading.la-dark {
	color: v-bind(color);
	opacity: 0.8;
}

.loading > div {
	display: inline-block;
	float: none;
	background-color: currentColor;
	border: 0 solid currentColor;
}

.loading {
	width: 42px;
	height: 32px;
}

.loading > div:nth-child(1) {
	position: absolute;
	bottom: 32%;
	left: 18%;
	width: 14px;
	height: 14px;
	border-radius: 100%;
	transform-origin: center bottom;
	animation: ball-climbing-dot-jump 0.6s ease-in-out infinite;
}

.loading > div:not(:nth-child(1)) {
	position: absolute;
	top: 0;
	right: 0;
	width: 14px;
	height: 2px;
	border-radius: 0;
	transform: translate(60%, 0);
	animation: ball-climbing-dot-steps 1.8s linear infinite;
}

.loading > div:not(:nth-child(1)):nth-child(2) {
	animation-delay: 0ms;
}

.loading > div:not(:nth-child(1)):nth-child(3) {
	animation-delay: -600ms;
}

.loading > div:not(:nth-child(1)):nth-child(4) {
	animation-delay: -1200ms;
}

@keyframes ball-climbing-dot-jump {
	0% {
		transform: scale(1, 0.7);
	}

	20% {
		transform: scale(0.7, 1.2);
	}

	40% {
		transform: scale(1, 1);
	}

	50% {
		bottom: 125%;
	}

	46% {
		transform: scale(1, 1);
	}

	80% {
		transform: scale(0.7, 1.2);
	}

	90% {
		transform: scale(0.7, 1.2);
	}

	100% {
		transform: scale(1, 0.7);
	}
}

@keyframes ball-climbing-dot-steps {
	0% {
		top: 0;
		right: 0;
		opacity: 0;
	}

	50% {
		opacity: 1;
	}

	100% {
		top: 100%;
		right: 100%;
		opacity: 0;
	}
}
</style>
