// pages/feedback/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true,
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false,
      }
    ],
    // 被选中的图片路径 数组
    chooseImgs: [],
    // 文本域的内容
    textVal: ""
  },
  // 外网的图片的路径数组
  UpLoadImgs: [],
  onLoad: function (options) {

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
  // 文本域的输入的事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 点击 “+” 选择图片
  handleChooseImg() {
    // 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式(原图、压缩)
      sizeType: ['original', 'compressed'],
      // 图片的来源(相册、照相机)
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 扩展运算符对图片数组进行拼接 
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  // 图片点击事件(删除图片)
  handleRemoveImg(e) {
    // 获取被点击图片的索引
    const { index } = e.currentTarget.dataset;
    // 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 删除图片数组中对应的元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 提交按钮的点击
  handleFormSubmit() {
    // 1.获取文本域的内容和图片数组
    const { textVal, chooseImgs } = this.data;
    // 2.合法性的验证
    if (!textVal.trim()) {
      // 不合法(都是空格)
      wx.showToast({
        title: '输入内容不合法',
        icon: 'none',
        mask: true,
        duration: 1000
      });
      return;
    }
    // 重置页面
    this.setData({
      textVal: "",
      chooseImgs: []
    })
    wx.showToast({
      title: "提交功能尚未实现，2s后将退回上一个界面...",
      icon: 'none',
      mask: true
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 2000);

    // // 3.准备上传图片到专门的图片服务器 
    // // 上传文件的api不支持多个文件同时上传,遍历数组挨个上传 
    // wx.showLoading({
    //   title: "正在上传中",
    //   mask: true
    // });
    // // 反馈信息既有图片,又有文字
    // if (chooseImgs.length !== 0) {
    //   chooseImgs.forEach((v, i) => {
    //     wx.uploadFile({
    //       // 图片要上传到哪里
    //       url: 'https://images.ac.cn/Home/Index/UploadAction/',
    //       // 被上传的文件的路径
    //       filePath: v,
    //       // 上传的文件的名称
    //       name: "file",
    //       // 顺带的文本信息
    //       formData: {},
    //       success: (result) => {
    //         let url = JSON.parse(result.data).url;
    //         this.UpLoadImgs.push(url);

    //         // 所有的图片都上传完毕
    //         if (i === chooseImgs.length - 1) {
    //           wx.hideLoading();
    //           console.log("把文本的内容和外网的图片数组提交到后台服务器");
    //           // 提交都成功了
    //           // 重置页面
    //           this.setData({
    //             textVal: "",
    //             chooseImgs: []
    //           })
    //           // 返回上一个页面
    //           wx.navigateBack({
    //             delta: 1
    //           });
    //         }
    //       }
    //     });
    //   })
    // } else {
    //   // 反馈信息只有文字
    //   wx.hideLoading();
    //   console.log("把文本的内容提交到后台服务器");
    //   wx.navigateBack({
    //     delta: 1
    //   });
    // }
  }
})