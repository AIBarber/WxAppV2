// pages/myCoupon/coupon.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page({

  /**
   * 页面的初始数据结构
   */
  data: {
    discountList: [],
    amountList:[],
    couponList:[],
    couponTime:[],
    icon_path: '../../icon/icon_paid.png'
  
  },
  returnBtn: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDiscountList();
  },

  getDiscountList: function () {
    // console.log('getDiscountList ' + api.CustomerDiscountList);
    //wx.showNavigationBarLoading();
    var that = this;
    util.weshowRequest(
      api.Getcustomerorderlist,
      {
        'statusStr': 3,
        'customerId': 1
      },
      'POST').then(res => {
        //if (res.data) {}
        // console.log('getDiscountList ');
        // console.log(res);
        // success
        // var dataJson = JSON.stringify(res.data.bizContent.order);
        // console.log("dataJson:"+dataJson);
        that.setData({ 
          discountList: res.data.bizContent.order
          });
        console.log("discountList:"+that.data.discountList);
        this.makeCouponLists(res);
       
        // that.stopRefreshing();
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

  makeCouponLists:function(resm){
    var that=this;
    var couponList=[];
    var couponTime=[];
    var couponStore=[];
    for (var i = 0; i < that.data.discountList.length; i++) {
      if (resm.data.bizContent.order[i].status == 3) {
        couponList.push(resm.data.bizContent.order[i].amount);
        couponTime.push(resm.data.bizContent.order[i].createdTime);
      
        // couponStore.push(resm.data.bizContent.order[i].orderRelaton.storeList[1].name);
        console.log("单个数据:" + resm.data.bizContent.order[i].amount);
      }
    }
    that.setData({
      couponList: couponList,
      couponTime: couponTime
    })
    console.log("amount List:" + couponList+"couponTime:"+couponTime+"store:"+couponStore);
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})