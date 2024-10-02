export function useThrottle<T extends Function>(this: any, fn: Function, wait: number) {
	let timeout: any
	return (...args: any[]) => {
		if (!timeout) {
			timeout = setTimeout(() => {
				fn.apply(this, args)
				timeout = null
			}, wait)
		}
	}
}
