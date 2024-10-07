import type { ListTypesParams, ListTypesData } from "@/types/api/index.d.ts"
import { UseAsyncDataKeys } from "@/types/api/index.d"

export function useGetList() {
	const { path } = useRoute()
	const store = useHomeStore()
	const navMapClass = store.getNavClass
	let page: number | string = 1
	const getList = async (params: ListTypesParams) => {
		let query = { pg: page, ac: "list", ...params }
		if (navMapClass?.has(path) && path !== "/") {
			query.t_1 = navMapClass.get(path)?.type_id
		} else if (path === "/") {
			query.t_1 = ""
		}
		const { data } = await useAsyncData(UseAsyncDataKeys.GET_VOD_LIST, () => getVodListApi(query))
		if (params.pg) {
			page = params.pg
		}
		page = +page + 1
		return data
	}
	return {
		getList,
	}
}
