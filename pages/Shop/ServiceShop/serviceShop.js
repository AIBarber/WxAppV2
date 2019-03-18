// pages/Shop/ServiceShop/serviceShop.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopList: [],
      addList: [],
      flag: true  //显示已有列表还是添加列表
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

// 获取可以添加的店铺列表
  getShopList: function () {
    console.log('getDataList ' + api.StoreList);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.StoreList,
      {
        "longitude": "143.45",
        "latitude": "123.32",
        "orderType": "1",
        "category": "1"
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
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      });
  },

  addHandle:function(e){
    if(this.data.flag==true){
      this.getShopList();
    }
      this.setData({
        flag: false
      })
  },
   
  confirm:function(e){
    this.setData({
      flag: true
    })
    this.getDataList();
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

  removeHandle:function(e){
    console.log(e);
    console.log('getDataList ' + api.RemovebarbeRandstore);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.RemovebarbeRandstore,
      {
        // "barberId": app.globalData.userid,
        "barberId": 1,
        "storeId": e.target.id
      },
      'POST').then(res => {
        console.log(res.data);
        that.stopRefreshing();
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

      that.getDataList();
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