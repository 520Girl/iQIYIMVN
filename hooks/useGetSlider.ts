export function useGetSlider() {
	const route = useRoute()
	const store = useHomeStore()
	const { path } = route
	const { pathMap: navClassMap = new Map() } = store.getNavClass || {}
	const getSlider = async () => {
		let query = { type_ids: "" }
		navClassMap.forEach((value, key) => {
			if (path.includes(key) && key != "/") {
				query = { type_ids: value?.ids?.join(",") }
			}
		})

		return await store.dragAsyncData(query)
	}
	return { getSlider }
}
