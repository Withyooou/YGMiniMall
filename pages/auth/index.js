// pages/auth/index.js
import { showToast, login } from '../../utils/asyncWx.js'
import { request } from '../../service/request.js'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 1.getUserInfo 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 2.获取小程序登录成功后的code
      const { code } = await login();
      const loginParams = { encryptedData, rawData, iv, signature, code };

      await showToast({title:'获取token失败,无法实现支付功能T^T'});
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/cart/index'
        })
      }, 1500);

      /***** 以下功能由于个人开发者权限不足无法实现 *****/
      // // 3.发送请求,获取用户的token
      // const { token } = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
      // // 4.把token存入缓存中,同时跳转回上一个页面
      // wx.setStorageSync("token", token);
      // wx.navigateBack({
      //   delta: 1
      // });
    } catch (error) {
      console.log(error);
    }
  }
})