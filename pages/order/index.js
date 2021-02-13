// pages/order/index.js
Page({
	data: {
		tabs: [
			{
				id: 0,
				value: "全部订单",
				isActive: true,
			},
			{
				id: 1,
				value: "待付款",
				isActive: false,
			},
			{
				id: 2,
				value: "待收货",
				isActive: false,
			},
			{
				id: 3,
				value: "退货 / 退款",
				isActive: false,
			},
		],
	},
	onShow() {
		// 1.获取当前的小程序的页面栈数组,长度最大是10
		let pages = getCurrentPages();
		// 2.数组中,索引最大的页面就是当前页面
		let currentPage = pages[pages.length - 1];
		// 3.获取传递过来的type参数
		const { type } = currentPage.options;
		// 4.激活选中页面标题; 当type=1时,index=0 
		this.changeTitleByIndex(type - 1);
	},
	handleTabsChange(e) {
		let index = e.detail.index
		this.changeTitleByIndex(index);
	},
	// 根据传递过来的索引,来激活选中标题数组
  changeTitleByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
})