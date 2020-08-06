<template>
	<view>
		<view class="my_title" >
			<view class="title_img" >
				<image :src="avatarUrl" mode="aspectFill"></image>
			</view>
			<view class="title_xi">
				<text class="xi_yong" @click="myMessage">{{name}}</text>
				<text class="xi_shou" @click="myPhone">{{phon}}</text>
			</view>
		</view>
		<view class="footer_center footer_ding"  @click="ma_order" v-show="role">
		    <view class="center_img">
				<image src="../../static/img/wdingdan.png" mode=""></image>
			</view>
			<view class="center_bo">
				<text>房间打扫</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
		<view class="my_footer">
			<view class="footer_center" @click="xiaoxi">
			    <view class="center_img">
					<image src="../../static/img/xiaoxi.png" mode=""></image>
				</view>
				<view class="center_bo">
					<text>我的消息</text>
					<text class="iconfont icon-you"></text>
				</view>
			</view>
			<view class="footer_center" @click="kefu">
			    <view class="center_img">
					<image src="../../static/img/kefu.png" mode=""></image>
				</view>
				<view class="center_bo">
					<text>联系客服</text>
					<text class="iconfont icon-you"></text>
				</view>
			</view>
		<view class="footer_center" @click="about">
		    <view class="center_img">
				<image src="../../static/img/guanyu.png" mode=""></image>
			</view>
			<view class="center_bo">
				<text>关于我们</text>
				<text class="iconfont icon-you"></text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'请点击登录',
				avatarUrl:'',
				phon:"手机号未绑定",
				phone_dian:"",
				roles:"",
				role:false
			}
		},
		onLoad() {
			this.addOusrs()
			const message = uni.getStorageSync("coken")
			this.name = message.nick
			this.avatarUrl = message.avatarUrl
			this.conIndex()
		},
		onShareAppMessage( options ){
		  　　var that = this;
		  　　// 设置菜单中的转发按钮触发转发事件时的转发内容
		  　　var shareObj = {
		  　　　　title: "雀胜",        // 默认是小程序的名称(可以写slogan等)
		  　　　　path: '/pages/ourselves/ourselves',        // 默认是当前页面，必须是以‘/’开头的完整路径
		  　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		  　　　　success: function(res){
		  　　　　　　// 转发成功之后的回调
		  　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
		  　　　　　　}
		  　　　　},
		  　　　　fail: function(){
		  　　　　　　// 转发失败之后的回调
		  　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
		  　　　　　　　　// 用户取消转发
		  　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
		  　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
		  　　　　　　}
		  　　　　}
		  　　};
		  　　return shareObj;
		  },
		onPullDownRefresh() {
		    this.refresh()
		    },
		onShow() {
			const message = uni.getStorageSync("coken")
			this.name = message.nick
			this.avatarUrl = message.avatarUrl
		    this.shouJi()
			// this.addOusrs()
			this.conIndex()
		},
		methods: {
			about(){
				uni.navigateTo({
					url:"../about_my/about_my"
				})
			},
			kefu(){
				uni.makePhoneCall({
					phoneNumber:this.phone_dian
				})
			},
			xiaoxi(){
				uni.navigateTo({
					url:"../my_news/my_news"
				})
			},
			addOusrs(){
			    const token = uni.getStorageSync("token")
				if(!token) {
					uni.navigateTo({
						url:"../login/login"
					})
				}
			},
			addPhone(){
				const phone = uni.getStorageSync("phone")
				if(!phone){
					uni.navigateTo({
						url:"../huo_phone/huo_phone"
					})
				}
			},
		    async conIndex(id){
		        const that = this
		            const token = uni.getStorageSync("token")
		                if(token != '') {
		                    that.uid = token.uid
		                }
		            const res = await this.$myRequest({
		                method:"POST",
		                url:"/getphone",
		                data:{
		                    uid:that.uid
		                }
		            })
					that.phone_dian = res.data.data.phone
		            if(res.data.data.userinfo != null){
						that.roles = res.data.data.userinfo.roles
						if(that.roles == 0){
							that.role = false
						}else{
							that.role = true
						}
					}
		        },
			async shouJi(){
				const that = this
				const token = uni.getStorageSync("token")
				const uid = token.uid
				const res = await this.$myRequest({
					method:"POST",
					url:"/checkMobile",
					data:{
						uid:uid
					},
				})
				if(res.data.code == 1){
					that.phon = res.data.data
				}
			},
			refresh(){
				setTimeout(()=>{
					this.postIndex()
					uni.stopPullDownRefresh()
				},1000)
			},
			ma_order(id){
				uni.navigateTo({
					url:"../my_order/my_order?id=" + this.roles
				})
			},
			myMessage(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			myPhone(){
				uni.navigateTo({
					url:"../huo_phone/huo_phone"
				})
			}
		}
	}
</script>

<style>
.my_title{
	width: 100%;
	height: 213rpx;
	background: url(../../static/img/bj.png);
	background-size: 100%;
	display: flex;
}
.title_img{
	width: 132rpx;
	height: 132rpx;
	margin: 30rpx 0 0 30rpx;
	border-radius: 50%;
}
.title_img image{
	border-radius: 50%;
}
.title_xi {
	padding: 40rpx 20rpx;
}
image{
	width: 100%;
	height: 100%;
}
.xi_yong{
	font-size: 36rpx;
	color: #FFFFFF;
}
.xi_shou{
	display: block;
	color: #3A4FF5;
	background-color: #FFFFFF;
	font-size: 24rpx;
	padding: 5rpx 10rpx;
	border-radius:20rpx;
	margin-top: 20rpx;
	width: 180rpx !important;
	text-align: center;
}
.my_footer{
	margin-top: 26rpx;
	background-color: #FFFFFF;
}
.footer_ding{
	border-bottom: none !important;
}
.footer_center{
	display: flex;
	border-bottom: 2rpx solid #E8E8E8;
	padding: 0 20rpx;
	background-color: #FFFFFF;
}
.footer_center:last-child{
	border-bottom: none;
}
.center_img{
	width: 42rpx;
	height: 42rpx;
	margin-top: 20rpx;
}
.center_bo{
	width: 100%;
	display: flex;
	justify-content: space-between;
	line-height: 80rpx;
}
.center_bo text:first-child{
font-size: 32rpx;
	color: #333333;
	margin-left: 20rpx;
}
</style>
