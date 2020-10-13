<template>
	<view class="container">
		<view class="service-policy">
			<view class="item">30天无忧退货</view>
			<view class="item">48小时快速退款</view>
			<view class="item">满88元免邮费</view>
		</view>
		<view class="no-cart" v-if="cartGoods.length <= 0">
			<view class="c">
				<image src="../../static/image/none-shop.png" />
				<text>去添加点什么吧</text>
			</view>
		</view>
		<view class="cart-view" v-if="cartGoods.length > 0">
			<view class="list">
				<view class="group-item">
					<view class="goods">
						<view :class="(isEditCart ? 'edit item' : 'item')" v-for="(item,index) in cartGoods" :key="item.id">
							<view :class="(item.checked ? 'checked checkbox' : 'checkbox')" @click="checkedItem(index)" data-item-index="index"></view>
							<view class="cart-goods">
								<navigator :url="'/pages/goods/goods?id=' + item.goods_id">
									<image class="img" :src="item.img"></image>
								</navigator>
								<view class="info">
									<view class="t">
										<text class="name">{{item.name}}</text>
										<text class="num">x{{item.number}}</text>
									</view>
									<view class="attr">{{ item.checked ? '已选择' : ''}}</view>
									<view class="b">
										<text class="price">￥{{item.price}}</text>
										<view class="selnum">
											<view class="cut" @click="cutNumber(index)" data-item-index="index">-</view>
											<input :value="item.number" class="number" disabled="true" type="number" />
											<view class="add" @click="addNumber(index)" data-item-index="index">+</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cart-bottom">
				<view :class="(checkedAllStatus ? 'checked checkbox' : 'checkbox')" @click="checkedAll">全选({{$store.getters.getCheckCount}})</view>
				<view class="total">{{!isEditCart ? '￥'+ $store.getters.getTotalPrice : ''}}</view>
				<view class="delete" @click="editCart">{{!isEditCart ? '编辑' : '完成'}}</view>
				<view class="checkout" @click="deleteCart" v-if="isEditCart">删除所选</view>
				<view class="checkout" @click="checkoutOrder" v-if="!isEditCart">下单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartGoods: [],
				isEditCart : false,
				checkedAllStatus : true,
				editCartList : [],
			}
		},
		methods:{
			async checkedItem(index){
				var id = this.cartGoods[index].goods_id;
				await this.$store.dispatch('asyncChangeChecked',id);
				await this.$store.dispatch("asyncFlush")
				this.cartGoods = this.$store.state.carData; 
				// 判断是否有（未选择）
				var haveFalse = this.cartGoods.some(m=>{
					return m.checked == false
				})
				// 如果有（未选择）显示空白，如果没有（未选择）则显示√；
				haveFalse ? (this.checkedAllStatus = false) : (this.checkedAllStatus = true);
			},
			editCart(){
				this.isEditCart = !this.isEditCart
			},
			async cutNumber(index){
				if(this.cartGoods[index].number == 1){
					return;
				}
				var id = this.cartGoods[index].goods_id;
				await this.$store.dispatch('asyncCutNumber',id);
				await this.$store.dispatch("asyncFlush")
				this.cartGoods = this.$store.state.carData;
			},
			async addNumber(index){
				var id = this.cartGoods[index].goods_id;
				await this.$store.dispatch('asyncAddNumber',id);
				await this.$store.dispatch("asyncFlush")
				this.cartGoods = this.$store.state.carData;
			},
			async checkedAll(){
				await this.$store.dispatch('asyncChangeAllChecked',this.checkedAllStatus)
				this.checkedAllStatus = !this.checkedAllStatus;
				await this.$store.dispatch("asyncFlush")
				this.cartGoods = this.$store.state.carData; 
			},
			async deleteCart(){
				var ids = [];
				this.cartGoods.map(m=>{
					if(m.checked){
						ids.push(m.goods_id);
					}
				})
				await this.$store.dispatch('asyncDelGoods',ids);
				await this.$store.dispatch("asyncFlush")
				this.cartGoods = this.$store.state.carData; 
			}
		},
		async onLoad() {
			await this.$store.dispatch('asyncFlush')
			this.cartGoods = this.$store.state.carData;
		},
		async onShow() {
			await this.$store.dispatch('asyncFlush')
			this.cartGoods = this.$store.state.carData;
			var haveFalse = this.cartGoods.some(m=>{
				return m.checked == false
			})
			// 如果有（未选择）显示空白，如果没有（未选择）则显示√；
			haveFalse ? (this.checkedAllStatus = false) : (this.checkedAllStatus = true)
		}
	}
</script>

<style>
	page {
		height: 100%;
		min-height: 100%;
		background: #f4f4f4;
	}

	.container {
		background: #f4f4f4;
		width: 100%;
		height: auto;
		min-height: 100%;
		overflow: hidden;
	}

	.service-policy {
		height: 73rpx;
		background: #f4f4f4;
		padding: 0 31.25rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
	}

	.service-policy .item {
		background: url(../../static/image/quan.png) 0 center no-repeat;
		background-size: 10rpx;
		padding-left: 15rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		color: #666;
	}

	.no-cart {
		width: 100%;
		height: auto;
		margin: 0 auto;
	}

	.no-cart .c {
		width: 100%;
		height: auto;
		margin-top: 200rpx;
	}

	.no-cart .c image {
		margin: 0 auto;
		display: block;
		text-align: center;
		width: 258rpx;
		height: 258rpx;
	}

	.no-cart .c text {
		margin: 0 auto;
		display: block;
		width: 258rpx;
		height: 29rpx;
		line-height: 29rpx;
		text-align: center;
		font-size: 29rpx;
		color: #999;
	}


	.cart-view {
		width: 100%;
		height: auto;
		overflow: hidden;

	}

	.cart-view .list {
		height: auto;
		width: 100%;
		overflow: hidden;
		margin-bottom: 120rpx;
	}

	.cart-view .group-item {
		height: auto;
		width: 100%;
		background: #fff;
		margin-bottom: 18rpx;
	}

	.cart-view .item {
		height: 164rpx;
		width: 100%;
		overflow: hidden;
	}

	.cart-view .item .checkbox {
		float: left;
		height: 34rpx;
		width: 34rpx;
		margin: 65rpx 18rpx 65rpx 26rpx;
		background: url(../../static/image/baiquan.png) no-repeat;
		background-size: 34rpx;
	}

	.cart-view .item .checkbox.checked {
		background: url(../../static/image/hongdui.png) no-repeat;
		background-size: 34rpx;
	}

	.cart-view .item .cart-goods {
		float: left;
		height: 164rpx;
		width: 672rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.cart-view .item .img {
		float: left;
		height: 125rpx;
		width: 125rpx;
		background: #f4f4f4;
		margin: 19.5rpx 18rpx 19.5rpx 0;
	}

	.cart-view .item .info {
		float: left;
		height: 125rpx;
		width: 503rpx;
		margin: 19.5rpx 26rpx 19.5rpx 0;
	}

	.cart-view .item .t {
		margin: 8rpx 0;
		height: 28rpx;
		font-size: 25rpx;
		color: #333;
		overflow: hidden;
	}


	.cart-view .item .name {
		height: 28rpx;
		max-width: 310rpx;
		line-height: 28rpx;
		font-size: 25rpx;
		color: #333;
		overflow: hidden;
	}

	.cart-view .item .num {
		height: 28rpx;
		line-height: 28rpx;
		float: right;
	}

	.cart-view .item .attr {
		margin-bottom: 17rpx;
		height: 24rpx;
		line-height: 24rpx;
		font-size: 22rpx;
		color: #666;
		overflow: hidden;
	}

	.cart-view .item .b {
		height: 28rpx;
		line-height: 28rpx;
		font-size: 25rpx;
		color: #333;
		overflow: hidden;
	}

	.cart-view .item .price {
		float: left;
	}

	.cart-view .item .open {
		height: 28rpx;
		width: 150rpx;
		display: block;
		float: right;
		background: url(../../static/image/xia.png) right center no-repeat;
		background-size: 25rpx;
		font-size: 25rpx;
		color: #333;
	}

	.cart-view .item.edit .t {
		display: none;
	}

	.cart-view .item.edit .attr {
		text-align: right;
		background: url(../../static/image/you.png) right center no-repeat;
		padding-right: 25rpx;
		background-size: 12rpx 20rpx;
		margin-bottom: 24rpx;
		height: 39rpx;
		line-height: 39rpx;
		font-size: 24rpx;
		color: #999;
		overflow: hidden;
	}

	.cart-view .item.edit .b {
		display: flex;
		height: 52rpx;
		overflow: hidden;
	}

	.cart-view .item.edit .price {
		line-height: 52rpx;
		height: 52rpx;
		flex: 1;
	}

	.cart-view .item .selnum {
		display: none;
	}

	.cart-view .item.edit .selnum {
		width: 235rpx;
		height: 50rpx;
		border: 1rpx solid #ccc;
		display: flex;
	}

	.selnum .cut {
		width: 70rpx;
		height: 100%;
		text-align: center;
		line-height: 50rpx;
	}

	.selnum .number {
		flex: 1;
		height: 100%;
		text-align: center;
		line-height: 68.75rpx;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		float: left;
	}

	.selnum .add {
		width: 80rpx;
		height: 100%;
		text-align: center;
		line-height: 50rpx;
	}


	.cart-view .group-item .header {
		width: 100%;
		height: 94rpx;
		line-height: 94rpx;
		padding: 0 26rpx;
		border-bottom: 1px solid #f4f4f4;
	}

	.cart-view .promotion .icon {
		display: inline-block;
		height: 24rpx;
		width: 15rpx;
	}

	.cart-view .promotion {
		margin-top: 25.5rpx;
		float: left;
		height: 43rpx;
		width: 480rpx;
		/*margin-right: 84rpx;*/
		line-height: 43rpx;
		font-size: 0;
	}

	.cart-view .promotion .tag {
		border: 1px solid #f48f18;
		height: 37rpx;
		line-height: 31rpx;
		padding: 0 9rpx;
		margin-right: 10rpx;
		color: #f48f18;
		font-size: 24.5rpx;
	}

	.cart-view .promotion .txt {
		height: 43rpx;
		line-height: 43rpx;
		padding-right: 10rpx;
		color: #333;
		font-size: 29rpx;
		overflow: hidden;
	}

	.cart-view .get {
		margin-top: 18rpx;
		float: right;
		height: 58rpx;
		padding-left: 14rpx;
		border-left: 1px solid #d9d9d9;
		line-height: 58rpx;
		font-size: 29rpx;
		color: #333;
	}

	.cart-bottom {
		position: fixed;
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 0;
		/* #endif */
		left: 0;
		height: 100rpx;
		width: 100%;
		background: #fff;
		display: flex;
	}

	.cart-bottom .checkbox {
		height: 34rpx;

		padding-left: 60rpx;
		line-height: 34rpx;
		margin: 33rpx 18rpx 33rpx 26rpx;
		background: url(../../static/image/baiquan.png) no-repeat;
		background-size: 34rpx;
		font-size: 29rpx;
	}

	.cart-bottom .checkbox.checked {
		background: url(../../static/image/hongdui.png) no-repeat;
		background-size: 34rpx;
	}

	.cart-bottom .total {
		height: 34rpx;
		flex: 1;
		margin: 33rpx 10rpx;
		font-size: 29rpx;
	}


	.cart-bottom .delete {
		height: 34rpx;
		width: auto;
		margin: 33rpx 18rpx;
		font-size: 29rpx;
	}

	.cart-bottom .checkout {
		height: 100rpx;
		width: 210rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 29rpx;
		background: #b4282d;
		color: #fff;
	}
</style>
