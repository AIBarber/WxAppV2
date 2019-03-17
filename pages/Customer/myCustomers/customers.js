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
    customerListWillHaircut: [],
    customerListNearTimeHaircut: [],
    customerListWillHaircutHandle: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getCustomerList();
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

  },
  getCustomerList: function () {
    util.weshowRequest(
      api.Getmycustomerlist,
      {
        barberId: 1
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('bizContent:: ');

        // success
        this.setData({
          customerListWillHaircut: res.data.bizContent.nearlist,
        });
        this.setData({
          customerListWillHaircutHandle: this.handle2RowsList(res.data.bizContent.normallist)
        })
        this.setData({
          customerListNearTimeHaircut: res.data.bizContent.normallist
        });

        console.log("this.data.bizContent:" + this.data.customerListNearTimeHaircut);
        // console.log(that.data);

        util.stopRefreshing;
        util.waitUpdate;
      }).catch((err) => {
        console.log('customerFaceInfo err :' + err);
        // fail
        util.stopRefreshing;
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      })
  },
  handle2RowsList: function (nearlist) {
    var nearHandleList = [];
    for (var i = 0; i < nearlist.length; i += 2) {
      nearHandleList.push(nearlist.slice(i, i + 2));
    }
    console.log('返回数据' + nearHandleList);
    return nearHandleList;
  }

}) 