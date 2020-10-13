<template>
	<view class="goods_container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="width: 750rpx;height: 750rpx;">
			<swiper-item v-for="(item,index) in swiperList " :key="index" >
				<view class="swiper-item">
					<image :src="item.img" mode="" style="width: 750rpx;height: 750rpx;"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="service-policy">
			<view class="item">30天无忧退货</view>
			<view class="item">48小时快速退款</view>
			<view class="item">满88元免邮费</view>
		</view>
		<view class="goods-info">
			<view class="c">
				<text class="name">{{goods.name}}</text>
				<text class="desc">{{goods.desc}}</text>
				<text class="price">￥{{goods.price}}</text>
			</view>
		</view>
		<view class="section-nav section-attr" @click="switchAttrPop">
			<view class="t">请选择规格数量</view>
			<image class="i" src="../../static/image/icon/address_right.png" background-size="cover"></image>
		</view>
		<view class="attr-pop-box" :hidden="!openAttr">
			<view class="attr-pop">
				<view class="close" @click="closeAttr">
					<image class="icon" src="/static/image/icon_close.png"></image>
				</view>
				<view class="img-info">
					<image class="img" :src="showImg"></image>
					<view class="info">
						<view class="c">
							<view class="p">单价:￥{{goods.price}}</view>
						</view>
					</view>
				</view>
				<view class="spec-con">
					<view class="number-item">
						<view class="name">数量</view>
						<view class="selnum">
							<view class="cut" @click="cutNumber">-</view>
							<input :value="number" class="number" disabled="true" type="number" />
							<view class="add" @click="addNumber">+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<view class="l l-collect" @click="changeFavorite">
				<image v-if="!favorite" class="icon" :src="noFavoriteImg"></image>
				<image v-else class="icon" :src="favoriteImg"></image>
			</view>
			<view class="l l-cart">
				<view class="box">
					<text class="cart-count">{{$store.getters.getTotalCount}}</text>
					<image @click="openCartPage" class="icon" src="/static/image/icon/shop-car.png"></image>
				</view>
			</view>
			<view class="c">立即购买</view>
			<view class="r" @click="addToCart">加入购物车</view>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsSwiper,
		getGoodsDetailData,
		getUserFavoriteGoods
	} from "@/static/api/index.js"
	import bwSwiper from "@/wxcomponents/bw-swiper/bw-swiper.vue"
	export default {
		data() {
			return {
				swiperList: {},
				id: 0,
				goods: {},
				number: 1,
				openAttr : false,
				showImg:"",
				favoriteImg:"/static/image/icon/icon_collect_checked.png",
				noFavoriteImg:"/static/image/icon/icon_collect.png",
				favorite : false,
			}
		},
		methods: {
			async getSwiperList(id) {
				var {message} = await getGoodsSwiper(id);
				this.swiperList = message;
				this.showImg = this.swiperList[0].img;
			},
			async getGoodsDetail(id) {
				var {message} = await getGoodsDetailData(id);
				this.goods = message[0];
				var {message} = await getUserFavoriteGoods(id);
				if(message.length == 0) return;
				(message[0].favorite == 0) ? (this.favorite = false) : (this.favorite = true)
			},
			switchAttrPop(){
				this.openAttr = !this.openAttr
			},
			closeAttr(){
				this.openAttr = false
				this.number = 1;
			},
			cutNumber(){
				if(this.number == 1){
					return;
				}
				this.number -= 1;
			},
			addNumber(){
				this.number += 1;
			},
			async addToCart(){
				if(this.openAttr == false){
					this.openAttr = !this.openAttr;
					return;
				}
				var goods = {
					id : this.id,
					number : this.number,
					price : this.goods.price,
					img : this.swiperList[0].img,
					name : this.goods.name,
					checked : 1,
				}
				await this.$store.dispatch("asyncAddCar",goods);
				this.openAttr = false;
				this.number = 1;
			},
			openCartPage(){
				uni.switchTab({
					url:"/pages/shopcar/shopcar"
				})
			},
			async changeFavorite(){
				await this.$store.dispatch("asyncChangeFavorite",this.goods.goods_id)
				await this.getGoodsDetail(this.goods.goods_id);
			}
		},
		// #ifdef H5
		async created() {
			var queryId = this.$route.query.id
			this.id = queryId;
			this.getSwiperList(queryId);
			this.getGoodsDetail(queryId);
			await this.$store.dispatch("asyncFlush")
		},
		// #endif
		// #ifdef MP-WEIXIN
		onLoad(e) {
			this.getSwiperList(e.id);
			this.getGoodsDetail(e.id);
			this.id = e.id;
			await this.$store.dispatch("asyncFlush")
		},
		// #endif
		components: {
			"bw-swiper": bwSwiper
		}
	}
</script>

<style>
	.goods_container{
		padding-bottom: 104rpx;
	}
	
	.container {
		margin-bottom: 100rpx;
	}

	.goodsimgs {
		width: 750rpx;
		height: 750rpx;
	}

	.goodsimgs image {
		width: 750rpx;
		height: 750rpx;
	}
	.service-policy {
		width: 690rpx;
		height: 73rpx;
		background: #f4f4f4;
		padding: 0 30rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.service-policy .item {
		background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png) 0 center no-repeat;
		background-size: 10rpx;
		padding-left: 15rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		color: #666;
	}

	.goods-info {
		width: 750rpx;
		height: 306rpx;
		overflow: hidden;
		background: #fff;
	}

	.goods-info .c {
		display: block;
		width: 718.75rpx;
		height: 100%;
		margin-left: 31.25rpx;
		padding: 38rpx 31.25rpx 38rpx 0;
		border-bottom: 1px solid #f4f4f4;
	}

	.goods-info .c text {
		display: block;
		width: 687.5rpx;
		text-align: center;
	}

	.goods-info .name {
		height: 41rpx;
		margin-bottom: 5.208rpx;
		font-size: 41rpx;
		line-height: 41rpx;
	}

	.goods-info .desc {
		height: 43rpx;
		margin-bottom: 41rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		color: #999;
	}

	.goods-info .price {
		height: 35rpx;
		font-size: 35rpx;
		line-height: 35rpx;
		color: #b4282d;
	}

	.section-nav {
		width: 750rpx;
		height: 108rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.section-nav .t {
		float: left;
		width: 600rpx;
		height: 108rpx;
		line-height: 108rpx;
		font-size: 29rpx;
		color: #333;
		margin-left: 31.25rpx;
	}

	.section-nav .i {
		float: right;
		width: 52rpx;
		height: 52rpx;
		margin-right: 16rpx;
		margin-top: 28rpx;
	}

	.section-act .t {
		float: left;
		display: flex;
		align-items: center;
		width: 600rpx;
		height: 108rpx;
		overflow: hidden;
		line-height: 108rpx;
		font-size: 29rpx;
		color: #999;
		margin-left: 31.25rpx;
	}

	.section-act .label {
		color: #999;
	}

	.section-act .tag {
		display: flex;
		align-items: center;
		padding: 0 10rpx;
		border-radius: 3px;
		height: 37rpx;
		width: auto;
		color: #f48f18;
		overflow: hidden;
		border: 1px solid #f48f18;
		font-size: 25rpx;
		margin: 0 10rpx;
	}

	.section-act .text {
		display: flex;
		align-items: center;
		height: 37rpx;
		width: auto;
		overflow: hidden;
		color: #f48f18;
		font-size: 29rpx;
	}

	.goods-attr {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding: 0 31.25rpx 25rpx 31.25rpx;
		background: #fff;
	}

	.goods-attr .t {
		width: 687.5rpx;
		height: 104rpx;
		line-height: 104rpx;
		font-size: 38.5rpx;
	}

	.goods-attr .item {
		width: 687.5rpx;
		height: 68rpx;
		padding: 11rpx 20rpx;
		margin-bottom: 11rpx;
		background: #f7f7f7;
		font-size: 38.5rpx;
	}

	.goods-attr .left {
		float: left;
		font-size: 25rpx;
		width: 134rpx;
		height: 45rpx;
		line-height: 45rpx;
		overflow: hidden;
		color: #999;
	}

	.goods-attr .right {
		float: left;
		font-size: 36.5rpx;
		margin-left: 20rpx;
		width: 480rpx;
		height: 45rpx;
		line-height: 45rpx;
		overflow: hidden;
		color: #333;
	}

	.detail {
		width: 750rpx;
		height: auto;
		overflow: hidden;
	}

	.detail image {
		width: 750rpx;
		display: block;
	}

	.bottom-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 750rpx;
		height: 100rpx;
		display: flex;
		background: #fff;
	}

	.bottom-btn .l {
		float: left;
		height: 100rpx;
		width: 162rpx;
		border: 1px solid #f4f4f4;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bottom-btn .l.l-collect {
		border-right: none;
		border-left: none;
		text-align: center;
	}

	.bottom-btn .l.l-cart .box {
		position: relative;
		height: 60rpx;
		width: 60rpx;
	}

	.bottom-btn .l.l-cart .cart-count {
		height: 28rpx;
		width: 28rpx;
		z-index: 10;
		position: absolute;
		top: 0;
		right: 0;
		background: #b4282d;
		text-align: center;
		font-size: 18rpx;
		color: #fff;
		line-height: 28rpx;
		border-radius: 50%;
	}

	.bottom-btn .l.l-cart .icon {
		position: absolute;
		top: 10rpx;
		left: 0;
	}

	.bottom-btn .l .icon {
		display: block;
		height: 44rpx;
		width: 44rpx;
	}

	.bottom-btn .c {
		float: left;
		height: 100rpx;
		line-height: 96rpx;
		flex: 1;
		text-align: center;
		color: #333;
		border-top: 1px solid #f4f4f4;
		border-bottom: 1px solid #f4f4f4;
	}

	.bottom-btn .r {
		border: 1px solid #b4282d;
		background: #b4282d;
		float: left;
		height: 100rpx;
		line-height: 96rpx;
		flex: 1;
		text-align: center;
		color: #fff;
	}

	.attr-pop-box {
		width: 100%;
		height: 100%;
		position: fixed;
		background: rgba(0, 0, 0, .5);
		z-index: 8;
		bottom: 0;
		/* display: none; */
	}

	.attr-pop {
		/* #ifdef H5 */
		width: 690rpx;
		/* #endif */
		
		/* #ifdef MP-WEIXIN */
		width: 100%;
		/* #endif */
		height: auto;
		max-height: 780rpx;
		padding: 31.25rpx;
		background: #fff;
		position: fixed;
		z-index: 9;
		bottom: 100rpx;
	}

	.attr-pop .close {
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		right: 31.25rpx;
		overflow: hidden;
		top: 31.25rpx;
	}

	.attr-pop .close .icon {
		width: 48rpx;
		height: 48rpx;
	}

	.attr-pop .img-info {
		width: 687.5rpx;
		height: 177rpx;
		overflow: hidden;
		margin-bottom: 41.5rpx;
	}

	.attr-pop .img {
		float: left;
		height: 177rpx;
		width: 177rpx;
		background: #f4f4f4;
		margin-right: 31.25rpx;
	}

	.attr-pop .info {
		float: left;
		height: 177rpx;
		display: flex;
		align-items: center;
	}

	.attr-pop .p {
		font-size: 33rpx;
		color: #333;
		height: 33rpx;
		line-height: 33rpx;
		margin-bottom: 10rpx;
	}

	.attr-pop .a {
		font-size: 29rpx;
		color: #333;
		height: 40rpx;
		line-height: 40rpx;
	}

	.spec-con {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.spec-con .name {
		height: 32rpx;
		margin-bottom: 22rpx;
		font-size: 29rpx;
		color: #333;
	}

	.spec-con .values {
		height: auto;
		margin-bottom: 31.25rpx;
		font-size: 0;
	}

	.spec-con .value {
		display: inline-block;
		height: 62rpx;
		padding: 0 35rpx;
		line-height: 56rpx;
		text-align: center;
		margin-right: 25rpx;
		margin-bottom: 16.5rpx;
		border: 1px solid #333;
		font-size: 25rpx;
		color: #333;
	}

	.spec-con .value.disable {
		border: 1px solid #ccc;
		color: #ccc;
	}

	.number-item .selnum {
		width: 322rpx;
		height: 71rpx;
		border: 1px solid #ccc;
		display: flex;
	}

	.number-item .cut {
		width: 93.75rpx;
		height: 100%;
		text-align: center;
		line-height: 65rpx;
	}

	.number-item .number {
		flex: 1;
		height: 100%;
		text-align: center;
		line-height: 68.75rpx;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		float: left;
	}

	.number-item .add {
		width: 93.75rpx;
		height: 100%;
		text-align: center;
		line-height: 65rpx;
	}
</style>
