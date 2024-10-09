<template>
	<div style="height: 100vh; width: 100%" class="box-border overflow-hidden">
		<div class="header">
			<div class="logo">
				<p class="transition-color">
					<span></span>
				</p>
				<p class="transition-color">
					<span></span>
				</p>
				<p class="transition-color">
					<span></span>
				</p>
			</div>
			<div class="nav">
				<p class="transition-color"></p>
			</div>
		</div>
		<div class="swiper">
			<div class="swiper-wrapper transition-color"></div>
		</div>
		<div class="content">
			<div v-for="i in 6" :key="i" class="item">
				<article>
					<span class="img transition-color"></span>
					<div class="info">
						<span class="transition-color"></span>
						<span class="transition-color"></span>
						<span class="transition-color"></span>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>
<style scoped lang="scss">
.header {
	height: 76px;
	background-color: antiquewhite;

	.logo {
		@apply flex;
		height: 36px;

		p {
			margin: 5px;
			border-radius: 15px;

			span {
				background-color: red;
				@apply inline-block w-full;
				border-radius: 8px;
			}

			&:nth-child(1) {
				width: 78%;
			}

			&:nth-child(2),
			&:nth-child(3) {
				height: 24px;
				width: 24px;

				span {
					border-radius: 15px;
				}
			}
		}
	}

	.nav {
		height: 40px;
		padding-left: 25px;
		width: 100%;
		p {
			width: 100%;
			overflow: hidden;
			height: 100%;
			border-radius: 8px;
		}
	}
}

.swiper {
	height: 196px;
	padding: 5px;

	.swiper-wrapper {
		border-radius: 8px;
		@apply w-full h-full box-border;
	}
}

.content {
	height: calc(100vh - 76px - 196px);
	// background-color: aquamarine;
	@apply w-full box-border;
	padding: 10px 10px 0px 10px;

	.item {
		@apply inline-block w-1/2 box-border;

		padding: 0px 5px 5px 5px;

		article {
			height: 162px;
			// background-color: beige;
			border-radius: 8px;
		}

		.img {
			@apply block w-full;
			height: 90px;
			// background-color: rgb(201, 123, 22);
			border-radius: 8px;
		}

		.info {
			span {
				@apply block text-center;
				margin-top: 2px;
				height: 21px;
				border-radius: 8px;

				// background-color: rgb(226, 114, 114);
				&:nth-child(2) {
					width: 80%;
					height: 18px;
				}

				&:nth-child(3) {
					width: 50%;
				}
			}
		}
	}
}

.transition-color {
	transition: background-color 0.25s;
	background-color: var(--skeleton-card-background-color);
	position: relative;

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		animation: var-skeleton-animation 1s infinite;
		background: var(--skeleton-animation-background);
		transition: 0.25s background-color;
	}
}
</style>
