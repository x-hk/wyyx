import request from "./request.js"

export function getLunbo() {
	return request({
		url: "getlunbo",
	})
}

export function getGongge() {
	return request({
		url: "getGongge",
	})
}

export function getHomeNews(){
	return request({
		url: "getHomeNews",
	})
}

export function getHomeFeatures(){
	return request({
		url: "getHomeFeatures",
	})
}

export function getHomeAtHome(){
	return request({
		url: "getHomeAtHome",
	})
}

export function getHomeKitchen(){
	return request({
		url: "getHomeKitchen",
	})
}

export function getHomeDiets(){
	return request({
		url: "getHomeDiets",
	})
}

export function getHomeFittings(){
	return request({
		url: "getHomeFittings",
	})
}

export function getHomeClothes(){
	return request({
		url: "getHomeClothes",
	})
}

export function getHomeBaby(){
	return request({
		url: "getHomeBaby",
	})
}

export function getHomeGroceries(){
	return request({
		url: "getHomeGroceries",
	})
}

export function getHomeWashs(){
	return request({
		url: "getHomeWashs",
	})
}

export function getHomeInterest(){
	return request({
		url: "getHomeInterest",
	})
}

export function getTopicData(page,size){
	return request({
		url: `getTopicData?page=${page}&size=${size}`,
	})
}

export function getClassifyNav(){
	return request({
		url: "getClassifyNav",
	})
}

export function getClassifyTitle(id){
	return request({
		url: `getClassifyTitle?id=${id}`,
	})
}

export function getClassStyle(id){
	return request({
		url: `getClassStyle?id=${id}`,
	})
}

export function getGoodsSwiper(id){
	return request({
		url: `getGoodsSwiper?id=${id}`,
	})
}

export function getGoods(id){
	return request({
		url: `getGoods?id=${id}`,
	})
}

export function getGoodsDetailData(id){
	return request({
		url: `getGoodsDetailData?id=${id}`,
	})
}