<template>
	<view>
		<view class="order_tabber">
			<view class="tabber_title">
			    <text   @click="roomIndex=0" :class="[roomIndex==0?'room_coom':'']">进行中</text>
			    <text  @click="roomIndex=1" :class="[roomIndex==1?'room_coom':'']">已完成</text>
			</view>
			<view class="make_room" v-show="roomIndex == 0" v-for="item in ongoing_info" :key="item.id" >
			    <text class="make_title">{{item.shopname}}</text>
			    <view class="make_center">
				    <view class="make_img">
						<image :src="item.door_photos" mode="aspectFill" lazy-load="true" ></image>
					</view>
				    <view class="make_huose">
				        <view class="huous_hao">
					        <text>房号:</text>
					        <text class="huous_title">{{item.house_name}}</text>
				        </view>
						<view class="huous_hao">
						    <text>总价:</text>
						    <text >{{item.cash}}</text>
						</view>
						<view class="huous_hao">
						    <text>开始时间:</text>
						    <text>{{item.pay_time}}</text>
						</view>
						<view class="huous_hao">
						    <text>剩余时长:</text>
						    <text>{{item.sy_time}}</text>
						</view>
						
				        <view class="huous_hao">
					        <text>地址:</text>
					        <text>{{item.address}}</text>
				        </view>
			        </view>
			    </view>
			    <view class="oreder_title">
					<view class="" @click="quitIndex(item.id)">退房退款</view>
					<view class="" @click="continueIndex(item.id)">续费</view>
					<view class="kaisuo" @click="kaiSuo(item.id)">开锁</view>
			    </view>
			</view>
			<view class="make_rooms" v-show="roomIndex == 1" v-for="item in wc_order" :key="item.id" >
			    <text class="make_title">{{item.shopname}}</text>
			    <view class="make_center order_comm">
				    <view class="make_img">
						<image :src="item.door_photos" mode="aspectFill"></image>
					</view>
				    <view class="make_huose">
				        <view class="huous_hao">
					        <text>房号:</text>
					        <text class="huous_title">{{item.house_name}}</text>
				        </view>
				        <view class="huous_hao">
					        <text>总价:</text>
					        <text>￥{{item.cash}}</text>
				        </view>
						<view class="huous_hao">
						    <text>已用时长:</text>
						    <text>{{item.use_time}}</text>
						</view>
						<view class="huous_hao">
						    <text>消费金额:</text>
						    <text class="order_coomm">{{item.use_money}}</text>
						</view>
				        <view class="huous_hao" >
					        <text>地址:</text>
					        <text>{{item.address}}</text>
				        </view>
			        </view>
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
				ongoing_info:'',
				wc_order:""
			}
		},
		onLoad(e) {
			var tokes = uni.getStorageSync("token")
			var uid = tokes.uid
			this.addree()
		},
		onPullDownRefresh() {
		    this.refresh()
		},
		onShow() {
			this.orderIndex()
			// this.addree()
		},
		methods: {
			async orderIndex(uid){
				uni.showLoading({})
				const that = this
				var tokes = uni.getStorageSync("token")
				var uid = tokes.uid
				const res = await this.$myRequest({
					method:"POST",
					url:"/orders?uid=" + uid
				})
				uni.hideLoading()
			    that.ongoing_info = res.data.data.ongoing_info
				that.wc_order = res.data.data.wc_order
			},
			quitIndex(id){
				uni.navigateTo({
					url:"../drawback/drawback?id=" + id
				})
		    },
			continueIndex(id){
				uni.navigateTo({
					url:"../continue_pay_dues/continue_pay_dues?id="+ id
				})
			},
			addree(){
			    const token = uni.getStorageSync("token")
				uni.showLoading({})
				if(!token){
					uni.navigateTo({
						url:"../login/login"
					})
					return
				}
				uni.hideLoading()
			},
			refresh(){
				setTimeout(()=>{
					this.orderIndex()
					uni.stopPullDownRefresh()
				},2000)
			},
			kaiSuo(id){
				const oid = id
				const that = this
				uni.showModal({
					title:"确定开锁吗",
					success(res) {
						if(res.confirm){
							that.kaiSuoIndex(oid)
						}else{
							
						}
					}
				})
			},
			async kaiSuoIndex(id){
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/openLock",
					data:{
						oid:id
					}
				})
				uni.showToast({
					title:res.data.msg
				}) 
			}
		}
	}
</script>

<style>
	.tabber_title{
		display: flex;
	 width: 100%;	
	 background-color: #FFFFFF;
    }
	.kaisuo{
		background-color: #3A4FF5;
		color: #FFFFFF !important;
		border: none !important;
	}
	.tabber_title text{
		display: block;
	    width: 50%;
		text-align: center;
		line-height: 100rpx;
		border-bottom: 2rpx solid #E8E8E8;
		font-size: 32rpx;
		color: #666666;
	}
	.room_coom{
		color: #333333 !important;
		border-bottom: 2rpx solid #3A4FF5 !important;
	}
	.make_room{	
	  background-color: #FFFFFF;
	  width: 690rpx;
	  margin: 20rpx auto 0;
	  border-radius: 20rpx;
	}
	
	.make_title{
		display: block;
		width: 630rpx;
		margin: 0 auto;
		border-bottom: 2rpx solid #E8E8E8;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #333333;
	}
	.make_rooms{
		background-color: #FFFFFF;
		width:690rpx;
		margin: 20rpx auto 0;
		border-radius: 20rpx;
	}
	.make_center{
		display: flex;
	     width: 630rpx;
		 margin: 0 auto ;
		 border-bottom: 2rpx solid #E8E8E8;
		 padding: 0 0 20rpx 0;
	}
	.make_img{
		width: 130rpx;
		height: 130rpx;
		margin: 30rpx 20rpx 30rpx 0;
	}
	.make_huose{
		width: 470rpx;
		margin-top: 26rpx;
	}
	.huous_hao{
		font-size: 28rpx;
		color: #333333;
		line-height: 46rpx;
		display: flex;
	}
	.huous_hao text:last-child{
		display: block;
		width: 320rpx;
		margin-left: 30rpx;
		overflow:hidden; //超出的文本隐藏
		text-overflow:ellipsis; //溢出用省略号显示
		white-space:nowrap; //溢出不换行
	}
	.huous_title{
		color: #485AEA;
	}
	.oreder_title{
		margin: 0 20rpx;
		display: flex;
		justify-content: space-around;
	}
	.oreder_title view{
		width: 150rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #333333;
		border: 2rpx solid #CCCCCC;
		font-size: 28rpx;
		border-radius: 30rpx;
		margin: 30rpx 0;
	}
	.order_comm{
		border-bottom: none !important;
		padding-bottom: 30rpx;
	}
	.order_coomm{
		color: #F03232 !important;
	}
	image{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>
