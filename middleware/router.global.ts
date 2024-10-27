export default defineNuxtRouteMiddleware((to, from) => {
	const home = useHomeStore()
	home.loadingShow = true
	setTimeout(() => {
		home.loadingShow = false
	}, 1000)
})
