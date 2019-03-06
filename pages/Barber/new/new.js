// pages/new/new.js

var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nav 初始化
    // cas picker
    casArray: ['只看自营店', '只看社区店'],
    casArray1: ['智能排序', '离我最近', '人气最高', '面积最大'],
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
<<<<<<< HEAD
    skillData: fileData.getSkilledData(),
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0

=======
    skillData: fileData.getSkilledData()
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
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
      list: that.data.navSectionItems
<<<<<<< HEAD
    });

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

=======
    })
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
  },
  // 跳转至详情页
  navigateDetail: function (e) {
    wx.navigateTo({
<<<<<<< HEAD
      url: '../detail/technicain_detail?artype=' + e.currentTarget.dataset.arid
=======
      url: '../detail/detail?artype=' + e.currentTarget.dataset.arid
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
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
<<<<<<< HEAD

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
=======
>>>>>>> 89468cd8a30a5ee656c7a248db2dbbfbb6ad158b
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