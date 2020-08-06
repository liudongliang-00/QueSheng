<template>
	<view>
		<view class="make_room">
		    <text class="make_title">{{shopname}}</text>
		    <view class="make_center">
			    <view class="make_img">
					<image :src="door_photos" mode=""></image>
				</view>
			    <view class="make_huose">
			        <view class="huous_hao">
				        <text>房号:</text>
				        <text class="huous_title">{{house_name}}</text>
			        </view>
			        <view class="huous_hao">
				        <text>总价:</text>
				        <text>￥{{cash}}</text>
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
				<text>已用时长</text>
				<text>{{use_time}}</text>
			</view>
			<view class="footer_center">
				<text>消费金额</text>
				<text class="jiaqian">￥{{use_money}}</text>
			</view>
		</view>
		<view class="make_footer">
			<view class="make_draw">
				<text>可退金额</text>
				<text class="jiaqian">￥{{tui_money == 0 ? "0":tui_money}}</text>
			</view>
		</view>
		<view class="we_ti">
			温馨提示：请带好随身物品并关好门，退房成功2分钟后关闭电源
		</view>
		<button class="make_zhifu" @click="backPay" v-show="disabled">
			退房
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drakIndex:"",
				shopname:"",
				address:"",
				door_photos:"",
				use_time:"",
				use_money:'',
				house_name:'',
				tui_money:'',
				cash:"",
				oid:'',
				status:'',
				disabled:true
			}
		},
		onLoad(e) {
			var oid = e.id
			this.oid = oid
			this.drawIndex(oid)
		},
		methods: {
			async drawIndex(id){
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/backHouse?oid=" + id
				})
				that.shopname = res.data.data.shopname
				that.address = res.data.data.address
				that.door_photos = res.data.data.door_photos
				that.use_time = res.data.data.use_time
				that.house_name = res.data.data.house_name
				that.use_money = res.data.data.use_money
				that.tui_money = res.data.data.tui_money
				that.cash = res.data.data.price
			},
			async backPay(){
				const that = this
				if(that.tui_money == 0 ){
					uni.showToast({
						title:"退款金额为0"
					})
				}else{
					uni.showModal({
						title:"您确定退款退房",
						success(res) {
							if(res.confirm){
								uni.hideLoading()
								that.tuiPay()
							}else if (res.cancel){
								uni.hideLoading()
							}
						}
					})
				}
			},
			async tuiPay(){
				uni.showLoading({})
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/backPay",
					data:{
						oid:that.oid,
						refund_fee:that.tui_money
					},
				})	
				that.status = res.data.status
				if(that.status == 1){
					this.disabled=false
					uni.navigateTo({
						url:"../payment_success_houe/payment_success_houe"
					})
				}else{
					uni.showToast({
						title:res.data.errmsg,
						icon:'none',
						duration:2000
					})
					// uni.navigateTo({
					// 	url:"../payment_failure_hosue/payment_failure_hosue",
					// })
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
button{
	border-radius: 0 !important;
	border: none !important;
}
.make_code{
	display: none;
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
	color: #F03232 !important;
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
	background-color: #3A4FF5;
	width: 100%;
	text-align: center;
    line-height: 100rpx;
	font-size: 36rpx;
	color: #FFFFFF;
}
.make_draw{
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	line-height: 80rpx;
	background-color: #FFFFFF;
}
.make_draw text{
	display: block;
	font-size: 30rpx;
	color: #333333;
	}
	.we_ti{
		font-size: 24rpx;
		color: #999999;
		padding:  30rpx;
	}
</style>
