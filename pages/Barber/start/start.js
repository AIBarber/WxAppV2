// pages/Barber/start/start.js
var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    lifaData: fileData.getlifaData(),
    winWidth: 0,
    winHeight: 0,
    storeid: '',
    orderId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this
    that.setData({
      lifa: that.data.lifaData,
      storeid: options.storeid,
      orderId: options.orderid
    });
    console.log(that.data.lifaData)

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
  startHairCut: function (e) {
    wx.navigateTo({
      url: '../seat/seat?storeid='+this.data.storeid,
    })
  },

  endHairCut: function(e) {
    console.log('EndService: ' + api.EndService);
    //wx.showNavigationBarLoading();
    var that = this;
    console.log('this.data.orderId：' + that.data.orderId)
    var bizContent = {
      "orderId": that.data.orderId
    }
    util.weshowRequest(
      api.EndService,
      bizContent,
      'POST').then(res => {
        console.log(res)
      }).catch((err) => {
        console.log('EndService err :' + err);
        // fail
        util.stopRefreshing;
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})