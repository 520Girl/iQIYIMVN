import { StoreType } from "@/types/api/index.d"
import type { HomeBaseTypes, HomeBaseList, navTypes, SliderTypes } from "@/types/api/index.d.ts"
import setting from "public/setting.json"
interface idsMap {
	type_id: number
	ids: Array<number>
	type_pid: number
	type_name: string
}
export const useHomeStore = defineStore(StoreType.Home, {
	state: () => ({
		dragStatus: false, //拖拽后请求数据状态
		dragUp: false, //拖拽后请求数据状态
		dragDown: false, //拖拽后请求数据状态
		base: <HomeBaseTypes>{}, //基础配置项
		nav: [
			{ name: "首页", disabled: false, ripple: false, src: "/", id: 100 },
			{ name: "小说", disabled: false, ripple: false, src: "/novel", id: 4 },
			{ name: "电影", disabled: false, ripple: false, src: "/movie", id: 6 },
			{ name: "漫画", disabled: false, ripple: false, src: "/comic", id: 57 },
			{ name: "播放", disabled: false, ripple: false, src: "/play", id: 101 },
		], //导航配置项 更具nav 得到的数据
	}),
	getters: {
		getNav(state) {
			return state.nav
		},
		getHomeSeo(state) {
			let name = {
				name: setting.title,
			}
			return state.base.seo ?? name
		},
		getNavMap(state) {
			const base = state.base
			const { seo, list, from } = base
			const nav = state.nav
			const home = {
				id: 100,
				name: "首页",
				disabled: false,
				ripple: false,
				src: "/",
				title: seo.name || setting.title,
				key: seo.key || setting.key,
				des: seo.des || setting.des,
			}
			let play = {
				name: "播放",
				disabled: false,
				ripple: false,
				src: "/play",
				id: 101,
				title: "播放列表",
				key: "play_list",
				des: "播放列表",
			}
			let mapNav = new Map<string, navTypes>()
			mapNav.set("/", home)
			mapNav.set("/play", play)
			if (base.list) {
				list.forEach((item: HomeBaseList) => {
					let item2 = nav.find(item3 => item3.id === item.type_id)
					if (item2) {
						const { type_id, type_name, type_title, type_key, type_des } = item
						mapNav.set(item2.src, {
							...item2,
							id: type_id,
							name: type_name,
							title: type_title,
							key: type_key,
							des: type_des,
						})
					}
				})
			} else {
				nav.forEach((item: navTypes) => {
					mapNav.set(item.src, item)
				})
			}
			return mapNav
		},
		getNavArr(state): Array<navTypes> {
			let nav = []
			if (state.base.list) {
				let arr = state.nav
				const base = state.base
				const home = {
					id: 100,
					name: "首页",
					disabled: false,
					ripple: false,
					src: "/",
					title: base.seo.name || setting.title,
					key: base.seo.key || setting.key,
					des: base.seo.des || setting.des,
				}
				nav = base.list
					.map((item: HomeBaseList): navTypes | null => {
						let item2 = arr.find(item3 => item3.id === item.type_id)
						if (item2) {
							return {
								...item2,
								id: item.type_id,
								name: item.type_name,
								title: item.type_title,
								key: item.type_key,
								des: item.type_des,
							}
						}
						return null
					})
					.filter((item): item is navTypes => item !== null) // 过滤掉返回为null的项
				nav.unshift(home)
				nav.push({
					name: "播放",
					disabled: false,
					ripple: false,
					src: "/play",
					id: 101,
					title: "播放列表",
					key: "play_list",
					des: "播放列表",
				})
			} else {
				nav = state.nav
			}
			return nav
		},
		getNavClass(state) {
			if (state.base.list) {
				const { list } = state.base
				let newMap = new Map<number, idsMap>()
				list.forEach((item: HomeBaseList) => {
					if (item.type_pid === 0) {
						if (newMap.has(item.type_id)) {
							const value = newMap.get(item.type_id)
							value?.ids.push(item.type_id)
							newMap.set(item.type_id, value!)
						} else {
							newMap.set(item.type_id, {
								type_id: item.type_id,
								ids: [item.type_id],
								type_pid: item.type_pid,
								type_name: item.type_name,
							})
						}
					}
				})
				list.forEach((item: HomeBaseList) => {
					if (item.type_pid !== 0) {
						const value = newMap.get(item.type_pid)
						value?.ids.push(item.type_id)
						newMap.set(item.type_pid, value!)
					}
				})
				//将key 和 路由path 一一对应
				const navMap = this.getNavMap
				let pathMap = new Map<string, idsMap>()

				newMap.forEach((value, key) => {
					for (const [key2, value2] of navMap) {
						if (value.ids.includes(value2.id)) {
							pathMap.set(key2, value)
							break
						}
					}
				})
				pathMap.set("/", { ids: [], type_id: 100, type_pid: 100, type_name: "首页" })
				console.log("pathMap", pathMap)
				return pathMap
			}
		},
		getFrom(state) {
			return state.base.from
		},
	},
	actions: {
		async dragAsyncData(query: SliderTypes) {
			const id = useId()
			return await useAsyncData("dragAsyncDataSlide", () => getSliderApi(query))
		},
		// async get
	},
	persist: {
		key: "a-s-h",
	},
})
