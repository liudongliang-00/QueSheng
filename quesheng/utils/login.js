export const wxLoing = ()=>{
	return new Promise((resolve,reject)=>{
		uni.login({
			provider:"weixin",
			success: (res) => {
				const {code} = res
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}


