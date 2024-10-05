export function useGetSlider() {
	const route = useRoute()
	const store = useHomeStore()
	const { path } = route
	const navMap = store.getNavMap
	const navClassMap = store.getNavClass
	const getSlider = () => {
		if (navMap.has(path)) {
			// const data = store.dragAsyncData(navMap.get(path))
		}
	}
	return { getSlider }
}
