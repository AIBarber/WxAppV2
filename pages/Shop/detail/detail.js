var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')
Page( {
  data: {
    shopItems: fileData.getshopData(),
    curIndex: 0,
    winWidth: 0,
    winHeight: 0
  },
  onLoad: function () {
    var that = this
    that.setData({
      shop: that.data.shopItems
    });

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },
  getLocation:function(){
    wx.navigateTo({
      url:'../location/location'
    })
  },
  bookTap:function(){
    wx.navigateTo({
      url:'../book/book'
    })
  }
})