export function useGetSlider() {
	const route = useRoute()
	const store = useHomeStore()
	const { path } = route
	const navMap = store.getNavMap
	if (navMap.has(path)) {
	}
}
