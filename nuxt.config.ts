// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			link: [
				// {rel: 'icon', type: 'image/x-icon', href:'@/static/favicon1.ico' },
			],
		},
	},
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
})
