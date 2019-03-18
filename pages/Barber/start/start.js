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
    winHeight: 0,
    storeid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this
    that.setData({
      lifa: that.data.lifaData,
      storeid: options.storeid
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
  navigatea: function (e) {
    wx.navigateTo({
      url: '../seat/seat?storeid='+this.data.storeid,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})