// pages/goods_detail/childCpns/y-goods-info/y-goods-info.js
Component({
  properties: {
    goodsObj: {
      type: Object,
      value: {}
    },
    isCollect: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    onCollect() {
      this.triggerEvent('handleCollect', {}, {})
    }
  }
})
