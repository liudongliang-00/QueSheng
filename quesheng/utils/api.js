const baesUrl = "https://queka.zhiliang1688.com/api/wx_api"

export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.showLoading({
			title:"正在获取数据"
		})
		uni.request({
			header:{'content-type':'application/x-www-form-urlencoded'},
			method:options.method,
			data:options.data,
			url:baesUrl + options.url,
			success(res) {	
				if( res.statusCode !== 200){
					if(res.data.code !== 1){
						uni.showToast({
							title:"获取失败"
						})
					}
				}
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					title:"获取数据失败"
				})
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
