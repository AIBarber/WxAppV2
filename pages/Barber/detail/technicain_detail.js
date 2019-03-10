var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')

Page( {
  data: {
    worksItems: fileData.getworksData(),
    barberItems: fileData.getbarberData(),
    curIndex:0,
    winWidth: 0,
    winHeight: 0
  },
  onLoad: function () {
    var that = this
    that.setData({
      workslist: that.data.worksItems,
      barber: that.data.barberItems
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
  // 预定
  bookTap:function(){
    wx.navigateTo({
      url:'../book/book'
    })
  }
})