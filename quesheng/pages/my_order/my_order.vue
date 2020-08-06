<template>
	<view>
		<view class="dingan" v-show="ding">
			
		</view>
		<view class="make_room" v-for="item in ongoing_info" :key="item.id"  >
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
					    <text>已用时长:</text>
					    <text>{{item.use_time}}</text>
					</view>
					<view class="huous_hao">
					    <text>消费金额:</text>
					    <text>{{item.use_money}}</text>
					</view>
					
			        <view class="huous_hao">
				        <text>地址:</text>
				        <text>{{item.address}}</text>
			        </view>
		        </view>
		    </view>
			<view class="order_dasao" dasao>
				<view class="">
					
				</view>
				<view :class="[this.code == 1? 'da':'dasao']" @click="daSao(item.id)">
					打扫房间
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ongoing_info:'',
				roles:'',
				ding:false
			}
		},
		onLoad(e) {
			this.roles = e.id
			this.orderIndex()
		},
		methods: {
			async orderIndex(uid){
				uni.showLoading({})
				const that = this
				var tokes = uni.getStorageSync("token")
				var uid = tokes.uid
				const res = await this.$myRequest({
					method:"POST",
					url:"/selOrder?roles=" + that.roles
				})
				uni.hideLoading()
				if(res.data.data == ""){
					that.ding = true
				}else{
					that.ding = false
					that.ongoing_info = res.data.data
				}
			},
			async daSao(oid){
				const oids = oid
				const that = this
				uni.showModal({
					title:"确定打扫房间吗?",
					success(res) {
						if(res.confirm){
							that.daIndex(oids)
							uni.hideLoading()
						}else if(res.cancel){
							uni.hideLoading()
						}
					}
				})
			},
			async daIndex(oid){
				const that = this
				uni.showLoading({})
				const res = await this.$myRequest({
					method:"POST",
					url:"/clearHouse?oid=" + oid
				})
				uni.hideLoading()
				that.code = res.data.code
				if(that.code == 1){
					uni.showToast({
						title:"该房间已打扫"
					})
					setTimeout(()=>{
						uni.switchTab({
							url:"../ourselves/ourselves"
						})
					},2000)
				}else{
					uni.showToast({
						title:"请联系客服"
					})
				}
			}
	}
}
		
	
</script>

<style>
	.dingan{
		width: 400rpx;
		height: 400rpx;
	    background: url(../../static/img/nodata.png) no-repeat;
		background-size: 400rpx;
		margin: 100rpx auto;
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
	.da{
		background-color: #666666 !important;
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
	.order_dasao{
		width: 630rpx;
		margin: 20rpx auto 0;
		padding-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.dasao{
		width: 150rpx;
		height: 60rpx;
		background-color: #485AEA;
		border-radius: 30rpx;
		font-size: 28rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 60rpx;
	}
</style>
