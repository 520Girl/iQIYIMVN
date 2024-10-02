<template>
	<div ref="artRef"></div>
</template>

<script lang="ts" setup>
import Artplayer from "artplayer"
import type { Thumbnails } from "artplayer/types/option.d.ts"

const props = withDefaults(defineProps<{ option: Thumbnails }>(), {
	option: () => ({
		url: "",
		container: "",
	}),
})
let instance: Artplayer | null = null
const artRef = ref<HTMLDivElement | string>("")

const emit = defineEmits(["get-instance"])

//将 播放实例 暴露给父组件
const fullscreenVidew = () => {
	if (instance) {
		// instance.pip   = true
		instance.fullscreen = true
		// instance.fullscreenWeb  = true
		console.log("ffffffffffffffffffff", instance.fullscreen)
	}
}
defineExpose({
	fullscreen: fullscreenVidew,
})
onMounted(() => {
	instance = new Artplayer({
		...props.option,
		autoMini: true,
		flip: true,
		setting: true,
		playbackRate: true,
		aspectRatio: true,
		screenshot: true,
		hotkey: true,
		pip: true,
		mutex: true,
		fullscreen: true,
		fullscreenWeb: true,
		// useSSR: true,
		//移动端配置
		lock: true,
		fastForward: true,
		autoOrientation: true,
		container: artRef.value,
		icons: {
			// loading: '<img src="/public/image/player.png">',
			state: '<img src="/image/player.png">',
			play: '<img src="/image/player-play.png">',
			volume: '<img src="/image/volume.png">',
		},
	})
	emit("get-instance", instance)
})

onUnmounted(() => {
	if (instance && instance.isDestroy) {
		instance.playdestroy(false)
	}
})
</script>
