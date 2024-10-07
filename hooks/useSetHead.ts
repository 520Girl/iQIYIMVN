const useSetHead = () => {
	const route = useRoute()
	const { path } = route
	const store = useHomeStore()
	const navMap = store.getNavMap
	const setHeader = () => {
		if (navMap.has(path)) {
			const header = navMap.get(path)
			useHead({
				title: header?.name,
				meta: [
					{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
					{ name: "keywords", content: header?.key },
					{ name: "description", content: header?.desc },
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
