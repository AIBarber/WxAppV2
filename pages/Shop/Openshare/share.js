// pages/Barber/BarberHome/Openshare/share.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: '',  //共享店铺列表是否为空
    shopList: [],
    // check: [],
    id: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
    //  this.getShareStatus();
    // for (var i = 0; i < this.data.shopList.length; i++) {
    //   this.data.check[i] = false;
    // }
  },

  getDataList: function () {
    console.log('getDataList ' + api.MyOpenStore);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.MyOpenStore,
      {
        'customerId': that.data.id
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
         // flag: false
        });
      });
  },

  changeShareStatus: function (e) {
    wx.showNavigationBarLoading();
   // console.log(e)
    var that = this;
    var index;
    var id = e.target.id;  //当前店铺的id
    console.log('at present: id=' + id);
    for (var i = 0; i < that.data.shopList.length; i++) {
      if (that.data.shopList[i].storeId == id) {
        index = i;
      }
    }
    console.log('at present: share=' + that.data.shopList[index].share);
    util.weshowRequest(
      api.ShareStatus,
      {
        "storeId": id,
        "share": Math.abs(that.data.shopList[index].share - 1)
      },
      'POST').then(res => {
        //console.log(res.data);
        // success
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
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
   // that.onlad();
  },

  tab: function(e) {
    console.log(e);
  },

  // 申请共享店主
  applyShop: function () {
    wx.navigateTo({
      url: '../Apply/applyShop'
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