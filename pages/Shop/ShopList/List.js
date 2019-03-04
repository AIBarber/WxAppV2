// pages/ShopList/List.js
/*var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({

  /**
   * 页面的初始数据
   
  data: {
      shop_arrays:[],
  },

  /**
   * 生命周期函数--监听页面加载
   
  onLoad: function (options) {
    this.getDataList();
    //getApp().editTabBar();
  },

  onShareAppMessage: function (ops) {
    return model.getShareFunction();
  },

// 获取店铺列表
  getDataList: function () {
    console.log('getDataList ' + api.StoreList);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.StoreList,
      {
        'size': 10
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList ');
        console.log(res);
        // success
        that.setData({ shop_arrays: res.data.data.list });
        console.log(that.data);
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
        that.setData({ shop_arrays: (wx.getStorageSync('shop_arrays') || []) });
      });
  },

  gotoDetail: function (event) {
    var id = event.currentTarget.id;
    //app.globalData.current_store_id = id;
    var data = this.retriveDataById(id);
    if (data != null) {
      console.log('gotoDetail ' + id);
      wx.navigateTo({
        url: '../ShopDetial/detial?shop_id=' + id,
      })
    }
  },

  retriveDataById: function (id) {
    for (var i = 0; i < this.data.shop_arrays.length; i++) {
      if (this.data.shop_arrays[i].id == id) {
        return this.data.shop_arrays[i];
      }
    }
    return null;
  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },

  stopRefreshing: function (){
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})*/


//获取应用实例
var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')

Page({
  // 页面初始数据
  data: {
    // nav 初始化
    // cas picker
    casArray: ['只看自营店', '只看社区店'],
    casArray1: ['智能排序', '离我最近', '人气最高', '面积最大'],
    casIndex: 0,
    casIndex1: 0,
    // addr picker
    addrIndex: 0,
    skillData: fileData.getSkilledData(),
    curNavId: 1,
    curIndex: 0
  },
  bindCasPickerChange: function (e) {
    console.log('Category picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      casIndex: e.detail.value
    })
  },

  onLoad: function () {
    var that = this
    that.setData({
      list: that.data.skillData
    })
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?artype=' + e.currentTarget.dataset.arid
    })
  },
  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    if (this.data.skillData.length === 0) return
    var that = this
    // 由于是模拟数据，加载更多时候，数据重复加载
    that.data.skillData = that.data.skillData.concat(that.data.skillData)
    that.setData({
      list: that.data.skillData,
    })
  },
  // 地址选择
  bindAddrPickerChange: function (e) {
    console.log('Category picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  }


})

