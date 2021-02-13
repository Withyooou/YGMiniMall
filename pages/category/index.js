// pages/category/index.js
import { request } from '../../service/request'

Page({
	data: {
		// 左边的菜单栏数据
		leftMenuList: [],
		// 右边的内容数据
		rightConentList: [],
		// 右侧内容区的 滚动条距离顶部的距离
		topNum: 0,
	},
	// 定义一个数组,用来保存接口的返回数据
	cates: [],
	onLoad: function (options) {
		/**
		 * 使用缓存技术:
		 * web中使用本地缓存 和 小程序中使用本地缓存的区别:
		 *  - web: 不管存入的是什么类型的数据,都需要把数据变成字符串,再存进去
		 *  - 小程序: 不存在类型转换这个操作,存什么类型的数据进去,获取的时候就是什么类型
		 *
		 * 判断思路:
		 *  1、先判断本地存储中有没有旧数据 { time: Date.now(), data: [...] }
		 *  2、没有旧数据,直接发送请求
		 *  3、有旧数据,同时旧数据也没有过期,此时使用本地存储中的旧数据即可
		 */
		// 1. 获取本地存储中的数据
		const cates = wx.getStorageSync('cates')
		// 2. 判断
		if (!cates) {
			// 如果不存在本地缓存,则发送请求获取数据
			this.getCates()
		} else {
			// 有旧的数据,判断数据是否过期(10s)
			if (Date.now() - cates.time > 1000 * 10) {
				// 如果数据过期了,则重新发送请求
				this.getCates()
			} else {
				// 如果数据还没过期,直接使用旧数据
				this.cates = cates.data
				// 给左边的菜单栏添加数据
				let leftMenuList = this.cates.map((item) => item.cat_name)
				// 给右边的内容区添加数据
				let rightConentList = this.cates[0].children
				this.setData({
					leftMenuList,
					rightConentList,
				})
			}
		}
	},
	/********************* 网络请求部分 *********************/
	// 获取分类页面数据
	getCates() {
		request({
			url: '/categories',
		}).then((res) => {
			this.cates = res
			// 把接口的数据存入到本地存储中
			wx.setStorageSync('cates', { time: Date.now(), data: this.cates })
			// 给左边的菜单栏添加数据
			let leftMenuList = this.cates.map((item) => item.cat_name)
			// 给右边的内容区添加数据
			let rightConentList = this.cates[0].children
			this.setData({
				leftMenuList,
				rightConentList,
			})
		})
	},
	/********************* 事件处理部分 *********************/
	handleMenuClick(e) {
		const index = e.detail.index
		this.setData({
			// 右侧的内容跟随索引index的变化而切换
			rightConentList: this.cates[index].children,
			// 将内容区滚动条距离顶部的距离重新设置为0
			topNum: 0
		})
	},
})
