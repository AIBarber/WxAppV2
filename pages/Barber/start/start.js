// pages/Barber/start/start.js
var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    lifaData: fileData.getlifaData(),
    winWidth: 0,
    winHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.setData({
      lifa: that.data.lifaData
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
<<<<<<< HEAD
  navigatea: function (e) {
    wx.navigateBack()
  },
=======
>>>>>>> 7221ad17ce4fda0798de5e73a30d137a699f23d2

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})