import type { ListTypesParams, ListTypesData } from "@/types/api/index.d.ts"
import { UseAsyncDataKeys } from "@/types/api/index.d"

export function useGetList() {
	const { path, params: type_param, query: type_query } = toRefs(useRoute())
	console.log("path--------", path)
	const store = useHomeStore()
	const { pathMap: navMapClass = new Map() } = store.getNavClass || {}
	let page: number | string = 1
	const getList = async (params: ListTypesParams) => {
		let query = { pg: page, ac: "list", ...params }
		console.log("========================", type_param, type_query)
		if (type_param) {
			query.t_1 = type_param.value?.type_id as string
		} else if (path.value === "/") {
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
