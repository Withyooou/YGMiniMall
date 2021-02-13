// 引入网络请求模块
import { request } from '../../service/request'
// 使用ES7中的async await
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
	data: {
		tabs: [
			{
				id: 0,
				value: "综合",
				isActive: true,
			},
			{
				id: 1,
				value: "销量",
				isActive: false,
			},
			{
				id: 2,
				value: "价格",
				isActive: false,
			},
		],
		goodsList: [],
		showBackTop: false
	},
	// 请求接口需要的参数
	queryParams: {
		query: '',
		cid: '',
		pagenum: 1,    // 当前的页码值
		pagesize: 10   // 每页显示多少条数据
	},
	// 总页数
	totalPages: 1,
	// 页面加载生命周期函数
	onLoad: function (options) {
		console.log(options)
		this.queryParams.cid = options.cid || ''
		this.queryParams.query = options.query || ''
		// 请求商品列表数据
		this.getGoodsList()
	},
	// 下拉触底事件
	onReachBottom() {
		if (this.queryParams.pagenum >= this.totalPages) {
			wx.showToast({
				title: '没有下一页数据了',
				icon: 'none',
				duration: 1000
			});
		} else {
			this.queryParams.pagenum ++;
			this.getGoodsList();
		}
	},
	// 下拉刷新事件
	onPullDownRefresh() {
		// 重置列表数组
		this.setData({
			goodsList: []
		})
		// 重置页码值
		this.queryParams.pagenum = 1
		// 重新发起请求
		this.getGoodsList()
		// 关闭下拉刷新的效果
		wx.stopPullDownRefresh()
	},
	// 滚动监听事件
	onPageScroll(options) {
		const scrollTop = options.scrollTop;
		// 定义一个标志位,减少setData()的次数
		const flag = scrollTop >= 800;
		if(flag != this.data.showBackTop) {
			this.setData({
				showBackTop: scrollTop >= 800
			})
		}
	},
	/********************* 网络请求部分 *********************/
	// 请求商品列表数据
	async getGoodsList() {
		const res = await request({
			url: "/goods/search",
			data: this.queryParams
		});
		// console.log(res)
		let total = res.total;
		// 商品总页数(ceil向上取整)
		this.totalPages = Math.ceil(total / this.queryParams.pagesize);
		this.setData({
			// 为了防止加载下一页数据的时候,下一页数据覆盖上一页数据,采用扩展运算符进行数组拼接
			goodsList: [...this.data.goodsList, ...res.goods]
		});
	},
	/********************* 事件处理部分 *********************/
	handleTabsChange(e) {
		let index = e.detail.index
		// 对象解构(注意不是this.data.tabs)
		let { tabs } = this.data
		tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
		this.setData({
			tabs
		})
	},
})
