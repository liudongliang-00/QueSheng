<template>
	<view>
		<view class="logo_img">
			<image src="../../static/img/logo.png" mode="aspectFill"></image>
		</view>
		<view class="que">
			雀胜
		</view>
		<view class="logo_titl">
			智能预定  自动结算
		</view>
			<view class="logo_wx">
			<view class="wx_img">
				<image src="../../static/img/wei.png" mode=""></image>
			</view>
				<button class="btn" open-type="getUserInfo" @getuserinfo="WxgetUserInfo">微信登录</button>
			</view>
	</view>
</template>

<script>
	import {wxLoing} from "../../utils/login.js"
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			async WxgetUserInfo(e){
				const {encryptedData,rawData,iv,signature} = e.detail
				const ivs = iv 
				if(ivs){
					const {code }= await wxLoing()
					const rawDatas = JSON.parse(rawData)
					const nick = rawDatas.nickName
					const sex = rawDatas.gender
					const avaurl = rawDatas.avatarUrl
                    const session_key = rawDatas.session_key
					uni.setStorage({
						key:"coken",
						data:{
							sex:sex,
							nick:nick,
							avatarUrl:avaurl,
							session_key:session_key
						}
					})
					const res = await this.$myRequest({
						method:"POST",
						url:"/zhuce",
						data:{
							code:code,
							nick:nick,
							sex:sex,
							avaurl:avaurl
						},
					})
					const openid = res.data
				    uni.setStorage({
				    	key:"token",
						data:openid,
						success: (res) => {
							uni.navigateBack({
								delta:1
							})
						},
						fail: () => {
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
	.que{
		text-align: center;
		font-size: 36rpx;
		margin: 20rpx 0;
	}
	page{
		background-color: #FFFFFF;
	}
	.logo_img{
		width: 150rpx;
		height: 150rpx;
		margin: 80rpx auto 0;
	}
	.logo_img image{
		width: 100%;
		height: 100%;
	}
	.logo_titl{
		text-align: center;
		font-size: 32rpx;
		color: #999999;
		margin-top: 30rpx;
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
