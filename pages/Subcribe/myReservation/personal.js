// pages/myReservation/personal.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info: null,
      reservation: null,
      attribute: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // var Pages = getCurrentPages();
    // var Page = Pages[Pages.length - 1];//当前页
    // var prevPage = Pages[Pages.length - 2];  //上一个页面
    // that.setData({
    //   reservation: prevPage.data.info_reservation
    // })
    that.getInfo()
    that.getReservation()
    that.getAttribute()
  },


  getInfo:function(){
    console.log('getDataList ' + api.StoreCustomerDetail);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.StoreCustomerDetail,
      {
        'customerid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList 11111111111111111111');
        console.log(res);
        // success
        that.setData({ info: res.data });
        console.log(res.data.type)
        app.globalData.userType=res.data.type
        // console.log(that.data);
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err22222222222222222222' + err);
        // fail
        that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({ info: (wx.getStorageSync('info') || []) });
      });
  },

  getReservation:function(){
    console.log('getDataList ' + api.BarberSubscribe);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.BarberSubscribe,
      {
        'barberid ': null,
        'customerid': app.globalData.userid,
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList 33333333333333333333333333333333');
        console.log(res);
        // success
        that.setData({ reservation: res.data });
        // console.log(that.data);
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err 44444444444444444444444444444444' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        that.setData({ reservation: (wx.getStorageSync('reservation') || []) });
      });
  },

  getAttribute:function(){
    console.log('getDataList ' + api.CustomerAttribute);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.CustomerAttribute,
      {
        'customerid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList 555555555555555555555555555');
        console.log(res);
        // success
        that.setData({ attribute: res.data });
        // console.log(that.data);
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
        that.setData({ attribute: (wx.getStorageSync('attribute') || []) });
      });
  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },

  goToMyBarber:function(){
    wx.navigateTo({
      url: '../myBarber/myBarber',
    })
  },

  goToCoupon:function(){
    wx.navigateTo({
      url: '../myCoupon/coupon',
    })
  },

  changeToBarber:function(){
    if(app.globalData.userType!=1){
      wx.navigateTo({
        url: '../FaceIdentity/Identity',
      })
    }else{
      wx.navigateTo({
        url: '../BarBer/personal',
      })
    }
  },

  goToConsumption:function(){
    wx.navigateTo({
      url: '../myHistoryCost/cost',
    })
  }
})