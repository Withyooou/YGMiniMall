// pages/user/index.js
import { chooseAddress, showToast } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    const userinfo = wx.getStorageSync("userinfo") || {};
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userinfo,
      collectNums: collect.length
    });
  },
  // 生命周期函数--自定义转发内容
  onShareAppMessage: function (res) {
    return {
      title: '优购商城',
			path: '/pages/user/index',
			imageUrl: '../../icons/userPageShare.png'
    }
  },
  // 点击登录按钮,获取userInfo
  handleGetUserInfo(e) {
    const { userInfo } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    this.setData({ userinfo: userInfo });
  },
  // 收获地址管理,直接调用微信原生编辑收货地址界面(chooseAddress)
  async handleChooseAddress() {
    try {
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  // 关于我们
  async aboutUs() {
    await showToast({title:'Make by Withyooou'})
  },
  // 未完成模块的弹窗
  async unfinished() {
    await showToast({
      title: '该模块尚未完成...',
      duration: 1000
    })
  }
})