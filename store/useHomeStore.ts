import { StoreType } from "@/types/api/index.d"
import type { HomeBaseTypes, HomeBaseList, navTypes, SliderTypes } from "@/types/api/index.d.ts"
import setting from "public/setting.json"
import variable from "~/variable"

interface idsMap {
	type_id: number
	ids: Array<number>
	type_pid: number
	type_name: string
	class_name: Array<{ name: string; id: number }>
}
export const useHomeStore = defineStore(StoreType.Home, {
	state: () => ({
		dragStatus: false, //拖拽后请求数据状态
		dragUp: false, //拖拽后请求数据状态
		dragDown: false, //拖拽后请求数据状态
		base: <HomeBaseTypes>{}, //基础配置项
		nav: [
			{
				name: "首页",
				disabled: false,
				ripple: false,
				src: "/",
				id: 100,
				title: setting.title,
				key: setting.key,
				des: setting.des,
			},
			{ name: "小说", disabled: false, ripple: false, src: variable.router.novel, id: 101 }, //4
			{ name: "电影", disabled: false, ripple: false, src: variable.router.movie, id: 20 },
			{ name: "漫画", disabled: false, ripple: false, src: variable.router.comic, id: 102 }, //57
			// {
			// 	name: "播放",
			// 	disabled: false,
			// 	ripple: false,
			// 	src: "/play",
			// 	id: 101,
			// 	title: "播放列表",
			// 	key: "play_list",
			// 	des: "播放列表",
			// },
		], //导航配置项 更具nav 得到的数据
		searchHits: <string[]>[], //历史搜索
		loadingShow: true, //loading 显示状态
		headerNavDefult: <navTypes[]>[], //导航默认的配置项
		currentNav: <navTypes[]>[], //当前导航配置项
		otherNav: <navTypes[]>[], //其他导航配置项
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

		//通过type_id 分配路由,默认配置项,当前配置项
		getNavArr(state): Array<navTypes> {
			let nav = []
			let arr = state.nav
			if (state.base.list) {
				const base = state.base
				nav = base.list
					.map((item: HomeBaseList): navTypes | null => {
						let item2 = arr.find(item3 => item3.id === item.type_id)
						let obj: navTypes | null = {
							id: item.type_id,
							name: item.type_name,
							title: item.type_title,
							key: item.type_key,
							des: item.type_des,
							class: item.type_extend.class,
						}
						if (item2) {
							//匹配到指定路由
							obj = {
								...item2,
								id: item.type_id,
								name: item.type_name,
								title: item.type_title,
								key: item.type_key,
								des: item.type_des,
								class: item.type_extend.class,
							}
							if (item.type_id === 20) {
								//!当匹配到电影时需要进行处理一下
								obj.src = `${variable.router.movie}/${item.type_id}`
							}
						} else {
							//未匹配到指定路由 使用type_pid=0 进行分类，进行确定页面路由问题
							// console.log("未匹配到指定路由", item)
							switch (item.type_pid) {
								case 20: //电影
								case 21: //电视剧
								case 22: //综艺
								case 23: //动漫
									obj.src = `${variable.router.movie}/${item.type_id}`
									break
								case 0: // 大分类
									obj.src = `${variable.router.movie}/${item.type_id}?pid=${item.type_pid}`
									break
								default:
									obj.src = `${variable.router.devtool}/${item.type_id}`
							}
							obj = {
								...obj,
							}
						}
						return obj
					})
					.filter((item): item is navTypes => item !== null) // 过滤掉返回为null的项
				nav.unshift(arr[0])
				nav.push(arr[1])
				nav.push(arr[3])
				// nav.push(arr[4])
			} else {
				nav = arr
			}
			return nav
		},
		//（根据type_pid 分类 获取大分类小分类ids集合 & {name:string,id:number} 小分类name 和 id） idsMap & (和定义的nav路径进行匹配进行分类用于slider)以及路径分类 pathMap
		getNavClass(state) {
			if (state.base.list) {
				const { base, nav } = state
				let newMap = new Map<number, idsMap>()
				base.list.forEach((item: HomeBaseList) => {
					if (item.type_pid === 0) {
						if (newMap.has(item.type_id)) {
							const value = newMap.get(item.type_id)
							value?.ids.push(item.type_id)
							value?.class_name.push({ name: item.type_name, id: item.type_id })
							newMap.set(item.type_id, value!)
						} else {
							newMap.set(item.type_id, {
								type_id: item.type_id,
								ids: [item.type_id],
								type_pid: item.type_pid,
								type_name: item.type_name,
								class_name: [{ name: "全部", id: item.type_id }],
							})
						}
					}
				})
				base.list.forEach((item: HomeBaseList) => {
					if (item.type_pid !== 0) {
						const value = newMap.get(item.type_pid)
						value?.ids.push(item.type_id)
						value?.class_name.push({ name: item.type_name, id: item.type_id })
						newMap.set(item.type_pid, value!)
					}
				})
				//将key 和 路由path 一一对应
				let pathMap = new Map<string, idsMap>()
				console.log("newMap", newMap)
				newMap.forEach((value, key) => {
					for (const value2 of nav) {
						if (value.ids.includes(value2.id)) {
							pathMap.set(value2.src, value)
							break
						}
					}
				})
				pathMap.set("/", {
					ids: [],
					type_id: 100,
					type_pid: 100,
					type_name: "首页",
					class_name: [],
				})
				console.log("pathMap=========", pathMap, newMap)
				return { pathMap, idsMap: newMap }
			}
		},
		getFrom(state) {
			return state.base.from
		},
	},
	actions: {
		//初始化一下当前配置项 和默认配置项 和 其他配置
		setInitNav(list: HomeBaseList[]) {
			if (list) {
				//默认配置项
				this.headerNavDefult = list
					.map(item => {
						if (item.type_pid === 0) {
							return {
								id: item.type_id,
								name: item.type_name,
								src: `${variable.router.movie}/${item.type_id}?pid=${item.type_pid}`,
							}
						}
						return null // 返回 null 或者一个默认值
					})
					.filter(item => item !== null) // 过滤掉 null
				this.headerNavDefult.unshift(this.nav[0])
				this.headerNavDefult.push(this.nav[1])
				this.headerNavDefult.push(this.nav[3])
				//当前配置项
				this.currentNav = [...this.headerNavDefult]
				//其他配置项
				const { idsMap = new Map() } = this.getNavClass || {}
				console.log(idsMap, "======================")
				idsMap.forEach((value: idsMap, key: string) => {
					if (!this.otherNav.find(item => item.id === value.type_id)) {
						let obj = {
							id: value.type_id,
							name: value.type_name,
							class: value.class_name.slice(1),
						}
						obj.class = obj.class.map(item2 => ({
							...item2,
							src: `${variable.router.movie}/${item2.id}`,
						}))
						this.otherNav.push(obj)
					}

					// console.log("value", value)
					// console.log("key", key)
				})
				// console.log("this.otherNav", this.otherNav, "this.headerNavDefult", this.headerNavDefult)
			}
		},
		async dragAsyncData(query: SliderTypes) {
			const id = useId()
			return await useAsyncData("dragAsyncDataSlide", () => getSliderApi(query))
		},
		async getAsyncBaseData() {
			const { data, pending, error, refresh } = await useAsyncData("dragAsyncDataSeo", () =>
				getHomeBase()
			)
			const { list, from, seo } = data!.value as any
			console.log("======================")
			this.setInitNav(list)
			this.base = { list, from, seo }
		},
	},
	persist: {
		key: "a-s-h",
	},
})
