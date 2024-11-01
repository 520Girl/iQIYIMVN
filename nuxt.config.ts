// https://nuxt.com/docs/api/configuration/nuxt-config
import components from "unplugin-vue-components/vite"
import autoImport from "unplugin-auto-import/vite"
import { VarletImportResolver } from "@varlet/import-resolver"
import { resolve } from "node:path"
import TerserPlugin from "terser-webpack-plugin"
import customHTMLPlugin from "./vite-plugins/vite-plugin-custom-html"
const svgIconsDir = resolve(__dirname, "./assets/svg-icons")
import fs from "fs-extra"
import path from "path"
// import { defineNuxtConfig, createResolver } from '@nuxt/kit';
// const { resolve } = createResolver(import.meta.url);
export default defineNuxtConfig({
	ssr: true,
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
				target: "http://localhost:3002/api.php",
				changeOrigin: true,
				// prependPath: true,
			},
		},
		prerender: {
			routes: ["/"],
			//crawlLinks: 设置为 true 之后，预渲染过程会自动爬取链接，这样能确保你的网站中的所有链接都会被访问并渲染。
			// crawlLinks: true,
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
			// script
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
	// imports: {
	// 	dirs: ["store/*.ts"]
	// },
	// debug: true,
	experimental: {},
	features: {
		inlineStyles: false, // 禁用内联样式
	},
	vite: {
		// esbuild: {
		// 	drop: ["console"], //去掉console
		// },
		build: {
			rollupOptions: {
				output: {
					// inlineDynamicImports: true, // 内联动态导入
					//! 最关键的拆分出变量的配置/
					manualChunks: id => {
						if (id.includes("/variable/index.js")) {
							return "globals"
						}
					},
					// manualChunks: (id) => {
					// 	console.log(';id', id)
					// 	if (/pages\/.*\.vue$/.test(id)) {
					// 		return 'app';
					// 	}
					// 	// 检查是否是 globals.js 文件
					// 	else if (id.includes('/globals.js')) {
					// 		return 'app'; // 打包到页面 chunk 中
					// 	}
					// }
				},
				// output: {
				// 	// 强制内联所有 chunk
				// 	entryFileNames: 'inline.[hash].js',
				// 	chunkFileNames: 'inline.[hash].js',
				// 	assetFileNames: 'inline.[hash].[ext]'
				// }
			},
			// 或者指定为 'terser' 并且配置 terserOptions
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true, // 根据需要移除 console.log 等
					drop_debugger: true,
				},
				mangle: false, // 不混淆变量名
				format: {
					comments: "all", // 不移除注释
					beautify: false, // 格式化输出
					inline_script: true, // 内联 script 标签
					indent_start: 4,
					keep_numbers: true,
					keep_quoted_props: true,
				},
			},
		},
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
			customHTMLPlugin(),
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
		"@nuxtjs/color-mode",
	],
	// plugins: ['~/plugins/dark-mode'],
	//主题色
	colorMode: {
		preference: "system", // default value of $colorMode.preference
		fallback: "light", // fallback value if not system preference found
		hid: "nuxt-color-mode-script",
		globalName: "__NUXT_COLOR_MODE__",
		componentName: "ColorScheme",
		classPrefix: "",
		classSuffix: "",
		storage: "localStorage", // or 'sessionStorage' or 'cookie'
		storageKey: "nuxt-color-mode",
	},
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
	build: {
		transpile: [/^vue/], // 确保 Vue 被转译
	},
	hooks: {
		// 'build:before': () => {
		// 	// 生成全局变量 JSON 文件
		// 	// const resolver = resolve('./globals.js');
		// 	const globalsModule = require('./globals.js');
		// 	const globalVariables = globalsModule.globalVariables;
		// 	console.log(JSON.stringify(globalsModule), 8888, globalVariables)
		// 	// 将全局变量保存到 JSON 文件中
		// 	fs.writeFile(resolve('./global-vars.json'), JSON.stringify(globalsModule), (err) => {
		// 		if (err) throw err;
		// 		console.log('Global variables saved to JSON file.');
		// 	});
		// },
		// 在构建结束后处理输出
		// 'postBuild': async () => {
		// 	const fs = require('fs');
		// 	const path = require('path');

		// 	// 获取输出目录
		// 	const distDir = path.resolve(__dirname, '.output/public');

		// 	// 读取 index.html 并插入内联的 js
		// 	const indexPath = path.join(distDir, 'index.html');
		// 	let html = fs.readFileSync(indexPath, 'utf-8');

		// 	// 假设有一个 <script> 标签用于引用外部 js 文件
		// 	const scriptTag = '<script type="module" src="/_nuxt/entry.js"></script>';

		// 	// 读取对应的 js 文件内容
		// 	const jsFilePath = path.join(distDir, '_nuxt', 'entry.js');
		// 	if (fs.existsSync(jsFilePath)) {
		// 		const inlineScript = fs.readFileSync(jsFilePath, 'utf-8');

		// 		// 替换 <script> 标签为内联脚本
		// 		html = html.replace(scriptTag, `<script type="module">${inlineScript}</script>`);

		// 		// 写回修改后的 HTML 文件
		// 		fs.writeFileSync(indexPath, html, 'utf-8');
		// 	}
		// }
		async "build:done"() {
			const distPath = path.resolve(__dirname, "dist/")
			const htmlFiles = await fs.readdir(distPath)
			const htmlFilesFiltered = htmlFiles.filter(file => file.endsWith("index.html"))
			console.log("htmlFilesFiltered", htmlFilesFiltered)
			for (const file of htmlFilesFiltered) {
				const filePath = path.join(distPath, file)
				let html = await fs.readFile(filePath, "utf8")

				// 这里你可以对 html 进行任何你需要的操作，例如恢复格式化
				// 示例：简单地将换行符和缩进添加回 HTML 文件
				html = html.replace(/<([^\s>]+)>/g, "\n<$1>").replace(/</g, "\n<")

				await fs.writeFile(filePath, html, "utf8")
			}
		},
	},
})
