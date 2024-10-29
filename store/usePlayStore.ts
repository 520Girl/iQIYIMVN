import type { ListTypesParams, ListItemApi } from "@/types/api"
import { StoreType, UseAsyncDataKeys } from "@/types/api/index.d"

export const usePlayStore = defineStore(StoreType.PlayStore, {
	state: () => ({
		base: <ListItemApi>{},
		currentVideo: <{ name: string; url: string; index: number; from: string }>{},
	}),
	getters: {
		getPlayData(state) {
			const { list } = state.base
			const base = list[0]
			console.log(base)
			const handleData = {
				type_name: base.type_name, //类型名称
				vod_name: base.vod_name, //视频名称
				type_id: base.type_id, //类型ID
				vod_id: base.vod_id, //视频ID
				vod_play_from: base.vod_play_from, //播放来源
				from: Array<string>(), //来源
				vod_play_url: base.vod_play_url, //播放地址
				url: new Map(), //播放地址
				defaultPlayName: "", //默认播放名称
				defaultUrl: "", //默认播放地址 为最新的
				vod_down_url: base.vod_down_url, //下载地址
				type_id_1: base.type_id_1, //一级类型ID
				play: base.vod_play_level, //是否可以播放
				imgUrl: base.vod_pic, //封面图
				desc: base.vod_blurb, //简介
				content: base.vod_content
					.replace(/<[^>]+>/g, "")
					.replace(/&nbsp;/g, "")
					.replace(/\n/g, ""), //内容
				tag: base.vod_tag.split(","), //标签
				class: base.vod_class, //分类
				actor: base.vod_actor.split(","), //演员
				director: base.vod_director, //导演
				remarks: base.vod_remarks, //备注
				area: base.vod_area, //地区
				language: base.vod_lang, //语言
				releaseTime: base.vod_year, //上映时间
				crawlTime: base.vod_time, //采集时间
				addTime: base.vod_time_add, //添加时间
				vod_up: base.vod_up, //顶数
				vod_down: base.vod_down, // 踩数
				vod_score: base.vod_score, //平均评分
				vod_score_all: base.vod_score_all, //总评分
				vod_score_num: base.vod_score_num, //评分人数
				vod_hits: base.vod_hits, //总点击量
				vod_hits_day: base.vod_hits_day, //日点击量
				vod_hits_week: base.vod_hits_week, //周点击量
				vod_hits_month: base.vod_hits_month, //月点击量
				vod_isend: base.vod_isend, //是否完结
			}
			if (handleData.play) {
				if (handleData.vod_play_from) {
					const fromArr = handleData.vod_play_from.split("$$$")
					handleData.from = fromArr
					if (handleData.vod_play_url && fromArr.length > 0) {
						let urlMap = new Map()
						//分服务器
						let urlArr = handleData.vod_play_url.split("$$$")
						fromArr.forEach((item: string, index: number) => {
							let episodeAllArr: Array<{ name: string; url: string }> = []
							if (index <= urlArr.length - 1) {
								let episodeArr = urlArr[index].split("#")
								episodeArr.forEach((episodeText: string, episodeIndex: number) => {
									let arr = episodeText.split("$")
									let obj = { name: arr[0], url: arr[1] }
									episodeAllArr.push(obj)
								})
							}
							urlMap.set(item, episodeAllArr)
						})
						handleData.url = urlMap
					}
				}
			}

			//默认播放地址
			if (handleData.from.length > 0) {
				const defaultFrom = handleData.from[0]
				const defaultUrlArr = handleData.url.get(defaultFrom)
				if (defaultUrlArr && defaultUrlArr.length > 0) {
					const defaultUrlObj = defaultUrlArr[0]
					handleData.defaultUrl = defaultUrlObj.url
					handleData.defaultPlayName = defaultUrlObj.name
				}
			}
			return handleData
		},
	},
	actions: {
		async getPlayVodDetail(query: ListTypesParams) {
			const { data } = await useAsyncData(UseAsyncDataKeys.GET_VOD_LIST, () => getVodListApi(query))
			this.base = data.value as any
			return data
		},
		setCurrentVideo(video: { name: string; url: string; index: number; from: string }) {
			Object.assign(this.currentVideo, video)
		},
	},
})
