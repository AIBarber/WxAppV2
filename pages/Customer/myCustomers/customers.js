// pages/Customer/customers.js


var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // nav 初始化
    // cas picker
    interval: 3000,
    duration: 1000,
    // nav 初始化
    curIndex: 0,
    skillData: fileData.getSkilledData(),
    // tab切换
    currentTab: 0,
    customerListWillHaircut: fileData.getCustomersWillHaircut(),
    customerListNearTimeHaircut: fileData.getCustomersNearTimeHaircut()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    this.getBarberList();
    that.setData({
      list: that.data.navSectionItems,
      orderlist: that.data.orderItems
    });
    this.getBarberInfo();
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },

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