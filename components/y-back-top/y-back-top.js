// components/y-back-top/y-back-top.js
Component({
  properties: {

  },
  data: {

  },
  methods: {
    handleBackTop() {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})
