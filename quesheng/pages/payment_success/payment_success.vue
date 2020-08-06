<template>
	<view>
		<view class="success_img">
			<image src="../../static/img/chenggong.png" mode="aspectFill"></image>
		</view>
		<view class="success_ceter">
			<text class="success_ceter_title">支付成功</text>
			<text class="success_ceter_footer">感谢光临，祝您入住愉快</text>
		</view>
		<view class="success_cfooter" @click="dingDan">
			查看订单
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			dingDan(){
				uni.switchTab({
					url:"../order/order"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.success_img{
		width: 140rpx;
		height: 140rpx;
		margin: 50rpx auto 20rpx;
	}
	.success_img image{
		width: 100%;
		height: 100%;
	}
	.success_ceter_title{
		display: block;
		text-align: center;
		font-size: 36rpx;
		line-height: 60rpx;
		color: #333333;
	}
	.success_ceter_footer{
		display: block;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #999999;
	}
.success_cfooter{
	width: 90%;
	margin: 0 auto;
	background-color: #485AEA;
	color: #FFFFFF;
	text-align: center;
	line-height: 80rpx;
	border-radius: 50rpx;
	margin-top: 50rpx;
	font-size: 36rpx;
	
}
</style>
