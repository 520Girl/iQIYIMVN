import { get, post } from "./fetchApi"
import type { HomeBaseTypes } from "@/types/api"

enum API {
	GET_HOME_BASE = `/api.php/Aqiyim/homeBase`,
	GET_SLIDER = "/api.php/Aqiyim/slider",
}
// interface HomeBase extends HomeBaseTypes {

// }
export async function getHomeBase() {
	const res = await get<HomeBaseTypes>(API.GET_HOME_BASE)
	console.log("res", res)
	return res
}

export async function getSlider() {
	const res = await get<HomeBaseTypes>(API.GET_SLIDER)
	return res
}
