// pages/pay/index.js
import { showToast, requestPayment } from '../../utils/asyncWx.js'
import { request } from '../../service/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onLoad: function (options) {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address") || {};
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组(只取被选中的商品)
    cart = cart.filter(v => v.checked);
    this.setData({ address });

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  // 点击支付按钮
  async handleOrderPay() {
    try {
      // 1.判断缓存中有没有token 
      const token = wx.getStorageSync("token");
      // 没有token,跳转到授权页面
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      
      /***** 以下支付功能由于个人开发者权限不足无法实现 *****/
      /**
       *  哪些人、哪些帐号可以实现微信支付:
       *  1.企业帐号 
       *  2.企业帐号的小程序后台中,必须给开发者添加上白名单 
       *    1)一个appid可以同时绑定多个开发者
       *    2)这些开发者可以共用这个appid和它的开发权限 
       */
      // // 2.创建订单
      // // 2.1 准备请求头参数
      // const header = { Authorization: token };
      // // 2.2 准备请求体参数
      // const order_price = this.data.totalPrice;
      // const consignee_addr = this.data.address.all;
      // const cart = this.data.cart;
      // let goods = [];
      // cart.forEach(v => goods.push({
      //   goods_id: v.goods_id,
      //   goods_number: v.num,
      //   goods_price: v.goods_price
      // }))
      // const orderParams = { order_price, consignee_addr, goods };

      // // 3.发送请求创建订单,获取订单编号
      // const { order_number } = await request({ url: "/my/orders/create", method: "POST", header, data: orderParams });
      // // 4.发送请求,获取预支付接口
      // const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", header, data: { order_number } });
      // // 5.发起微信支付 
      // await requestPayment(pay);
      // // 6.查询订单支付状态
      // const res = await request({ url: "/my/orders/chkOrder", method: "POST", header, data: { order_number } });
      // await showToast({ title: "支付成功！" });
      // // 7.手动删除缓存中已经支付了的商品(上面的cart是经过筛选的数组,因此这里需要重新获得未经筛选的cart)
      // let newCart = wx.getStorageSync("cart");
      // // 过滤,获取未被勾选的商品,用之覆盖缓存中的cart数组
      // newCart = newCart.filter(v => !v.checked);
      // wx.setStorageSync("cart", newCart);

      // // 8.支付成功,跳转到订单页面
      // wx.navigateTo({
      //   url: '/pages/order/index'
      // });
    } catch (error) {
      await showToast({ title: "支付失败！" })
      console.log(error);
    }
  }
})