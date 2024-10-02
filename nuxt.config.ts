// https://nuxt.com/docs/api/configuration/nuxt-config
import components from "unplugin-vue-components/vite"
import autoImport from "unplugin-auto-import/vite"
import { VarletImportResolver } from "@varlet/import-resolver"
import { resolve } from "node:path"

const svgIconsDir = resolve(__dirname, "./assets/svg-icons")

export default defineNuxtConfig({
	devServer: {
		host: "0.0.0.0",
		port: 3000,
	},
	app: {
		head: {
			link: [
				// {rel: 'icon', type: 'image/x-icon', href:'@/static/favicon1.ico' },
			],
			meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
		},
	},
	typescript: {
		typeCheck: true,
	},
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css", "~/assets/css/variable.css"],
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
					api: "modern-compiler", // 或者使用 'modern'
					silenceDeprecations: ["legacy-js-api"], // 可选，暂时抑制警告
				},
			},
		},
		plugins: [
			components({
				resolvers: [VarletImportResolver()],
			}),
			autoImport({
				resolvers: [VarletImportResolver({ autoImport: true })],
			}),
			autoImport({
				dts: "types/auto-imports.d.ts", // 这里是生成的global函数文件
				imports: ["vue", "vue-router"], // 需要自动导入的插件
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
					/\.md$/, // .md
				],
				// 解决eslint报错问题
				eslintrc: {
					// 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
					enabled: false,
					filepath: "./.eslintrc-auto-import.json", // 生成的文件路径
					globalsPropValue: true,
				},
			}),
		],
	},

	modules: ["@varlet/nuxt", "nuxt-svgo"],
	svgo: {
		//svg 图片导入
		autoImportPath: "./assets/svg-icons/",
	},
	varlet: {
		// modulePath: '',
		// exclude: [],
		// icon: { //这个导入会导致我的是配置var-icon使用的，会转化为i 标签，失色
		// 	dir: svgIconsDir,
		// 	generatedFilename: "./assets/virtual.icons.css",
		// },
	},
})
