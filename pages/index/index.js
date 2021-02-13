import { request } from '../../service/request'

Page({
	data: {
		// 轮播图数据
		swiperList: [],
		// 导航栏数据
		navList: [],
		// 楼层数据
		floorList: []
	},
	// 生命周期函数--监听页面显示
	onLoad: function(options) {
		this.getSwiperList()
		this.getNavList()
		this.getFloorList()
	},
	// 生命周期函数--自定义转发内容
  onShareAppMessage: function (res) {
    return {
      title: '优购商城',
			path: '/pages/index/index',
			imageUrl: '../../icons/indexPageShare.png'
    }
  },
	/********************* 网络请求部分 *********************/
	// 首页轮播图数据请求
	getSwiperList() {
		request({
			url: '/home/swiperdata',
		}).then((res) => {
			this.setData({
				swiperList: res
			})
		})
	},
	// 首页分类导航数据请求
	getNavList() {
		request({
			url: '/home/catitems',
		}).then((res) => {
			this.setData({
				navList: res
			})
		})
	},
	// 首页楼层数据请求
	getFloorList() {
		request({
			url: '/home/floordata',
		}).then((res) => {
			this.setData({
				floorList: res
			})
		})
	},
})
