var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');
var wxpay = require('../../../utils/wxpay.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  barberList:'',
    barberList: [{barberId:"123123", name: "张三", level: "高级理发师", years: 2, mobile: 123123123123, status: 2}]
     
  },
  getBarberList: function () {
    console.log('getStoreList ' + api.StoreList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {
      'start': "1",
      'limit': "3",
      // 'category': "1",
      // 'orderType': "1"
      'type':1,
        'orderType':1
    }
    util.weshowRequest(
      api.GetBarberList,
      bizContent,
      'POST').then(res => {
        //if (res.data) {}
        console.log("barberList+res");
        console.log(res);
        // success
        that.setData({ barberList: res.data.bizContent.list });
        console.log("that.data:" + res.data.bizContent);
        // that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('shopList  err' + err);
        // fail
        // that.stopRefreshing();
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getBarberList();
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