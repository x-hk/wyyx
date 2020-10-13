<template>
	<view class="search-container">
		<uni-search-bar @confirm="search" @input="change" placeholder="520元礼包抢先领" />
		<view class="search-header">
			<view class="h">
				<text class="title">热门搜索</text>
			</view>
			<view class="b">
				<view :class="((index==0) ? 'active item': 'item')" v-for="(item,index) in hotList" v-key="index">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotList: [{
						"title": "520元礼包抢先领"
					},
					{
						"title": "新品上市"
					},
					{
						"title": "墨镜"
					},
					{
						"title": "杯子"
					},
					{
						"title": "秋衣"
					},
					{
						"title": "秋裤"
					},
					{
						"title": "棉被"
					},
				]
			};
		},
		methods: {
			search() {
				console.log("回车")
			},
			change() {
				console.log("打字")
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		min-height: 100vh;
		background-color: #f4f4f4;
	}

	.search-header {
		background: #fff;
		width: 750rpx;
		height: auto;
		overflow: hidden;
		margin-bottom: 20rpx;
	}

	.h {
		border-top: 2rpx solid rgba(0, 0, 0, .15);
		;
		padding: 0 31.25rpx;
		height: 93rpx;
		line-height: 93rpx;
		width: 100%;
		color: #999;
		font-size: 29rpx;

		.title {
			display: block;
			width: 120rpx;
			float: left;
			color: #333;
		}
	}

	.b {
		width: 750rpx;
		height: auto;
		overflow: hidden;
		padding-left: 31.25rpx;

		.item {
			display: inline-block;
			width: auto;
			height: 48rpx;
			line-height: 48rpx;
			padding: 0 15rpx;
			border: 1px solid #999;
			margin: 0 31.25rpx 31.25rpx 0;
			font-size: 24rpx;
			color: #333;
		}

		.active {
			color: #b4282d;
			border: 1px solid #b4282d;
		}
	}
</style>
