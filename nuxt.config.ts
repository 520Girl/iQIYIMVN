// https://nuxt.com/docs/api/configuration/nuxt-config
import components from "unplugin-vue-components/vite"
import autoImport from "unplugin-auto-import/vite"
import { VarletImportResolver } from "@varlet/import-resolver"
import { resolve } from "node:path"
import TerserPlugin from "terser-webpack-plugin"
const svgIconsDir = resolve(__dirname, "./assets/svg-icons")

export default defineNuxtConfig({
	devServer: {
		host: "0.0.0.0",
		port: 3000,
	},
	sourcemap: {
		server: false,
		client: false,
	},
	// 生成环境变量
	// runtimeConfig:{
	// 	publicPath: "/nuxt/",
	// },

	//配置跨域服务相关配置
	nitro: {
		// baseURL: "http://localhost",
		devProxy: {
			"/api.php": {
				target: "http://localhost/api.php",
				changeOrigin: true,
				// prependPath: true,
			},
		},
		prerender: {
			//crawlLinks: 设置为 true 之后，预渲染过程会自动爬取链接，这样能确保你的网站中的所有链接都会被访问并渲染。
			crawlLinks: true,
			//，如果预渲染过程中发生错误，构建过程将会失败。也就是说，如果在预渲染某个页面时出现了错误，构建不会完成并会显示错误信息。
			failOnError: true,
			//这个配置确定了同时进行的预渲染请求数。设置为 2 意味着将会同时处理两个请求，以提高预渲染的效率，但并不会造成过大的负载。
			concurrency: 2,
			//这个值以毫秒为单位设置了请求之间的间隔。设置为 1000 表示在发起新请求之间会有1秒的延迟，有助于控制请求速率，避免对服务器造成过大压力。
			interval: 1000,
		},
	},
	app: {
		head: {
			link: [
				// {rel: 'icon', type: 'image/x-icon', href:'@/static/favicon1.ico' },
			],
			meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
		},
		pageTransition: {
			name: "page",
			mode: "out-in",
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
	// imports: {
	// 	dirs: ["store/*.ts"]
	// },
	vite: {
		// esbuild: {
		// 	drop: ["console"], //去掉console
		// },
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
				dirs: ["store/*.ts"],
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
			autoImport({}),
		],
	},
	webpack: {
		extractCSS: true, //提取CSS
		optimization: {
			//进行二次压缩
			minimize: true,
			minimizer: [
				new TerserPlugin({
					test: /\.js(\?.*)?$/i,
					parallel: true,
					extractComments: true,
					terserOptions: {
						output: {
							// 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
							beautify: false,
							// 是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
							comments: false,
						},
						compress: {
							// 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
							// 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
							drop_console: true,
							drop_debugger: true,
							// 是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
							collapse_vars: true,
							// 是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
							reduce_vars: true,
							pure_funcs: ["console.log"], // 移除console
						},
					},
				}),
			],
			splitChunks: {
				chunks: "all", // 针对所有类型的代码进行分割（同步和异步）
				automaticNameDelimiter: ".", // 分割后的文件名中自动包含一个指定的分隔符
				// name: true, // 确保每个chunk都能得到一个具有唯一名称的文件
				minSize: 10000, // 最小被分割的文件大小（字节）
				maxSize: 244000, // 分割文件的最大大小（字节）
				cacheGroups: {
					iview: {
						name: "iview", // 分割出的文件名
						test: /[\\/]iview[\\/]/, // 匹配views中的文件
						chunks: "all", // 针对所有文件
						priority: 1,
						maxSize: 244000,
					},
					vendor: {
						name: "node_vendors", // 分割出的文件名
						test: /[\\/]node_modules[\\/]/, // 匹配node_modules中的文件
						chunks: "all", // 针对所有文件
						priority: -10,
						maxSize: 244000,
					},
					commons: {
						name: "common",
						test: /[\\/]src[\\/]/,
						chunks: "all", // 针对所有文件
						minChunks: 2, //minChunks 选项用于指定一个模块必须被多少个块（chunk）引用，才能被放入公共块（common chunk）中
						maxSize: 244000,
						priority: -5,
						reuseExistingChunk: true,
					},
				},
			},
		},
	},
	modules: [
		"@varlet/nuxt",
		"nuxt-svgo",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@nuxt/image",
	],
	//pinia 持久化插件
	piniaPersistedstate: {
		cookieOptions: {
			maxAge: 1 * 60 * 60 * 1000,
		},
		storage: "localStorage",
	},
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
