<template>
	<view>
		<view class="container">
		  <view class="profile-info">
		    <image @click="onUserInfoClick" class="avatar" :src="userInfo.avatar"></image>
		    <view class="info">
		      <text class="name" @click="onUserInfoClick">{{ userInfo.nickname || '点击登录' }}</text>
		    </view>
		    <image @click="onUserInfoClick" class="btn" src="../../static/image/icon/address_right.png"></image>
		  </view>
		
		  <view class="user-menu">
		    <view class="item">
		      <navigator url="/pages/order/order" class="a">
		        <text class="icon order"></text>
		        <text class="txt">我的订单</text>
		      </navigator>
		    </view>
		    <view class="item">
		      <navigator url="url" class="a">
		        <text class="icon coupon"></text>
		        <text class="txt">优惠券</text>
		      </navigator>
		    </view>
		    <view class="item no-border">
		      <navigator url="url" class="a">
		        <text class="icon gift"></text>
		        <text class="txt">礼品卡</text>
		      </navigator>
		    </view>
		    <view class="item">
		      <navigator url="/pages/favorite/favorite" class="a">
		        <text class="icon address"></text>
		        <text class="txt">我的收藏</text>
		      </navigator>
		    </view>
		    <view class="item">
		      <navigator url="url" class="a">
		        <text class="icon security"></text>
		        <text class="txt">我的足迹</text>
		      </navigator>
		    </view>
		    <view class="item no-border">
		      <navigator url="url" class="a">
		        <text class="icon kefu"></text>
		        <text class="txt">会员福利</text>
		      </navigator>
		    </view>
		    <view class="item">
		      <navigator url="url" class="a">
		        <text class="icon address"></text>
		        <text class="txt">地址管理</text>
		      </navigator>
		    </view>
		    <view class="item">
		      <navigator url="url" class="a">
		        <text class="icon security"></text>
		        <text class="txt">账号安全</text>
		      </navigator>
		    </view>
		    <view class="item no-border">
		      <navigator url="url" class="a">
		        <text class="icon kefu"></text>
		        <text class="txt">联系客服</text>
		      </navigator>
		    </view>
		    <view class="item item-bottom">
		      <navigator url="url" class="a">
		        <text class="icon help"></text>
		        <text class="txt">帮助中心</text>
		      </navigator>
		    </view>
		    <view class="item item-bottom">
		      <navigator url="url" class="a">
		        <text class="icon feedback"></text>
		        <text class="txt">意见反馈</text>
		      </navigator>
		    </view>
		  </view>
		</view>
		
		<view class='dialog-login' v-if="showLoginDialog" @click='onCloseLoginDialog'>
		  <view class='dialog-body' catchtap='onDialogBody'>
		    <view class='title'>请选择登录方式</view>
		    <view class='content'>
		      <button type="primary" open-type="getUserInfo" bindgetuserinfo="onWechatLogin">微信登录</button>
		      <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onWechatLogin">手机号登录</button>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				showLoginDialog: false
			}
		},
		created() {
			this.userInfo.avatar = "../../static/image/none-user.png"
		}
	}
</script>

<style>
page{
    height: 100%;
    width: 100%;
    background: #f4f4f4;
}
.container{
    background: #f4f4f4;
    height: auto;
    overflow: hidden;
    width: 100%;
}
.profile-info {
  height: 280rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30.25rpx;
  background: #333;
}

.profile-info .avatar {
  height: 148rpx;
  width: 148rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
}

.profile-info .info {
  flex: 1;
  height: 85rpx;
  margin-left: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-info .name {
  height: 45rpx;
  line-height: 45rpx;
  color: #fff;
  font-size: 37.5rpx;
}

.profile-info .level {
  height: 30rpx;
  line-height: 30rpx;
  margin-top: 10rpx;
  color: #7f7f7f;
  font-size: 30rpx;
}

.profile-info .btn {
  width: 50rpx;
  height: 50rpx;
  margin-left: 10rpx;
  border-radius: 50%;
}

.user-menu{
    width: 100%;
    height: auto;
    overflow: hidden;
    background: #fff;
}

.user-menu .item{
    float: left;
    width: 33%;
    height: 187.5rpx;
    border-right: 1px solid rgba(0,0,0,.15);
    border-bottom: 1px solid rgba(0,0,0,.15);
    text-align: center;
}

.user-menu .item .a{
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-menu .item.no-border {
    border-right: 0;
}

.user-menu .item.item-bottom {
    border-bottom: none;
}

.user-menu .icon{
    margin: 0 auto;
    display: block;
    height: 52.803rpx;
    width: 52.803rpx;
    margin-bottom: 16rpx;
}

.user-menu .icon.order{
    background: url(../../static/image/wyyx-xbt.png) 0 -437.5rpx no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.coupon{
    background: url(../../static/image/wyyx-xbt.png) 0 -62.4997rpx no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.gift{
    background: url(../../static/image/wyyx-xbt.png) 0 -187.5rpx no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.address{
    background: url(../../static/image/wyyx-xbt.png) 0 0 no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.security{
    background: url(../../static/image/wyyx-xbt.png) 0 -500rpx no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.kefu{
    background: url(../../static/image/wyyx-xbt.png) 0 -312.5rpx no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.help{
    background: url(../../static/image/wyyx-xbt.png) 0 -250rpx no-repeat;
    background-size: 52.803rpx;
}

.user-menu .icon.feedback{
    background: url(../../static/image/wyyx-xbt.png) 0 -125rpx no-repeat;
    background-size: 52.803rpx;
}


.user-menu .txt{
    display: block;
    height: 24rpx;
    width: 100%;
    font-size: 24rpx;
    color:#333;
}

.logout{
    margin-top: 50rpx;
    height: 101rpx;
    width: 100%;
    line-height: 101rpx;
    text-align: center;
    background: #fff;
    color: #333;
    font-size: 30rpx;
}


.dialog-login{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
}


.dialog-login .dialog-body{
  width: 540rpx;
  height: auto;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  padding: 40rpx;
}

.dialog-login .dialog-body .title{
  width: 100%;
  text-align: center;
  line-height: 60rpx;
}

.dialog-login .dialog-body .content{
  width: 100%;
}

.dialog-login .dialog-body button{
  margin-top: 30rpx;
}
</style>
