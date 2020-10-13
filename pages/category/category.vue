<template>
	<view class="container">
		<view class="cate-nav">
			<scroll-view scroll-x="true" class="cate-nav-body" style="width: 750rpx;" :scroll-left="scrollLeft">
				<view v-for="(item,index) in navList" :class="((id == item.id) ? 'active item' : 'item')" :data-id="item.id"
				 :data-index="index" @click="switchCate(item.id,index)" :key="index" >
					<view class="name">{{item.name}}</view>
				</view>
			</scroll-view> 
		</view>
		<scroll-view scroll-y="true">
			<view class="cate-item">
				<view class="h">
					<text class="name">{{currentCategory.name}}</text>
					<text class="desc">{{currentCategory.font_name}}</text>
				</view>
				<view class="b">
					<navigator :class="(((iindex + 1) % 2 == 0) ? 'item-b item' : 'item')" :url="'/pages/goods/goods?id='+iitem.goods_id"
					 v-for="(iitem,iindex) in goodsList">
						<image class="img" :src="iitem.img[0]" background-size="cover"></image>
						<text class="name">{{iitem.name}}</text>
						<text class="price">￥{{iitem.price}}</text>
					</navigator>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getClassStyle,
		getClassifyTitle,
		getGoods
	} from "@/static/api/index.js"
	export default {
		data() {
			return {
				navList: [],
				goodsList: [],
				id: 0,
				index:0,
				currentCategory: {},
				scrollLeft: 0,
				scrollTop: 0,
				scrollHeight: 0,
				page: 1,
				size: 10000
			}
		},
		methods: {
			async getNavList(id) {
				var {
					message
				} = await getClassStyle(id);
				this.navList = message; 
				this.currentCategory = this.navList[this.index]
			},
			async getGoodsList(id) {
				var {
					message
				} = await getGoods(id);
				this.goodsList = message; 
				for(var i=0;i<this.goodsList.length;i++){
					this.goodsList[i].img = this.goodsList[i].img.split(',')
				}
			},
			switchCate(id,index){
				this.id = id;
				this.currentCategory = this.navList[index]
				this.getGoodsList(this.currentCategory.id)
			}
		},
		// #ifdef H5
		created() {
			this.getNavList(this.$route.query.id);
			this.getGoodsList(this.$route.query.style_id);
			this.id = this.$route.query.style_id;
			this.index = this.$route.query.index;
		},
		// #endif
		// #ifdef MP-WEIXIN
		onLoad(e) {
			this.getNavList(e.id)
			this.getGoodsList(e.style_id);
			this.id = e.style_id
			this.index = e.index;
		}
		// #endif

	}
</script>

<style>
	.container {
		background: #f9f9f9;
	}

	.cate-nav {
		left: 0;
		top: 0;
		
	}

	.cate-nav-body {
		height: 84rpx;
		white-space: nowrap;
		background: #fff;
		border-top: 1px solid rgba(0, 0, 0, .15);
		overflow: hidden;
	}

	.cate-nav .item {
		display: inline-block;
		height: 84rpx;
		min-width: 130rpx;
		padding: 0 15rpx;
	}

	.cate-nav .item .name {
		display: block;
		height: 80rpx;
		text-align: center;
		padding: 0 20rpx;
		line-height: 84rpx;
		color: #333;
		font-size: 30rpx;
		width: auto;
	}

	.cate-nav .item.active .name {
		color: #ab2b2b;
		border-bottom: 2px solid #ab2b2b;
	}

	.cate-item {
		height: auto;
		overflow: hidden;
	}

	.cate-item .h {
		height: 145rpx;
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.cate-item .h .name {
		display: block;
		height: 35rpx;
		margin-bottom: 18rpx;
		font-size: 30rpx;
		color: #333;
	}

	.cate-item .h .desc {
		display: block;
		height: 24rpx;
		font-size: 24rpx;
		color: #999;
	}

	.cate-item .b {
		width: 750rpx;
		padding: 0 6.25rpx;
		height: auto;
		overflow: hidden;
	}

	.cate-item .b .item {
		float: left;
		background: #fff;
		width: 365rpx;
		margin-bottom: 6.25rpx;
		padding-bottom: 33.333rpx;
		height: auto;
		overflow: hidden;
		text-align: center;
	}

	.cate-item .b .item-b {
		margin-left: 6.25rpx;
	}

	.cate-item .item .img {
		width: 302rpx;
		height: 302rpx;
	}

	.cate-item .item .name {
		display: block;
		width: 365.625rpx;
		height: 35rpx;
		margin: 11.5rpx 0 22rpx 0;
		text-align: center;
		overflow: hidden;
		padding: 0 20rpx;
		font-size: 30rpx;
		color: #333;
	}

	.cate-item .item .price {
		display: block;
		width: 365.625rpx;
		height: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #b4282d;
	}
</style>
