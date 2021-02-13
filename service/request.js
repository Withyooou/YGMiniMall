import { baseUrl, timeout } from './config'

// 同时发送异步代码的次数
let ajaxTimes = 0

export function request(params) {
	ajaxTimes ++ // 发送一次请求就加1

	// 请求数据时显示加载框
	wx.showLoading({
		title: '加载中...',
		mask: true
	})

	return new Promise((resolve, reject) => {
		wx.request({
			url: baseUrl + params.url,
			data: params.data,
			timeout: timeout,
			method: params.method || "GET",
			success: (res) => {
				resolve(res.data.message)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				ajaxTimes -- // 完成一次请求就减1
				if (ajaxTimes === 0) {
					// 当所有的请求都完成时,关闭加载框
					wx.hideLoading()
				}
			}
		})
	})
}
