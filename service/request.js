import { baseUrl, timeout } from './config'

// 同时发送异步代码的次数
let ajaxTimes = 0;

export function request(params) {
	// // ...扩展运算符,可以将数组或者对象转为用逗号分隔的参数序列
	// let header = { ...params.header };
	// // 判断url中是否带有"/my/",有的话拼接header,带上token
	// if (params.url.includes("/my/")) {
	//   header["Authorization"] = wx.getStorageSync("token");
	// }

	ajaxTimes++; // 发送一次请求就加1

	// 请求数据时显示加载框
	wx.showLoading({
		title: '加载中...',
		mask: true
	})

	return new Promise((resolve, reject) => {
		wx.request({
			// header: header,
			url: baseUrl + params.url,
			data: params.data,
			timeout: timeout,
			method: params.method || "GET",
			success: (res) => {
				resolve(res.data.message);
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
				ajaxTimes--; // 完成一次请求就减1
				if (ajaxTimes === 0) {
					// 当所有的请求都完成时,关闭加载框
					wx.hideLoading();
				}
			}
		})
	})
}
