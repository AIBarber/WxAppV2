// pages/Shop/addShop/addshop.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addList: null,
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getShopList();
  },

  // 获取可以添加的店铺列表
  getShopList: function () {
    console.log('getDataList ' + api.StoreList);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.StoreList,
      {
        "longitude": app.globalData.longitude,
        "latitude": app.globalData.latitude,
        "orderType": "1",
        // "category": "1"
      },
      'POST').then(res => {
        console.log(res);
        // success
        that.setData({
          addList: res.data.bizContent.list,
        });
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
      });
  },

  add:function(e){
     console.log(e);
    console.log('BindbarbeRandstore ' + api.BindbarbeRandstore);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.BindbarbeRandstore,
      {
        "barberId": 1,
        "storeId": e.target.id
      },
      'POST').then(res => {
        console.log(res.data);
        // success
        that.stopRefreshing();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
      });
  },

  confirm:function(){
    //重置前一页数据
    getCurrentPages()[getCurrentPages().length - 2].onLoad()
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