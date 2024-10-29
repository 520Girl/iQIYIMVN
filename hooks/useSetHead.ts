//!废弃
const useSetHead = () => {
	const { path, params } = useRoute()
	const store = useHomeStore()
	const navMap = store.getNavArr
	console.log("8888888888888888888888888888", navMap)
	const setHeader = () => {
		const currentNav = navMap.find(item => item.id === Number(params.type_id))
		console.log("9", currentNav)
		if (currentNav) {
			useHead({
				title: currentNav?.name,
				meta: [
					{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
					{ name: "keywords", content: currentNav?.key },
					{ name: "description", content: currentNav?.desc },
					{ name: "author", content: store.getHomeSeo.name },
				],
			}) // Set page title
		} else {
			showError({
				statusCode: 404,
				message: "无效链接",
			})
		}
	}
	return { setHeader }
}

export default useSetHead
