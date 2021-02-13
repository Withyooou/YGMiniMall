// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中的收货地址信息(一个对象)
    const address = wx.getStorageSync("address") || {};
    // 获取缓存中的购物车数据(一个数组,元素是对象)
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    // 该函数统一处理了商品数量、总价、是否全选、商品信息的缓存
    this.setCart(cart);
  },
  /********************* 事件处理部分 *********************/
  /**
   * 获取用户的收货地址
     获取用户对小程序所授予获取地址的 权限状态scope
      1 假设用户点击获取收货地址的提示框 确定  authSetting scope.address 
        scope=true,直接调用获取收货地址(wx.chooseAddress())
      2 假设用户 从来没有调用过 收货地址的api 
        scope=undefined,直接调用获取收货地址
      3 假设用户点击获取收货地址的提示框 取消   
        scope=false 
        1 诱导用户自己打开授权设置页面(wx.openSetting()) 
        2 当用户重新给与获取地址权限的时候,获取收货地址
      4 把获取到的收货地址存入到本地存储中 
   */
  // 点击获取收货地址
  async handleChooseAddress() {
    try {
      // // 1.获取权限状态
      // // wx.getSetting() 获取用户的当前设置,返回值中只会出现小程序已经向用户请求过的权限; authSetting用户授权结果
      // const result = await getSetting();
      // const scopeAddress = result.authSetting["scope.address"];
      // console.log(result)
      // // 2.判断权限状态
      // if (scopeAddress === false) {
      //   // wx.openSetting() 调起客户端小程序设置界面,返回用户设置的操作结果,设置界面只会出现小程序已经向用户请求过的权限
      //   await openSetting();
      // }

      /***** 2020年9月25日起,wx.chooseAddress()无需获取用户授权,因此不用做以上处理了 *****/
      // 3.调用获取收货地址的api
      // wx.chooseAddress() 获取用户收货地址,调起用户编辑收货地址原生界面,并在编辑完成后返回用户选择的地址
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      // 4.存入到缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  // (公共函数)设置购物车状态同时,重新计算底部信息栏的数据
  setCart(cart) {
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length !== 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    // 将更新后的数据覆盖原缓存中的数据
    wx.setStorageSync("cart", cart);
  },
  // 商品选中按钮
  handeItemChange(e) {
    // 1.获取被修改的商品的id
    const { goods_id } = e.detail;
    // 2.获取购物车数组 
    let { cart } = this.data;
    // 3.找到被修改商品的索引
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4.选中状态取反
    cart[index].checked = !cart[index].checked;
    // 5.把修改后的值填充回data、缓存中
    this.setCart(cart);
  },
  // 商品数量修改按钮
  async handleItemNumEdit(e) {
    // 1.获取传递过来的参数 
    const { operation, id } = e.detail;
    // 2.获取购物车数组
    let { cart } = this.data;
    // 3.找到被修改商品的索引
    let index = cart.findIndex(v => v.goods_id === id);
    // 4.判断是否要执行删除
    if (cart[index].num === 1 && operation === -1) {
      // showModal 弹窗提示
      const res = await showModal({ content: "您确认要删除该商品？" });
      if (res.confirm) {
        // 删除该商品
        cart.splice(index, 1);
        // 该函数统一处理了商品数量、总价、是否全选、商品信息的缓存
        this.setCart(cart);
      }
    } else {
      // 进行商品数量修改
      cart[index].num += operation;
      // 该函数统一处理了商品数量、总价、是否全选、商品信息的缓存
      this.setCart(cart);
    }
  },
  // 长按商品触发事件
  async handleLongPress(e) {
    // 1.获取被修改的商品的id
    const { goods_id } = e.detail;
    // 2.获取购物车数组
    let { cart } = this.data;
    // 3.找到被修改商品的索引
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 2. showModal 弹窗提示
    const res = await showModal({ content: "您确认要删除该商品吗？" });
    if (res.confirm) {
      // 删除该商品
      cart.splice(index, 1);
      // 该函数统一处理了商品数量、总价、是否全选、商品信息的缓存
      this.setCart(cart);
    }
  },
  // 全选按钮
  handleItemAllCheck() {
    // 1.获取data中的数据
    let { cart, allChecked } = this.data;
    // 2.修改全选值
    allChecked = !allChecked;
    // 3.循环修改cart数组中的商品选中状态
    cart.forEach(v => v.checked = allChecked);
    // 4.把修改后的值填充回data、缓存中
    this.setCart(cart);
  },
  // 结算按钮 
  async handlePay() {
    // 1.判断收货地址
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址" });
      return;
    }
    // 2.判断用户有没有选购商品
    if (totalNum === 0) {
      await showToast({ title: "您还没有选购商品" });
      return;
    }
    // 3.既有收货地址,又有商品,跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }
})