// 引入网络请求模块
import { request } from '../../service/request'
// 使用ES7中的async await
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goodsObj: {},
    // 商品是否被收藏
    isCollect: false,
    showBackTop: false
  },
  // 新建一个对象用于保存全部商品数据
  goodsInfo: {},
  // 页面加载生命周期函数
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const { goods_id } = options;
    // console.log(goods_id)
    this.getGoodsDetail(goods_id)
  },
  // 滚动监听事件
	onPageScroll(options) {
		const scrollTop = options.scrollTop;
		// 定义一个标志位,减少setData()的次数
		const flag = scrollTop >= 1100;
		if(flag != this.data.showBackTop) {
			this.setData({
				showBackTop: scrollTop >= 1100
			})
		}
  },
  // 自定义转发内容
  onShareAppMessage(res) {
    return {
      title: this.goodsInfo.goods_name,
      path: `/page/goods_detail?goods_id=${this.goodsInfo.goods_id}`
    }
  },
  /********************* 网络请求部分 *********************/
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: { goods_id }
    });
    // console.log(goodsObj)
    // 为了确保性能,this.data.goodsObj不会存入所有数据,只会存入页面渲染所需要的数据;此时需要定义一个对象(goodsInfo)来保存所有数据,因为有些数据渲染时用不到,但是处理业务逻辑时会用到
    this.goodsInfo = goodsObj;
    // 1.获取缓存中的商品收藏的数组
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断当前商品是否被收藏
    // some()用于检测数组中的元素是否满足指定条件,有一个满足则返回true,全部不满足返回false
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id);
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iPhone部分手机不识别.webp图片格式,可以用正则把后缀改为.jpg; 但是最好找到后台让他进行修改
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics
      },
      isCollect
    })
  },
  /********************* 事件处理部分 *********************/
  // 点击加入购物车
  handleAddCart() {
    // 1.获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 2.判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      // 3.不存在,为第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        duration: 1000,
        mask: true
      });
    } else {
      // 4.已经存在购物车中,执行num ++
      cart[index].num ++;
      wx.showToast({
        title: '商品数量 +1',
        icon: 'success',
        duration: 1000,
        mask: true
      });
    }
    // 5.把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
  },
  // 点击商品收藏图标
  handleCollect() {
    let isCollect = false;
    // 1.获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    // 3.index !== -1,表示商品已收藏
    if (index !== -1) {
      // 已经收藏过了,再次点击为取消收藏,在数组中删除该商品
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '商品已取消收藏',
        icon: 'success',
        duration: 1000,
        mask: true
      });
    } else {
      // 4.商品没有收藏过
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: '商品收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 5.把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 6.修改data中的属性isCollect
    this.setData({
      isCollect
    })
  }
});
