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
    accountInfo:null,
    amountList:[],
    couponList:[],
    couponTime:[],
    couponAll:[],
    icon_path: '../../icon/icon_paid.png',
    myBarberList:null,
    accountAmount:null
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
    this.getCustomerAccountInfo();
    this.getCustomerAccount();
  },
  drawCash:function(){
    var that=this;
    wx.navigateTo({
      url: 'drawcash'
    })
  },
  getCustomerAccountInfo:function(){
    var that=this;
    util.weshowRequest(
      api.GetInCome,
      {
        'customerId': app.globalData.customerId
      },
      'POST').then(res => {
        that.setData({
          accountInfo: res.data.bizContent.customerAccount,
          accountAmount: res.data.bizContent.customerAccount.amount
        });
       
        console.log("discountList:" + JSON.stringify(res.data.bizContent.customerAccount));
        // this.makeCouponLists(res);
        // that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
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
  getCustomerAccount: function () {
    var that = this;
    util.weshowRequest(
      api.GetInCome,
      {
        'customerId': 2
      },
      'POST').then(res => {
        that.setData({
          customerAccount: res.data.bizContent.customerAccount
          });
        console.log("cus::" + JSON.stringify(res.data.bizContent.customerAccount));
        var cusIncomeList = res.data.bizContent.customerAccount.customerIncomeList;
        for (var i = 0; i < cusIncomeList.length;i++){
            var incomeListIndex="myBarberList["+i+"]";
        that.setData({
          [incomeListIndex]: res.data.bizContent.customerAccount.customerIncomeList[i]
          });
        }
        console.log("discountList:" + that.data.customerAccount);
        // this.makeCouponLists(res);
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
    var couponAll=[];
    for (var i = 0; i < that.data.discountList.length; i++) {
       // 这里还得改 应该是status==5是完成的订单
      if (resm.data.bizContent.order[i].status == 3) {
        // couponList.push(resm.data.bizContent.order[i].amount);
        // couponTime.push(resm.data.bizContent.order[i].createdTime);
        couponAll=resm.data.bizContent.order[i];
        var couponIndex = "couponAll[" + i + "]";
        that.setData({
          [couponIndex]: couponAll,
        })
      }
    console.log("i:"+i);
    }
    console.log("conponAll:"+JSON.stringify(that.data.couponAll[0]));
    // console.log("amount List:" + couponList+"  couponTime:"+couponTime+"store:"+couponStore);
  },
  getDiscountList: function () {
    // console.log('getDiscountList ' + api.CustomerDiscountList);
    //wx.showNavigationBarLoading();
    var that = this;
    var bizContent={
      
    }
    util.weshowRequest(
      api.Getcustomerorderlist,
     bizContent,
      'POST').then(res => {
        that.setData({
          discountList: res.data.bizContent.order
        });

 // this.makeCouponLists(res);
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
  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})