// pages/myDateServer/DateServerInfo.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}
  },
  saveSelectedBarberId: function () {
    var that = this;
    var seledBarId = app.globalData.selectedBarberId;
    console.log("全局标量：：" + app.globalData.selectedBarberId);
    for (var i = 0; i < seledBarId.length; i++) {
      if (that.data.barberId == seledBarId[i]) {
      } else {
        selectBarId.push(that.data.barberId);
      }
    }
    console.log("globalData-selectedBarberId" + getApp().globalData.selectedBarberId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var orderId = options.orderId;
    //查询订单详情
    util.weshowRequest(
      api.GetOrderDetail,
      { orderId:orderId },
      'POST').then(res => {
        that.setData({
          order: res.data.bizContent.order
        })  
      }).catch((err) => {
        console.log('barberlist err :' + err);
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.time + "--" + this.data.address);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.saveSelectedBarberId();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})