import { get, post } from "./fetchApi"
import type {
	HomeBaseTypes,
	SliderTypes,
	SliderTypesData,
	ListTypesParams,
	ListTypesData,
} from "@/types/api"

enum API {
	GET_HOME_BASE = `/api.php/Aqiyim/homeBase`,
	GET_SLIDER = "/api.php/Aqiyim/slide",
	GET_VOD_LIST = "/api.php/Aqiyim/vod",
}
// interface HomeBase extends HomeBaseTypes {

// }
export async function getHomeBase() {
	const res = await get<HomeBaseTypes>(API.GET_HOME_BASE)
	console.log("res", res)
	return res
}

export async function getSliderApi(query: SliderTypes) {
	const res = await get<SliderTypesData>(API.GET_SLIDER, query)
	return res
}

export async function getVodListApi(query: ListTypesParams) {
	console.log("query", query)
	const res = await get<ListTypesData>(API.GET_VOD_LIST, query)
	return res
}
