// pages/cart/childCpns/y-cart-items/y-cart-items.js
Component({
  properties: {
    cart: {
      type: Array,
      value: []
    }
  },
  data: {

  },
  methods: {
    handeItemChange(e) {
      const goods_id = e.currentTarget.dataset.id;
      this.triggerEvent('handeItemChange', {goods_id}, {});
    },
    handleItemNumEdit(e) {
      const { operation, id } = e.currentTarget.dataset;
      this.triggerEvent('handleItemNumEdit', {operation, id}, {});
    },
    handleLongPress(e) {
      const goods_id = e.currentTarget.dataset.id;
      this.triggerEvent('handleLongPress', {goods_id}, {});
    }
  }
})
