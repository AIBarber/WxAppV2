// pages/new/new.js

var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nav 初始化
    // cas picker
    casArray: ['只看自营店', '只看社区店'],
    casArray1: ['智能排序', '离我最近', '人气最高', '面积最大'],
    shoplist: [],
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav 初始化
    navTopItems: fileData.getIndexNavData(),
    navSectionItems: fileData.getIndexNavSectionData(),
    curNavId: 1,
    curIndex: 0,
    skillData: fileData.getSkilledData()
  },
  bindCasPickerChange: function (e) {
    console.log('Category picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      casIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    that.setData({
      list: that.data.skillData
    });
    this.getshopInfo();
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
  getshopInfo: function () {
    console.log('getshopInfo ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    util.weshowRequest(
      api.StoreList,
      {
        "longitude": "143.45",
        "latitude": "123.32",
        "orderType": "1",
        "category": "1",
        'size': 10,
        //'barberid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('StoreList ');
        console.log(res.data);
        // success
        that.setData({ shoplist: res.data.bizContent.list });
        console.log('StoreList ');
        console.log(that.data.shoplist);
        console.log('shopList ');
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        //that.setData({ barberDetails: (wx.getStorageSync('barberDetails') || []) });
      });
  }
})