// pages/goods_detail/childCpns/y-swiper/y-swiper.js
Component({
  properties: {
    pics: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    // 点击轮播图放大预览
    handlePrevewImage(e) {
      // 1 先构造要预览的图片数组(map()方法返回一个新数组,数组中的元素为原始数组元素调用函数处理后的值) 
      const urls = this.properties.pics.map(v => v.pics_mid);
      // 2 接收传递过来的图片url
      const current = e.currentTarget.dataset.url;
      wx.previewImage({
        // 需要预览的图片链接列表
        urls,
        // 当前显示图片的链接
        current
      });
    },
  }
})
