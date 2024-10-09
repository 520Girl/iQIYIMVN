// type Props = {
//     imgUrl: string,
//     title: string,
//     description: string,
//     NoDrama: boolean,
//     onlyWatch: boolean,
//     part:number,
//     vip:boolean
// }
export enum UseAsyncDataKeys {
	GET_HOME_BASE = `GET_HOME_BASE`,
	GET_SLIDER = "GET_SLIDER",
	GET_VOD_LIST = "GET_VOD_LIST",
}

export type Props = {
	imgUrl: string
	title: string
	description: string
	NoDrama: boolean
	onlyWatch: boolean
	part: number
	vip: boolean
}

//main 中的list
type Item = {
	[key: string]: any // 字符串索引签名
}
type ItemList = {
	type: number
	text: string
}
type ItemList2 = {
	name: string
	params: { type_id: number; vod_id: number }
}
export interface ListItem {
	imgUrl: string
	title: string
	description: string
	leftT: ItemList // type 1 收藏图标
	rightT: ItemList // type 1 绿色免费 2.vip黄色 3.vip|60帧 默认  国语
	rightB: ItemList // type 1. 评分 2. 红色新增弹幕     评分+备忘
	leftB: ItemList // type 1. 分类电影                 type_name 类型名称
	bottomT: ItemList // type 1.表示分类 使用| 分割  2.单独一个红标签
	src: ItemList2 | string // 详情页跳转链接
	more?: boolean //更多icon
	tag: string // 标签名称类似router-link
	width?: number // 容器宽度 1 2 4
	height?: string // 容器高度 1 2 3 有默认高度，可进行配置替代默认
	[key: string]: any // 字符串索引签名
}

//小说组件中的aside
export interface AsideItem {
	icon: string
	text: string
	src: number
	bc?: string
	[key: string]: any // 字符串索引签名
}

//svg icon
export interface IconItem {
	name: string | number
	height?: string
	width?: string
	[key: string]: any // 字符串索引签名
}

//小说list
export type NovelList = NovelItem[]
export interface NovelItem {
	title: string
	data: NItem[]
}
export interface NItem {
	imgUrl?: string
	title?: string
	description?: string
	src?: string
	rightT?: Item // type 1 绿色免费 2.vip黄色 3.vip|60帧 默认
}

//store 数据的定义
//定义一个store的枚举类型
export enum StoreType {
	Home = "Home",
	PlayStore = "PlayStore",
	MovieStore = "MovieStore",
}

type HomeBaseList = {
	type_id: number
	type_pid: number
	type_name: string
	type_title: string
	type_key: string
	type_des: string
	type_extend: TypeExtendList
}

type TypeExtendList = {
	class: string
	area: string
	lang: string
	year: string
	star: string
	director: string
	state: string
	version: string
}
type HomeBaseFrom = {
	name: string
	alias: string
	[key: string]: any // 字符串索引签名
}
export interface HomeBaseTypes {
	seo: Item
	list: HomeBaseList[]
	from: HomeBaseFrom[]
}
export interface navTypes {
	id: number
	name: string
	title?: string
	key?: string
	des?: string
	disabled: boolean
	ripple: boolean
	[key: string]: any
}

//api 请求参数
export type SliderTypes = {
	type_ids: string | undefined
}
//api slider 返回数据
type SliderItem = {
	vod_id: number
	vod_name: string
	type_id: number
	vod_en: string
	vod_time: string
	vod_remarks: string
	vod_play_from: string
	vod_pic: string
	type_name: string
}
export interface SliderTypesData {
	list: Array<SliderItem>
}

//api list 请求参数
export interface ListTypesParams {
	/**
	 * 分为list 列表 和 详情 detail
	 */
	ac?: string
	/**
	 * h=几小时内的数据 http://域名/api.php/provide/vod/?ac=detail&h=24     获取24小时内更新数据信息
	 */
	h?: string
	/**
	 * 视频表中 的 vod_id    ids=123,567     获取ID为123和567的数据信息
	 */
	ids?: string
	/**
	 * isend是否连载完毕   0,1
	 */
	isend?: nubmer | string
	/**
	 * 获取条数
	 */
	pagesize?: number | string
	/**
	 * 页码  http://域名/api.php/provide/vod/?ac=list&t=1&pg=5   分类ID为1的列表数据第5页
	 */
	pg?: number | string
	/**
	 * 排序字段
	 */
	sort_direction?: string
	/**
	 * 视频表中的 type_id
	 */
	t?: number | string
	/**
	 * 视频表中的type_id_1  也就是大分类
	 */
	t_1?: number | string
	/**
	 * 搜索功能 关键字搜索
	 */
	wd?: string
	/**
	 * 年份筛选
	 */
	year?: string
	[property: string]: any
}

//api list 返回数据
export type ListItemApi = {
	vod_id: number
	vod_name: string
	type_id: number
	type_name: string
	vod_time: string
	vod_remarks: string
	vod_play_from: string
	vod_score: string
	vod_lang: string
	vod_tag: string
	vod_class: string
	vod_hits: number
	vod_pic: string
	vod_content: string
	[key: string]: any // 字符串索引签名
}
export interface ListTypesData {
	list: Array<ListItemApi>
	pagecount: number
	total: number
	limit: number
	page: number
	[property: string]: any
}
