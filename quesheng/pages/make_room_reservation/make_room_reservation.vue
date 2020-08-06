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
				        <text class="huous_title">{{h_name}}</text>
			        </view>
			        <view class="huous_hao">
				        <text>价格:</text>
				        <text>￥{{price}}/小时</text>
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
				<text>{{times}}小时</text>
			</view>
			<view class="footer_center">
				<text>订单总价</text>
				<text class="jiaqian">{{price*times}}元</text>
			</view>
		</view>
		<view class="make_zhifu" @click="makePay">
			支付
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopname:'',
				address:'',
				h_name:'',
				price:'',
				times:'',
				door_photos:'',
				hid:"",
				uid:"",
				dingId:"",
				data:""
			}
		},
		onLoad(e) {
			const that = this
			var id = e.id
			this.hid =id;
			this.makeIndex(id)
		    const message = uni.getStorageSync("token")
		    that.uid= message.uid
		    that.data = new Date()
		},
		methods: {
			async makeIndex(id){
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/makeOrder?hid=" + id
				})
				that.shopname = res.data.data.shopname
				that.address = res.data.data.address
				that.h_name = res.data.data.h_name
				that.price = res.data.data.price
				that.times = res.data.data.times
				that.door_photos = res.data.data.door_photos
				that.dingId = res.data.data.id
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
							url:"../payment_failure1/payment_failure1?id="+ info.out_trade_no
						})
												
					}
				})
			},
			async makePay(){
				const that = this
				const uid = that.uid
				const hid = that.hid
				const res = await this.$myRequest({
					method:"POST",
					url:"/topay",
					data:{
						uid:uid,
						hid:hid
					}
				})
				const info = res.data
				that.zhifu(info)
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
	border-radius: 20rpx;
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
