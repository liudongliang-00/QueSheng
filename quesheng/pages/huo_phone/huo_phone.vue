<template>
	<view>
		<view class="logo_img">
			<image src="../../static/img/logo.png" mode="aspectFill"></image>
		</view>
		<view class="logo_wx">
		<view class="wx_img"></view>
			<button class="btn"  open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" >获取手机号</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			const token = uni.getStorageSync("token")
			if(!token){
				uni.navigateTo({
					url:"../login/login"
				})
			}
		},
		methods: {
			async decryptPhoneNumber(e){
				const token = uni.getStorageSync("token")
				const uid = token.uid
				const session_key = token.session_key
				const encryptedData = e.detail.encryptedData
				const iv = e.detail.iv
				if(iv){
					const res = await this.$myRequest({
						methods:"POST",
						url:"/bdmobile",
						data:{
							uid:uid,
							encryptedData:encryptedData,
							iv:iv,
							session_key:session_key
						}
					})
					const phone = res.data
					uni.setStorage({
						key:"phone",
						data:{
							phone:phone
						},
						success() {
							uni.navigateBack({
								delta:1
							})
						}
					})
				}else{
					uni.showToast({
						title:"用户取消了授权"
					})
				}
			}
		}
	}
</script>

<style>
	.logo_img{
		width: 150rpx;
		height: 150rpx;
		margin: 80rpx auto 0;
	}
	.logo_img image{
		width: 100%;
		height: 100%;
	}
	.logo_wx{
		width: 90%;
		background-color: #3A4FF5;
		position: relative;
		top: 80rpx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		border-radius: 200rpx !important;
	}
	.wx_img{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		top: 24rpx;
		left: 190rpx;
		z-index: 999;
	}
	.wx_img image{
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.wei{
		font-size: 34rpx;
		color: #FFFFFF;
		background-color: #3A4FF5;
		text-align: center;
		margin: 50rpx 0;
	}
	.btn{
	    width: 100%;
		border: none;
		background-color: #3A4FF5;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 100rpx;
		border-radius: 200rpx !important;
	}

</style>
