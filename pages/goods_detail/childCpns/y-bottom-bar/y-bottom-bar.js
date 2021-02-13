// pages/goods_detail/childCpns/y-bottom-bar/y-bottom-bar.js
import { showToast } from '../../../../utils/asyncWx';
import regeneratorRuntime from '../../../../lib/runtime/runtime';

Component({
  properties: {},
  data: {},
  methods: {
    handleAddCart() {
      this.triggerEvent('handleAddCart', {}, {})
    },
    async handleBuy() {
      await showToast({
        title: '请添加至购物车，在购物车页面进行结算(￣∇￣)',
      })
    }
  }
})
