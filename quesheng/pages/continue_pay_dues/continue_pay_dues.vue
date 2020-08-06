<template>
	<view>
		<view class="make_room">
		    <text class="make_title">{{shopname}}</text>
		    <view class="make_center">
			    <view class="make_img">
					<image :src="door_photos" mode="aspectFill"></image>
				</view>
			    <view class="make_huose">
			        <view class="huous_hao">
				        <text>房号:</text>
				        <text class="huous_title">{{house_name}}</text>
			        </view>
			        <view class="huous_hao">
				        <text>价格:</text>
				        <text>￥{{house_price}}/小时</text>
			        </view>
			        <view class="huous_hao">
				        <text>地址:</text>
				        <text>{{address}}</text>
			        </view>
		        </view>
		    </view>
		</view>
		<view class="make_footer">
			<view class="footer_center">
				<text>预定时长</text>
				<text>{{times}}</text>
			</view>
			<view class="footer_center">
				<text>订单总价</text>
				<text class="jiaqian">￥{{total_fee}}</text>
			</view>
		</view>
		<view class="make_zhifu" @click="xuPay" >
			支付
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address:'',
				shopname:"",
				house_name:"",
				house_price:"",
				times:"",
				total_fee:"",
				door_photos:'',
				uid:''
			}
		},
		onLoad(e) {
			var oid = e.id
			this.uid = e.id
			this.conIndex(oid)
		},
		methods: {
			async conIndex(id){
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/renew?oid="+id
				})
				that.address = res.data.data.address
				that.shopname = res.data.data.shopname
				that.house_name = res.data.data.house_name
				that.house_price = res.data.data.house_price
				that.times = res.data.data.times
				that.total_fee = res.data.data.total_fee
				that.door_photos = res.data.data.door_photos
			},
			zhifu(info){			
				uni.requestPayment({
					provider:"wxpay",
					timeStamp:info.timeStamp,
					nonceStr:info.nonceStr,
					package:info.package,
					signType:info.signType,
					paySign:info.paySign,
					orderInfo:info.out_trade_no,
					success:function(res){
						uni.navigateTo({
							url:"../payment_success/payment_success"
						})
					},
					fail:function(err){
						uni.navigateTo({
								url:"../payment_failure2/payment_failure2?id="+ info.out_trade_no
						})
					}
						
				})
			},
			async xuPay(){
				console.log(this.uid)
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/xfpay",
					data:{
						oid:that.uid
					}
				})
				const info = res.data
				if(info.code == 0){
					uni.showToast({
						title:info.msg,
						icon:'none',
						duration:2000
					})
				} else {
					that.zhifu(info)
				}
			}
		}
	}
</script>

<style>
.make_room{
  margin-top: 20rpx;	
  background-color: #FFFFFF;
}
image{
	width: 100%;
	height: 100%;
}
.make_title{
	display: block;
	width: 90%;
	margin: 0 auto;
	border-bottom: 2rpx solid #E8E8E8;
	line-height: 80rpx;
	font-size: 32rpx;
	color: #333333;
}
.make_center{
	display: flex;
     width: 90%;
	 margin: 0 auto;
}
.make_img{
	width: 130rpx;
	height: 130rpx;
	margin: 30rpx 20rpx 30rpx 0;
}
.make_huose{
	width: 75%;
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
	width: 80%;
	margin-left: 30rpx;
	overflow:hidden; //超出的文本隐藏
	text-overflow:ellipsis; //溢出用省略号显示
	white-space:nowrap; //溢出不换行
}
.huous_title{
	color: #485AEA;
}
.make_footer{
	background-color: #FFFFFF;
	margin-top: 20rpx;
}
.footer_center{
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	font-size: 30rpx;
	color: #333333;
	line-height: 80rpx;
	border-bottom: 2rpx solid #E8E8E8;
}
.footer_center:last-child{
	border-bottom: none;
}
.jiaqian{
	color: #F03232;
}
.footer_input{
	width: 200rpx;
	height:100rpx;
}
.footer_input input{
	width: 200rpx;
	height: 100%;
	text-align: right;
	}
.make_zhifu{
	position: fixed;
	bottom: 0;
	background-color: #485AEA;
	width: 100%;
	text-align: center;
    line-height: 100rpx;
	font-size: 36rpx;
	color: #FFFFFF;
}
</style>
