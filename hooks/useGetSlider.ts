export function useGetSlider() {
	const { path, params } = useRoute()
	const store = useHomeStore()
	// const { path } = route
	const { idsMap: navClassMap = new Map() } = store.getNavClass || {}
	const getSlider = async () => {
		let query = { type_ids: "" }
		navClassMap.forEach((value, key) => {
			if (params.type_id == key && path != "/") {
				query = { type_ids: value?.ids?.join(",") }
			}
		})

		return await store.dragAsyncData(query)
	}
	return { getSlider }
}
