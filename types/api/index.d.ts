// type Props = {
//     imgUrl: string,
//     title: string,
//     description: string,
//     NoDrama: boolean,
//     onlyWatch: boolean,
//     part:number,
//     vip:boolean
// }

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
export interface ListItem {
	imgUrl?: string
	title?: string
	description?: string
	leftT?: Item // type 1 收藏图标
	rightT?: Item // type 1 绿色免费 2.vip黄色 3.vip|60帧 默认
	rightB?: Item // type 1. 评分 2. 红色新增弹幕
	leftB?: Item // type 1. 分类电影
	bottomT?: Item // type 1.表示分类 使用| 分割  2.单独一个红标签
	src?: string
	more?: boolean //更多icon
	tag?: string // 标签名称类似router-link
	width?: number // 容器宽度 1 2 4
	height?: string // 容器高度 1 2 3 有默认高度，可进行配置替代默认
	[key: string]: any // 字符串索引签名
}

//小说组件中的aside
export interface AsideItem {
	icon: string
	text: string
	src: number
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
