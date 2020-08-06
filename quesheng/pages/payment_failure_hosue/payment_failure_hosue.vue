<template>
	<view>
		<view class="success_img">
			<image src="../../static/img/shibai.png" mode="aspectFill"></image>
		</view>
		<view class="success_ceter">
			<text class="success_ceter_title">退房失败</text>
		</view>
		<view class="success_cfooter" @click="fanHui">
			返回
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.payIndex()
		},
		methods: {
			fanHui(){
				uni.navigateBack({
					delta: 1
				});
			},
			async payIndex (){
					const that = this
					const res = await this.$myRequest({
						method:"POST",
						url:"/cancel",
						data:{
							sn:that.id
						}
					})
			},
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
