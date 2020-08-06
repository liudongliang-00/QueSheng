<template>
	<view>
		<view class="" v-for="item in newsMy" :key="item.id" @click="myNews(item.id)">
			<view class="my_num">
				{{item.addtime}}
			</view>
			<view class="news">
				<text class="news_tltl">{{item.title}}</text>
				<text class="new_cetne">
					{{item.description}}
				</text>
				<view class="news_he">
					
				</view>
				<view class="news_footer">
					查看详情
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsMy:''
			}
		},
		onLoad() {
			this.newsIndex()
		},
		methods: {
			async newsIndex (){	
					const that = this
					const res = await this.$myRequest({
						method:"POST",
						url:"/myMessage"
					})
					that.newsMy = res.data.data	
			},
			myNews(id){
				uni.navigateTo({
					url:"../news_center/news_center?id="+id
				})
			}
		}
		
	}
</script>

<style>
	.my_num{
		text-align: center;
		font-size: 28rpx;
		line-height: 80rpx;
		color: #999999;
	}
	.news{
		width: 90%;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.news_tltl{
		font-size:32rpx;
		color: #333333;
		padding: 0 20rpx;
		line-height: 80rpx;
	}
	.new_cetne{
		display: block;
		width: 94%;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #999999;
		line-height: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
.news_footer{
	text-align: center;
	font-size: 28rpx;
	color: #485AEA;
	line-height: 80rpx;
}
.news_he{
	border-bottom: 2rpx solid #E8E8E8;
	margin-top: 30rpx;
}
</style>
