export function useGetSlider() {
	const route = useRoute()
	const store = useHomeStore()
	const { path } = route
	const navClassMap = store.getNavClass || new Map()
	const getSlider = async () => {
		let query = { type_ids: "" }
		if (navClassMap.has(path)) {
			query = { type_ids: navClassMap.get(path)?.ids?.join(",") }
		}
		return await store.dragAsyncData(query)
	}
	return { getSlider }
}
