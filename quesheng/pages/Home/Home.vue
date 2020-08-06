<template>
	<view class="">
		<view class="head_img">
			<view class="header">
				<view class="head_area" >
					<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :range="area_info" range-key="name" >
						<view class="uni-input sel-input">{{area_name}}</view>
				    </picker>
					<text class="iconfont icon-xia ico_xia"></text>
					</view>
				</view>
				<view class="head_input">
					<text class="iconfont icon-sousuo sou" @click="postIndex"></text>
					<input type="text"  placeholder="请输入门店名称"  confirm-type="search" @input="sousuos" :value="input_value"/>
				</view>
			</view>
		</view>
		<view class="particulars" >
			<view class="particulars_content" v-for="item in indexInfo" :key="item.id" @click="particulars(item.id,item.x,item.y)">
				<view class="content_img">
					<image :src="item.door_photos" mode="aspectFill" lazy-load=true></image>
					<view class="content_house">{{item.ishave==1 ? "有房":"无房"}}</view>
				</view>
				<view class="content">
					<text class="content_title">{{item.shopname}}</text>
					<view class="content_middle">
						<text class="middle1">￥</text>
						<text class="middle2">{{item.mini_price}}</text>
						<text class="middle1 middle3">/小时</text>
						起
				    </view>
					<view class="content_footer">
						<text class="footer1">{{item.address}}</text>
						<text>|&nbsp;&nbsp;{{item.distance}}km</text>
					</view>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	import QQMapWX from "../../utils/qqmap-wx-jssdk.js"
	var qqmapsdk = new QQMapWX({
		key:"4J4BZ-UZ2L6-3VFSM-ES6KI-V434E-IQF7C"
	})
	export default {
		data() {
			return {
				addRessName:"",
				latitude:"",
				longitude:"",
				indexInfo:[],
				indexImg:'',
				area_info:[{'id':0,'name':'全部区域'}],
				index:0,
				area_id:0,
				page:1,
				pagesize:10,
				input_value:"",
				area_name:"全部区域"
			}
		},
		onLoad() {
		},
		onShareAppMessage( options ){
		  　　var that = this;
		  　　// 设置菜单中的转发按钮触发转发事件时的转发内容
		  　　var shareObj = {
		  　　　　title: "雀胜",        // 默认是小程序的名称(可以写slogan等)
		  　　　　path: '/pages/Home/Home',// 默认是当前页面，必须是以‘/’开头的完整路径
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
		  　　// 返回shareObj
		  　　return shareObj;
		  },
		onPullDownRefresh() {
		      this.refresh()
		    },
		onReachBottom() {
			this.shangLa()
		},
		onShow() {
			this.dingWei()
		},
		methods: {
		    async postIndex(pages){
				uni.showLoading({})
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/indexInfo",
					data:{
						lat:that.latitude,
						lng:that.longitude,
						area_id:that.area_id,
						page:pages,
						keys:that.input_value
					}
				})				
				uni.hideLoading()
				uni.stopPullDownRefresh()
				that.indexInfo = res.data.data,
				that.area_info = res.data.area_info
			},
			particulars (id,x,y){
				const token = uni.getStorageSync("token")
				if(!token){
					uni.navigateTo({
						url:"../login/login"
					})
				}else{
					uni.showLoading({})
					uni.navigateTo({
						url:"../hotel_particulars/hotel_particulars?id=" + id +"&x=" + x + "&y=" + y
					})
					uni.hideLoading()
				}
			},
			bindPickerChange: function(e) {
				this.area_id = this.area_info[e.detail.value].id;
				this.area_name = this.area_info[e.detail.value].name;
				this.postIndex(1);
			},
			shangLa(){
				const that = this;
				uni.showLoading({
					title:"正在加载..."
				})
				var pages = that.page+1
				that.page = pages
				that.postIndex(that.page)
			},
			sousuos(event){
				this.input_value = event.target.value
				//this.postIndex(1)
			},
			refresh(){
				setTimeout(()=>{
					if(this.longitude == "" || this.latitude == ""){
					       this.dingWei()	
						   return
					}
					this.postIndex()					
					uni.stopPullDownRefresh()
				},2000)
			},
			dingWei(){
				const that = this
				uni.getLocation({
				    type: 'gcj02',
					geocode:true,
				    success:(res)=>{
						that.longitude = res.longitude,
						that.latitude = res.latitude
						that.postIndex(1)
						qqmapsdk.reverseGeocoder({
								location:{
									latitude:res.latitude,
									longitude:res.longitude,
								},
								success:(res)=>{
									var RES = JSON.parse(JSON.stringify(res))
									that.addRessName = res.result.ad_info.districtarea_info
									//that.postIndex(1)
								},
								fail:function(res){
								}
						})
				    },
					fail:()=>{
						uni.showModal({
				          title: '警告',
				          content: '您点击了拒绝授权,将无法正常地理位置信息,点击确定重新获取授权。并打开手机定位',
				          success: function (res) {
							if (res.confirm) {
							  uni.openSetting({
								success: function (datas) {
								  if (datas.authSetting["scope.userLocation"]) {
									uni.getLocation({
									  success: function (res) {										
										that.longitude = res.longitude,
										that.latitude = res.latitude
										that.postIndex(1)
										qqmapsdk.reverseGeocoder({
											location:{
												latitude:res.latitude,
												longitude:res.longitude,
											},
											success:(res)=>{
												var RES = JSON.parse(JSON.stringify(res))
												that.addRessName = res.result.ad_info.districtarea_info
												//that.postIndex(1)
											},
											fail:function(res){
											}
										})
									  }
									})
								  } 
								  else {
									that.dingWei();
								  }
								}
							  })
							} else {
							  that.dingWei();
							}
						  }
					   })
						
					},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
	.uni-list-cell-db{
		display: flex;
	}
	picker{
		display: flex;
	}
	.toLoad{
		font-size: 36rpx;
		color: #333333;
		text-align: center;
	}
	.head_img{
	    width: 100%;
		height: 160rpx;
		background: url(../../static/img/bj.png);
		position: fixed;
		z-index: 9999;
	}
	.header{
		display: flex;
		width: 90%;
		justify-content: space-between;
		padding: 0 20rpx;
		position: fixed;
		top:50rpx
	}
	.head_area{
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 65rpx;
		display: flex;
	}
	.area_img{
		width: 60rpx;
		height: 60rpx;
	}
	.ico_xia{
		margin-left: 10rpx;
		font-size: 32rpx;
	}
	.head_input{
		display: flex;
		width: 490rpx;
		height: 65rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.sou{
		line-height: 65rpx;
		margin-left: 30rpx;
	}
    input{
		height: 100%;
		border-radius: 20rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
	}
	.particulars{
		position: relative;
		top: 180rpx;
	}
	.particulars_content{
		width: 690rpx;
		height: 190rpx;
		background-color: rgba(255,255,255,1);
		border-radius:20rpx;
		margin: 0 auto 30rpx;
		display: flex;
	}
	.content_img{
		width: 150rpx;
		height: 150rpx;
		position: relative;
		top:20rpx;
		left: 20rpx;
	}
    .content_img image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.content_house{
		position: absolute;
		top: 0;
		color: #FFFFFF;
		background-color: #333333;
		opacity: 0.5;
		font-size: 24rpx;
		width: 70rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 10rpx 0 0 0;
	}
	.content{
		margin-left: 40rpx;
	}
	.content_title{
		display: block;
		color: #333333;
		font-size: 32rpx;
		padding: 15rpx 0 0 0;
	}
	.content_middle{
		padding: 15rpx 0 ;
		font-size: 30rpx;
		color: #333333;
	}
	.middle1{
		color: #F03232;
	}
	.middle2{
		font-size: 40rpx;
		color: #F03232;
	}
	.middle3{
		margin-right: 20rpx;
	}
	.content_footer{
		font-size:24rpx ;
		color: #333333;
		display: flex;
		justify-content: space-between;
	}
	.footer1{
		display: block;
		width: 340rpx;
		padding-right: 30rpx;
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换行
	}
	.mask_layer{
		width: 100%;
		height: 100%;
		background-color: #555555;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		opacity: 0.5;
		display: none;
	}
	.regioselectivity{
		position: absolute;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 9999;
		width: 100%;
		height:500rpx;
		border-radius: 20rpx 20rpx 0 0;
		display: none;
	}
	.regioselectivity view{
		width: 90%;
		line-height: 100rpx;
		text-align: center;
		border-bottom: 2rpx solid #E8E8E8;
		margin: 0 auto;
	}
	.regioselectivity view:last-child{
		border-bottom: none;
	}
</style>
