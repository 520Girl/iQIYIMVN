<template>
	<div class="amx-chat">
		<div class="amx-chat-header">
			<span @click="active = 0" :class="['amx-chat-header__item', active === 0 && 'active']"
				>最新</span
			>
			<span @click="active = 1" :class="['amx-chat-header__item', active === 1 && 'active']"
				>精选图文</span
			>
			<span @click="active = 2" :class="['amx-chat-header__item', active === 2 && 'active']"
				>剧情分析</span
			>
		</div>
		<div class="amx-chat-body">
			<div class="amx-chat-item" v-show="active === 0">
				<div class="amx-chat-item__list" v-for="(item, index) in 5" :key="index">
					<div class="amx-chat-item__avatar">
						<var-avatar src="https://varletjs.org/cat.jpg" size="small" />
					</div>
					<div class="amx-chat-item__content">
						<div class="amx-chat-item__header">
							<h5 class="content-title">喜欢浅睡的猫猫</h5>
							<article class="content-text">
								这里是内容这里是内容这里是内容这 里是内容这里是内容这里是内容这里是内容这里是内容这
								里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
								这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是
								内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容
								这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容这里是
								内容这里是内容这里是内容这里是内容这里是内容这里是内容
							</article>
						</div>
						<div class="amx-chat-item__footer">
							<div class="footer-time">
								<span class="">12.39</span>
								<span class="address">北京</span>
								<span class="reply">回复</span>
							</div>
							<div class="footer-like">
								<SvgIcon name="svgo-upvote" width="14px" />
								<var-icon name="thumb-down" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
let active = ref(0)
onMounted(() => {
	console.log("mounted")
})
</script>
<style scoped lang="scss">
@include b(chat) {
	padding: 10px 20px;
	@apply w-full box-border;

	@include b(chat-header) {
		@apply flex justify-start items-center;

		@include e(item) {
			font-size: 14px;
			@apply inline-block cursor-pointer shadow-xl;
			padding: 4px 12px;
			border-radius: 5px;
			margin-right: 10px;
			background-color: var(--amx-play-button-bc);

			&.active {
				color: var(--amx-theme-color);
				background-color: #e3fae8;
			}
		}
	}

	@include b(chat-body) {
	}

	@include b(chat-item) {
		@apply flex flex-col w-full box-border;

		@include e(list) {
			padding-top: 10px;
			@apply w-full flex flex-wrap box-border;
			flex: 1;
		}

		@include e(avatar) {
			width: 35px;
			@apply flex-shrink-0;
			margin-right: 10px;
		}

		@include e(content) {
			@apply flex-1 w-full;
		}

		@include e(header) {
		}

		@include e(footer) {
			margin-top: 5px;
			@apply flex justify-between items-center;
		}
	}
}

.content-title {
	font-size: 14px;
	color: #bf9e6c;
}

.content-text {
	@apply text-ellipsis w-full line-clamp-4;
	max-height: 100px;
	font-size: 14px;
}

.footer-time {
	span {
		font-size: 12px;
		padding-right: 5px;
		@apply inline-block;
		color: #cdcdcd;
	}
	.reply {
		font-size: 14px;
		color: #000;
		margin-left: 10px;
	}
}

.footer-like {
	font-size: 14px;
	@apply flex items-center;
	svg {
		width: 18px;
		height: 18px;
	}
	i {
		margin-left: 10px;
		color: #cdcdcd;
	}
}
</style>
