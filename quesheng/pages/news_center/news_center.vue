<template>
	<view>
		<view class="success_ceter">
			<text>{{centerTItle}}</text>
			<view class="">
				{{description}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				centerTItle:'',
				description:''
			}
		},
		onLoad(e) {
			var id = e.id
			this.newsCenter(id)
		},
		methods: {
			async newsCenter(sid){
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/messageDetail?id=" + sid
				})
				that.centerTItle = res.data.data.title
				that.description = res.data.data.description
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
	.success_ceter{
	width: 90%;
	margin: 0 auto;
	
	}
	.success_ceter text{
		font-size: 36rpx;
		color: #333333;
		line-height: 80rpx;
		padding: 40rpx 0;
	}
    .success_ceter{
		font-size: 28rpx;
		color: #333333;
		line-height: 50rpx;
	}
</style>
