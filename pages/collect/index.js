// pages/collect/index.js
import { showToast } from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true,
      },
      {
        id: 1,
        value: "品牌收藏",
        isActive: false,
      },
      {
        id: 2,
        value: "店铺收藏",
        isActive: false,
      },
      {
        id: 3,
        value: "浏览足迹",
        isActive: false,
      },
    ],
    collect: [],
    tabIndex: 0
  },
  onShow() {
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    });
  },
  handleTabsChange(e) {
    let index = e.detail.index;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs,
      tabIndex: index
    })
  },
  async noFinished() {
    await showToast({
      title: "静态的，还没完善T^T",
      duration: 1000
    })
  }
})