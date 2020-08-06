<template>
	<view>
		<view class="about_img">
			<image :src="aboutImg" mode="aspectFill"></image>
		</view>
		<view class="about_title">
          {{aboutTitle}}
		</view>
		<view class="about_footer">
			{{aboutVersions}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aboutTitle:"",
				aboutVersions:"",
				aboutImg:""
			}
		},
		onLoad() {
			this.aboutIndex()
		},
		methods: {
			async aboutIndex(){
				const that = this
				const res = await this.$myRequest({
					method:"POST",
					url:"/about"
				})
				that.aboutTitle = res.data.data.title
				that.aboutVersions = res.data.data.shorttitle
				that.aboutImg = res.data.data.thumb
			}
		}
	}
</script>

<style>
	.about_img{
		width: 330rpx;
		height: 331rpx;
		margin: 50rpx auto 0;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.about_title{
		font-size: 36rpx;
		text-align: center;
		color: #333333;
		margin: 20rpx 0;
		}
	.about_footer{
		font-size: 32rpx;
		text-align: center;
		color: #333333;
	}

</style>
