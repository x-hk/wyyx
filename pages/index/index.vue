<template>
	<view class="container">
		<view class="search">
			<navigator class="input" url="/pages/search/search" open-type="navigate">
				<!-- <image class="icon" src="@/static/image/icon/search-icon.png""></image> -->
				<text class="txt">商品搜索</text>
			</navigator>
		</view>
		<bw-swiper v-if="[swiperList.length > 0]" :swiperList="swiperList" style="width:100%"></bw-swiper>
		<view class="m-menu">
			<navigator class="item" :url="'/pages/category/category?id='+item.id" v-for="item in gonggeList" :key="item.id">
				<image :src="item.img"></image>
				<text>{{item.text}}</text>
			</navigator>
		</view>
		<view class="new">
			<view class="title">
				<navigator url="../newGoods/newGoods">
					<text class="txt">周一周四 · 新品首发</text>
				</navigator>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in goodsList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="features">
			<view class="title">
				<navigator url="../topic/topic" open-type="switchTab">
					<text class="txt">专题精选</text>
				</navigator>
			</view>
			<view class="features-list">
				<scroll-view class="list" scroll-x="true">
					<view class="item" v-for="(item,index) in featuresList" :key="index">
						<navigator :url="'../topicDetail/topicDetail?id='+item.id">
							<image class="img" :src="item.img"></image>
							<view class="np">
								<text class="name">{{item.name}}</text>
								<text class="price">￥{{item.price}}元起</text>
							</view>
							<text class="desc">{{item.desc}}</text>
						</navigator>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="atHome">
			<view class="title">
				<view @click="goclassification" data-id="2001">
					<text class="txt">居家</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in atHomeList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="kitchen">
			<view class="title">
				<view @click="goclassification" data-id="2002" >
					<text class="txt">餐厨</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in kitchenList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="diets">
			<view class="title">
				<view @click="goclassification" data-id="2003" >
					<text class="txt">饮食</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in dietsList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="fittings">
			<view class="title">
				<view @click="goclassification" data-id="2004">
					<text class="txt">配件</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in fittingsList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="clothes">
			<view class="title">
				<view @click="goclassification" data-id="2005">
					<text class="txt">服装</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in clothesList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="baby">
			<view class="title">
				<view @click="goclassification" data-id="2006">
					<text class="txt">婴童</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in babyList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="groceries">
			<view class="title">
				<view @click="goclassification" data-id="2007">
					<text class="txt">杂货</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in groceriesList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="wash">
			<view class="title">
				<view @click="goclassification" data-id="2008" url="" open-type="swi">
					<text class="txt">洗护</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in washList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>

		<view class="interest">
			<view class="title">
				<view  @click="goclassification" data-id="2009">
					<text class="txt">志趣</text>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item,index) in interestList" :key="index">
					<navigator :url="'../goods/goods?id='+item.id">
						<image class="img" :src="item.img"></image>
						<text class="name">{{item.name}}</text>
						<text class="price">￥{{item.price}}</text>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bwSwiper from "@/wxcomponents/bw-swiper/bw-swiper.vue"
	import {
		getLunbo,
		getGongge,
		getHomeNews,
		getHomeFeatures,
		getHomeAtHome,
		getHomeKitchen,
		getHomeDiets,
		getHomeFittings,
		getHomeClothes,
		getHomeBaby,
		getHomeGroceries,
		getHomeWashs,
		getHomeInterest
	} from "@/static/api/index.js"
	export default {
		data() {
			return {
				swiperList: [{}],
				gonggeList: [],
				goodsList: [],
				featuresList: [],
				atHomeList: [],
				kitchenList: [],
				dietsList: [],
				fittingsList: [],
				clothesList: [],
				babyList: [],
				groceriesList: [],
				washList: [],
				interestList: [],
			}
		},
		methods: {
			async getLunboData() {
				var {message} = await getLunbo();
				this.swiperList = message;
			},
			async getGonggeList() {
				var {message} = await getGongge();
				this.gonggeList = message;
			},
			async getHomeNewsData() {
				var {message} = await getHomeNews();
				this.goodsList = message
			},
			async getHomeFeaturesData() {
				var {message} = await getHomeFeatures();
				this.featuresList = message;
			},
			async getHomeAtHomeData() {
				var {message} = await getHomeAtHome();
				this.atHomeList = message;
			},
			async getKitchenList() {
				var {message} = await getHomeKitchen();
				this.kitchenList = message;
			},
			async getDietsList(){
				var {message} = await getHomeDiets();
				this.dietsList = message;
			},
			async getFittingsList(){
				var {message} = await getHomeFittings();
				this.fittingsList = message;
			},
			async getClothesList(){
				var {message} = await getHomeClothes();
				this.clothesList = message;
			},
			async getBabyList(){
				var {message} = await getHomeBaby();
				this.babyList = message;
			},
			async getGroceriesList(){
				var {message} = await getHomeGroceries();
				this.groceriesList = message;
			},
			async getWashList(){
				var {message} = await getHomeWashs();
				this.washList = message;
			},
			async getInterestList(){
				var {message} = await getHomeInterest();
				this.interestList = message;
			},
			goclassification(e){
				try{
					uni.setStorageSync('classificationId',e.currentTarget.dataset.id);
				}catch(e){
					console.log(e)
				}
				uni.switchTab({
					url:"../classification/classification"
				})
			}
		},
		created() {
			this.getLunboData();
			this.getGonggeList();
			this.getHomeNewsData();
			this.getHomeFeaturesData();
			this.getHomeAtHomeData();
			this.getKitchenList();
			this.getDietsList();
			this.getFittingsList();
			this.getClothesList();
			this.getBabyList();
			this.getGroceriesList();
			this.getWashList();
			this.getInterestList();
		},
		onShow(){
			uni.removeStorageSync("classificationId");
		},
		components: {
			"bw-swiper": bwSwiper
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 14px;
		line-height: 24px;
		background-color: rgb(244, 244, 244);
	}

	.search {
		height: 88rpx;
		width: 100%;
		padding: 0 30rpx;
		background: #fff;
		display: flex;
		align-items: center;

		.input {
			width: 690rpx;
			height: 56rpx;
			background: #ededed;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.icon {
				background-size: 100%;
				width: 28rpx;
				height: 28rpx;
			}

			.txt {
				height: 42rpx;
				line-height: 42rpx;
				color: #666;
				padding-left: 10rpx;
				font-size: 30rpx;
			}
		}
	}

	.m-menu {
		display: flex;
		height: 181rpx;
		width: 750rpx;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		margin-bottom: 20rpx;

		.item {
			flex: 1;
			display: block;
			padding: 20rpx 0;

			image {
				display: block;
				width: 58rpx;
				height: 58rpx;
				margin: 0 auto;
				margin-bottom: 12rpx;
			}

			text {
				display: block;
				font-size: 24rpx;
				text-align: center;
				margin: 0 auto;
				line-height: 1;
				color: #333;
			}
		}
	}

	.new {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
		color: #333;
		margin-bottom: 20rpx;

		.title {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			height: 130rpx;

			.txt {
				padding-right: 30rpx;
				background: url(http://ac-3yr0g9cz.clouddn.com/2cdba05….png) right 4rpx no-repeat;
				background-size: 16.656rpx 27rpx;
				display: inline-block;
				height: 36rpx;
				font-size: 33rpx;
				line-height: 36rpx;
			}
		}
	}

	.content {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding: 0 31rpx 45rpx 31rpx;
		box-sizing: border-box;

		.item {
			float: left;
			width: 302rpx;
			margin-top: 10rpx;
			margin-left: 21rpx;
			margin-right: 21rpx;

			.img {
				width: 302rpx;
				height: 302rpx;
				background: #f8f8f8;
			}

			.name {
				text-align: center;
				display: block;
				width: 302rpx;
				height: 35rpx;
				padding: 14rpx;
				overflow: hidden;
				font-size: 30rpx;
				color: #333;
			}

			.price {
				display: block;
				text-align: center;
				line-height: 30rpx;
				font-size: 30rpx;
				color: #b4282d;
			}
		}
	}

	.features {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
		color: #333;
		margin-bottom: 20rpx;

		.title {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			height: 130rpx;

			.txt {
				padding-right: 30rpx;
				background: url(http://ac-3yr0g9cz.clouddn.com/2cdba05….png) right 4rpx no-repeat;
				background-size: 16.656rpx 27rpx;
				display: inline-block;
				height: 36rpx;
				font-size: 33rpx;
				line-height: 36rpx;
			}
		}

		.features-list {

			padding: 0 0 48rpx 0;

			.list {
				height: 533rpx;
				width: 750rpx;
				white-space: nowrap;

				.item {
					display: inline-block;
					height: 533rpx;
					width: 680.5rpx;
					margin-left: 30rpx;
					overflow: hidden;

					.img {
						height: 387.5rpx;
						width: 680.5rpx;
						margin-bottom: 30rpx;
					}

					.np {
						height: 35rpx;
						margin-bottom: 13.5rpx;
						color: #333;
						font-size: 30rpx;

						.name {
							font-size: 29rpx;
							color: #333;
						}

						.price {
							margin-left: 20.8rpx;
							color: #b4282d;
						}
					}

					.desc {
						display: block;
						height: 50rpx;
						color: #999;
						font-size: 24rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}
	}

	.atHome,
	.kitchen,
	.clothes,
	.baby,
	.groceries,
	.wash,
	.interest,
	.diets,
	.fittings {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		background: #fff;
		color: #333;
		margin-bottom: 20rpx;

		.title {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			height: 130rpx;

			.txt {
				padding-right: 30rpx;
				background: url(http://ac-3yr0g9cz.clouddn.com/2cdba05….png) right 4rpx no-repeat;
				background-size: 16.656rpx 27rpx;
				display: inline-block;
				height: 36rpx;
				font-size: 33rpx;
				line-height: 36rpx;
			}
		}
	}
</style>
