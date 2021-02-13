// pages/cart/childCpns/y-cart-bottom/y-cart-bottom.js
Component({
  properties: {
    allChecked: {
      type: Boolean,
      value: false
    },
    totalPrice: {
      type: Number,
      value: 0
    },
    totalNum: {
      type: Number,
      value: 0
    },
    cartLength: {
      type: Number,
      value: 0
    }
  },
  data: {

  },
  methods: {
    handleItemAllCheck() {
      this.triggerEvent('handleItemAllCheck');
    },
    handlePay() {
      this.triggerEvent('handlePay');
    }
  }
})
