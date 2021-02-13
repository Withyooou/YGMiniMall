// pages/search/index.js
import { request } from '../../service/request'
import { debounce } from '../../utils/asyncWx'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goods: [],
    dbSearch: null,
    // 取消按钮是否显示
    isFocus: false,
    // 输入框的值
    inputValue: ""
  },
  onLoad: function (options) {
    // 调用防抖函数(返回的也是个函数)
    this.dbSearch = debounce(this.qsearch, 600);
  },
  /********************* 事件处理部分 *********************/
  handleInput(e) {
    // 获取输入框的值
    const { value } = e.detail;
    // 值非法(为空格)
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    // 值合法
    this.setData({
      isFocus: true
    })
    // 发送请求获取搜索数据(做了防抖处理)
    this.dbSearch(value)
  },
  // 发送请求,获取搜索到的数据
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    // console.log(res);
    this.setData({
      goods: res
    })
  },
  // 点击取消按钮
  handleCancel() {
    this.setData({
      inputValue: "",
      isFocus: false,
      goods: []
    })
  }
})