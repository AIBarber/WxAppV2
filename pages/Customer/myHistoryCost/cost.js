// pages/myHistoryCost/cost.js
var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util');
var api = require('../../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cost_list:'' ,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList_cost();
  },

  backToprevPage: function () {
    wx.navigateBack({
    })
  },

  // 获取数据列表
  getDataList_cost: function () {
    console.log('getDataList ' + api.Getcustomerorderlist);
    console.log(this.data.id);
    // wx.showNavigationBarLoading();
    var that = this;
    var bizContent = {   
      "statusStr": "1,2,3",
      'customerId': "1"
      }
    util.weshowRequest(
      api.Getcustomerorderlist,
      bizContent,
      'POST').then(res => {
        //if (res.data) {}
        console.log('getDataList_cost ');
        console.log(res);
        // success
        var orderLength = res.data.bizContent.order.length;
        for(var i=0;i<orderLength;i++){
          var costList = "cost_list["+i+"]";
          that.setData({
            [costList]: res.data.bizContent.order[i],
          });
        
        }
        console.log("order:"+that.data.cost_list);
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
        that.setData({ cost_list: (wx.getStorageSync('cost_list') || []) });
      });
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})