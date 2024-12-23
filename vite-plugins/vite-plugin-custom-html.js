// vite-plugins/vite-plugin-custom-html.js
import { createFilter } from "@rollup/pluginutils"
// @filename: rollup-plugin-my-example.js
// ---cut-start---
/** @returns {import('rollup').Plugin} */
// ---cut-end---
export default function customHTMLPlugin() {
	console.log("customHTMLPlugin")
	const filter = createFilter(["index.html"], {})

	return {
		name: "custom-html",
		transformIndexHtml: {
			enforce: "post",
		},
		async transformIndexHtml(html, id) {
			console.log(html, id, "-----------------88------------------")
			// if (!filter(id)) return html;

			// // 在 <body> 标签上添加 data-editable="true" 属性
			// return html.replace('<body>', `<body data-editable="true">`);
		},
	}
}
