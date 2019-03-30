// pages/Barber/order/order.js
var util = require('../../../utils/util');
var api = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderInfo: '',
    storeId: null,
    orderTime: null
  },

  radioChange1(e) {
    console.log('radio发生change事件，携带value值为：', e)
    this.setData({
      orderTime: e.detail.value
    })
  },

  radioChange2(e) {
    console.log('radio发生change事件，携带value值为：', e)
    this.setData({
      storeId:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({orderId: options.id});
    this.getOrderDetail();
  },

  acceptOrder: function (e) {
    var that = this;
    if(that.data.storeId != null && that.data.orderTime != null){
      that.confirmOrder(1);
      wx.navigateTo({
        url: '../start/start?orderid=' + that.data.orderId + '&storeid=' + that.data.storeId + '&lifaData=' + that.data.orderInfo
      })
    }
  },

  rejectOrder: function (e) {
    this.confirmOrder(0);
    //重置前一页数据
    getCurrentPages()[getCurrentPages().length - 2].onLoad()
    wx.navigateBack()
  },

  getOrderDetail: function () {
    console.log('getOrderDetail ' + api.BarberOrderDetail);
    //wx.showNavigationBarLoading();
    var that = this;
    console.log('this.data.orderId：' + that.data.orderId)
    var bizContent = {
      "orderId": that.data.orderId
    }
    util.weshowRequest(
      api.BarberOrderDetail,
      bizContent,
      'POST').then(res => {
        console.log(res)
        that.setData({
          orderInfo: res.data.bizContent.order,
        });
        console.log(that.data.orderInfo);
        //util.stopRefreshing;
      }).catch((err) => {
        console.log('barberOrderlist err :' + err);
        // fail
        util.stopRefreshing;
      });
  },

  confirmOrder: function (type) {
    console.log('confirmOrder ' + api.BarberOrderConfirm);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      "orderId": that.data.orderId,
      "type": type,
      "remark": "test",
      "orderRelation": {
        "positions": "1",
        "storeIds": that.data.orderId
      },
    }
    util.weshowRequest(
      api.BarberOrderConfirm,
      bizContent,
      'POST').then(res => {
        console.log(res)
        //util.stopRefreshing;
      }).catch((err) => {
        console.log('BarberOrderConfirm err :' + err);
        // fail
        util.stopRefreshing;
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})