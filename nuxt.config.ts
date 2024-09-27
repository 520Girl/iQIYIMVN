// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	app: {
		head: {
			link: [
				// {rel: 'icon', type: 'image/x-icon', href:'@/static/favicon1.ico' },
			],
			meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
		},
	},
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
			"postcss-px-to-viewport": {
				// 要转化的单位
				unitToConvert: "px",
				// UI设计稿的大小
				viewportWidth: 375,
				// 转换后的精度
				unitPrecision: 2,
				// 转换后的单位
				viewportUnit: "vw",
				// 字体转换后的单位
				fontViewportUnit: "vw",
				// 能转换的属性，*表示所有属性，!border表示border不转
				propList: ["*"],
				// 指定不转换为视窗单位的类名，
				selectorBlackList: ["ignore-"],
				// 最小转换的值，小于等于1不转
				minPixelValue: 1,
				// 是否在媒体查询的css代码中也进行转换，默认false
				mediaQuery: false,
				// 是否转换后直接更换属性值
				replace: true,
				// 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
				exclude: [],
				// 包含那些文件或者特定文件
				include: [],
				// 是否处理横屏情况
				landscape: false,
			},
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "./assets/css/bem.scss";`,
				},
			},
		},
	},
})
