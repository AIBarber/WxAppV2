// pages/Shop/OpenstoreDetail/storeDetail.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid:'',
    shopList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      shopid:options.shopid
    })
    this.getDataList();
  },

  getDataList: function () {
    console.log('getDataList ' + api.ShareStoreDetail);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.ShareStoreDetail,
      {
        "storeId": that.data.shopid
      },
      'POST').then(res => {
        console.log(res.data);
        // success
        that.setData({
          shopList: res.data.bizContent.list,
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
      });
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