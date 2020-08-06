<template>
	<view>
		<view class="slideshow">
			<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="2000" :duration="600" indicator-active-color="#ffffff">
				<swiper-item v-for="item in slideshow" :key="item.id">
					<view class="swiper-item">
						<image :src= "item.img_path" mode="aspectFill" lazy-load=true></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="particulars_content">
			<view class="content_title">
				<text>{{shopname}}</text>
				<text class="title_right" v-if="code">{{ishave == 1 ? "有房":"无房" }}</text>
			</view>
			<view class="content_middle">
				<text class="middle1">￥</text>
				<text class="middle2">{{mini_price}}</text>
				<text class="middle1 middle3">/小时</text>
				起
			</view>
			<view class="content_dian">
				<view class="dian_img">
					<image src="../../static/img/shijian.png" mode=""></image>
				</view>
				<view class="dian_center">
					<text>营业时间:</text>
					<text>{{ytime}}</text>
				</view>
			</view>
			<view class="content_dian">
				<view class="dian_img">
					<image src="../../static/img/dianhua.png" mode=""></image>
				</view>
				<view class="dian_center center_img" @click="phones">
					<text>联系电话:</text>
					<text>{{phone}}</text>
				</view>
			</view>
			<view class="content_dian">
				<view class="dian_img">
					<image src="../../static/img/weizhi.png" mode=""></image>
				</view>
				<view class="dian_center center_img center_bo" @click="addressName">
					<text>{{address}}</text>
				</view>
			</view>
		</view>
		<view class="room">
			<view class="room_title">
				<text   @click="roomIndex=0" :class="[roomIndex==0?'room_coom':'']">全部房间</text>
				<text  @click="roomIndex=1" :class="[roomIndex==1?'room_coom':'']">可预订</text>
			</view>
			<view class="room_center" v-show="roomIndex==0">
				<view class="room_center_title" v-for="item in house_info" :key="item.id" >
					<view class="center_title_img">
						<view class="title_img">
							<image src="../../static/img/fangjian.png" mode=""></image>
						</view>
						<text>房号</text>
						<text>{{item.h_name}}</text>
					</view>
					<text class="title_num">￥{{item.price}}/小时</text>
					<text class="title_record"  @click="reserve(item)" :class="[item.status == 0?'title_record':'title_records']">{{item.status == 0? '预定':item.status==1 ?"已入住":"待打扫"}}</text>
				</view>
			</view>
			<view class="room_center"  v-show="roomIndex==1">
 				<view class="room_center_title" v-for="item in allow_order_house" :key="item.id">
					<view class="center_title_img">
						<view class="title_img">
							<image src="../../static/img/fangjian.png" mode=""></image>
						</view>
						<text>房号</text>
						<text>{{item.h_name}}</text>
					</view>
					<text class="title_num">￥{{item.price}}/小时</text>
					<text class="title_record"   @click="reserve(item)" >{{item.status== 0 ?"预定":""}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomIndex:0,
				address:"",
				shopname:"",
				mini_price:"",
				ytime:"",
				phone:"",
				ishave:"",
				slideshow:"",
				house_info:'',
				allow_order_house:"",
				lat:"",
				long:'',
				code:'',
				sid:''
			}
		},
		onLoad(e) {
			var sid = e.id
			this.long = e.x
			this.lat = e.y
			this.sid = sid
			this.hotelHouse(sid)
			this.shouJi()
		},
		onShow() {
			this.shouJi()
		},
		onPullDownRefresh() {
		    this.refresh()
		},
		methods: {
			async hotelHouse(id){
				uni.showLoading({})
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/houseDetail?sid="+ id
				})
				uni.hideLoading()
				that.address = res.data.shop_info.address
				that.shopname = res.data.shop_info.shopname
				that.mini_price = res.data.shop_info.mini_price
				that.ytime = res.data.shop_info.ytime
				that.ishave = res.data.shop_info.ishave
			    that.phone = res.data.shop_info.phone
				that.slideshow =  res.data.door_photos
				that.house_info = res.data.house_info
				that.allow_order_house = res.data.allow_order_house
			},
			reserve(e){
				const code = this.code
				const token = uni.getStorageSync("token")
				const phone = uni.getStorageSync("phone")
				const id = e.id
				const status = e.status
				if(!token){
					uni.navigateTo({
						url:"../login/login"
					})
					return
				}
				else if(code ==0){
					uni.navigateTo({
						url:"../huo_phone/huo_phone"
					})
				}
				else if(status == 0){
					uni.navigateTo({
						url:"../make_room_reservation/make_room_reservation?id=" +id
					})
				}else{
					uni.showToast({
						title:"该房间暂未开放"
					})
				}
			},
			phones(){
				uni.makePhoneCall({
					phoneNumber:this.phone
				})
			},
			addressName(){
				const address = this.address
				const  lat= parseFloat(this.lat)
				const  long= parseFloat(this.long)
				uni.openLocation({
					latitude:lat,
					longitude:long,
					scale: 18,
					name:address
				})
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
				that.code = res.data.code
			},
			refresh(){
				setTimeout(()=>{
					this.hotelHouse(this.sid)
					uni.stopPullDownRefresh()
				},2000)
			}
		}
	}
</script>

<style>
	.slideshow{
		width: 100%;
		height:375rpx ;
	}
    swiper{
		width: 100%;
		height: 100%;
	}
    .clickindex{
		pointer-events: none;
	}
    image{
		width: 100%;
		height: 100%;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
	}
	.particulars_content{
		width: 690rpx;
		position: relative;
		top: -16rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.content_title{
		font-size: 36rpx;
		color:rgba(51,51,51,1);
		line-height: 100rpx;
		padding:  0 20rpx;
		display: flex;
	}
	.title_right{
		display: block;
		width: 70rpx;
		height: 40rpx;
		background-color: rgba(58,79,245,0.1);
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		margin: 30rpx;
		color: #3A4FF5;
		border-radius: 5rpx;
	}
	.content_middle{
		padding:0 20rpx;
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
	.content_dian{
		padding: 0 20rpx;
		display: flex;
	}
	.dian_img{
		width: 32rpx;
		height: 32rpx;
		margin-top: 22rpx;
	}
	.dian_center{
		display: flex;
		font-size: 30rpx;
		color: #333333;
		line-height: 80rpx;
		border-bottom: 2rpx solid #E8E8E8;
		width: 100%;
	}
	.dian_center text{
		margin-left: 20rpx;
	}
	.center_img{
		background:  url(../../static/img/you.png) no-repeat right ;
		background-size: 35rpx;
	}
	.center_bo{
		border-bottom: none;
	}
	.center_bo text{
		width:530rpx;
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换行
	}
	.room{
		width: 690rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.room_title{
		display: flex;
		justify-content: space-between;
	}
	.room_title text{
		width: 50%;
		text-align: center;
		color: #666666;
		font-size: 32rpx;
		line-height: 80rpx;
		border-bottom: 2rpx solid #E8E8E8;
	}
	.room_coom{
		color: #333333 !important;
		border-bottom: 2rpx solid #3A4FF5 !important;
	}
	.roo_reserve{
		display: none;
	}
	.room_center_title{
		display: flex;
		justify-content: space-around;
		border-bottom: 2rpx solid #E8E8E8;
	}
	.room_center_title:last-child{
		border-bottom: none;
		}
	.center_title_img{
		display: flex;
	}
	.center_title_img text{
		margin-left:26rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #333333;
	}
	.title_img{
		width: 38rpx;
		height: 38rpx;
		margin-top: 30rpx;
	}
	.title_record{
		display: block;
		width: 110rpx;
		height: 55rpx;
		background-color: #3A4FF5;
		margin-top: 25rpx;
		line-height: 55rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
	.title_records{
		display: block;
		width: 110rpx;
		height: 55rpx;
		background-color: #DDDDDD;
		margin-top: 25rpx;
		line-height: 55rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
	.title_recordd{
		display: block;
		width: 110rpx;
		height: 55rpx;
		background-color: #DDDDDD;
		margin-top: 25rpx;
		line-height: 55rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
	}
	.title_num{
		line-height: 100rpx;
		font-size: 30rpx;
		color: #F03232;
	}
	.record{
		background-color: #DDDDDD !important;
	}
</style>
