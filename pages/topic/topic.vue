<template>
	<view>
		<view class="container">
			<scroll-view class="topic-list" scroll-y="true" :scroll-top="scrollTop">
				<navigator class="item" v-for="item in topicList" :key="item.id" :url="'../topicDetail/topicDetail?id='+item.id">
					<image class="img" :src="item.img"></image>
					<view class="info">
						<text class="title">{{item.name}}</text>
						<text class="desc">{{item.desc}}</text>
						<text class="price">{{item.price}}元起</text>
					</view>
				</navigator>
				<view class="page" v-if="showPage">
					<view :class="((page <= 1) ? 'disabled prev' : ' prev')" @click="prevPage">上一页</view>
					<view :class="((topicList.length < 5) ? 'disabled next' : 'next')" @click="nextPage">下一页</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		getTopicData
	} from "../../static/api/index.js"
	export default {
		data() {
			return {
				topicList: [],
				page: 1,
				size: 5,
				scrollTop: 0,
				showPage: false
			}
		},
		methods: {
			prevPage() {
				if (this.page <= 1) {
					return false;
				}
				this.page = parseInt(this.page) - 1
				this.getTopic();
			},
			nextPage() {
				if (this.topicList.length < 5) {
					return false;
				}
				this.page = parseInt(this.page) + 1
				this.getTopic();

			},
			async getTopic() {
				this.showPage = false;
				this.scrollTop = 0;
				let {message} = await getTopicData(this.page, this.size);
				if (message.length != 0) {
					this.showPage = true;
					this.topicList = message;
				} else {
					uni.showToast({
						title: '没有更多数据',
						duration: 1000
					})
				}
			},
		},
		created() {
			this.getTopic();
		}
	}
</script>

<style>
	.container {
		width: 750rpx;
		height: 100%;
		overflow: hidden;
		background: #f4f4f4;
	}

	.topic-list {
		width: 750rpx;
		height: 100%;
		overflow: hidden;
		background: #f4f4f4;
	}

	.topic-list .item {
		width: 100%;
		height: 625rpx;
		overflow: hidden;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.topic-list .img {
		width: 100%;
		height: 415rpx;
	}

	.topic-list .info {
		width: 100%;
		height: 210rpx;
		overflow: hidden;
	}

	.topic-list .title {
		display: block;
		text-align: center;
		width: 100%;
		height: 33rpx;
		line-height: 35rpx;
		color: #333;
		overflow: hidden;
		font-size: 35rpx;
		margin-top: 30rpx;
	}

	.topic-list .desc {
		display: block;
		text-align: center;
		position: relative;
		width: auto;
		height: 24rpx;
		line-height: 24rpx;
		overflow: hidden;
		color: #999;
		font-size: 24rpx;
		margin-top: 16rpx;
		margin-bottom: 30rpx;
	}

	.topic-list .price {
		display: block;
		text-align: center;
		width: 100%;
		height: 27rpx;
		line-height: 27rpx;
		overflow: hidden;
		color: #b4282d;
		font-size: 27rpx;
	}


	.page {
		width: 750rpx;
		height: 108rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.page view {
		height: 108rpx;
		width: 49%;
		float: left;
		font-size: 29rpx;
		color: #333;
		text-align: center;
		line-height: 108rpx;
	}

	.page .prev {
		border-right: 1px solid #D9D9D9;
	}

	.page .disabled {
		color: #ccc;
	}
</style>
