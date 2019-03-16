// pages/Shop/ServiceShop/serviceShop.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },

  getDataList: function () {
    console.log('getDataList ' + api.GetServiceshop);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.GetServiceshop,
      {
        "longitude": "143.45",
        "latitude": "123.32",
        "barberId": "1"
      },
      'POST').then(res => {
        console.log(res.data);
        // success
        that.setData({
          shopList: res.data.bizContent.list,
          flag: true
        });
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({
          shopList: (wx.getStorageSync('shopList') || []),
          flag: false
        });
      });
  },

  addHandle:function(){

  },

  removeHandle:function(){

  },
  
  /*返回前一页*/
  backToprevPage: function () {
    wx.navigateBack({
    })
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})