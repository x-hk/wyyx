<template>
	<view class="container">
		<view class="collect-list" v-if="collectList.length>0">
			<view class="item" @click="openGoods(item.goods_id)"  v-for="(item,index) in collectList"
			 :key="item.goods_id">
				<image class="img" :src="item.showImg"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="desc">{{item.desc}}</view>
					<view class="price">￥{{item.price}}</view>
				</view>
			</view>
		</view>
		<view class="no-favorite" v-else>
			<view class="c">
				<image src="../../static/image/icon/no-favorite.jpg" />
				</br>
				<text>去收藏点什么吧</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getUserFavoriteGoods } from "../../static/api/index.js"
	export default {
		data() {
			return {
				collectList : [],
			}
		},
		methods: {
			openGoods(id){
				uni.navigateTo({
					url:`/pages/goods/goods?id=${id}`
				})
			},
			load(message){
				if(!message){
					message = []; 
				}
				message.map(m=>{
					m.showImg = m.img.split(',')[0]
				})
				this.collectList = message;
			}
		},
		async onLoad() {
			var {message} = await getUserFavoriteGoods();
			this.load(message);
		},
		async onShow(){
			var {message} = await getUserFavoriteGoods();
			this.load(message);
		},
	}
</script>

<style>
	.container {
		background: #f4f4f4;
		min-height: 100%;
	}

	.collect-list {
		width: 100%;
		height: auto;
		overflow: hidden;
		background: #fff;
		padding-left: 30rpx;
		border-top: 1px solid #e1e1e1;
	}

	.item {
		height: 212rpx;
		width: 720rpx;
		background: #fff;
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1px solid #e1e1e1;
	}

	.item:last-child {
		border-bottom: 1px solid #fff;
	}

	.item .img {
		float: left;
		width: 150rpx;
		height: 150rpx;
	}

	.item .info {
		float: right;
		width: 540rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
	}

	.item .info .name {
		font-size: 28rpx;
		color: #333;
		line-height: 40rpx;
	}


	.item .info .subtitle {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #888;
		line-height: 40rpx;
	}

	.item .info .price {
		margin-top: 8rpx;
		font-size: 28rpx;
		color: #333;
		line-height: 40rpx;
	}
	
	.no-favorite {
		width: 100%;
		height: 100vh;
		margin: 0 auto;
	}
	
	.no-favorite .c {
		width: 100%;
		height: auto;
	}
	
	.no-favorite .c image {
		margin: 0 auto;
		display: block;
		text-align: center;
		padding-top: 200rpx;
		width: 720rpx;
		height: 720rpx;
	}
	
	.no-favorite .c text {
		margin: 0 auto;
		display: block;
		width: 720rpx;
		height: 29rpx;
		line-height: 29rpx;
		text-align: center;
		font-size: 29rpx;
		color: #999;
	}
</style>
