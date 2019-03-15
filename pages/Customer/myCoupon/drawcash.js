// pages/myCustomers/customers.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount:'',
    status:'',
  
  },

  getMoney:function(e){
     console.log("提现："+e.detail.value.money);
    var money = e.detail.value.money;
    this.getApply(money);
  },

  getApply: function ( money) {
    //  this.money=money;
    var that = this;
    var bizContent={
      'customerId': 2,
      amount:money
    }
    util.weshowRequest(
      api.WxApply,
      bizContent,
      'POST').then(res => {
        that.setData({
          status:res.data.bizContent.status
        });
        console.log("money:"+money);
        console.log("status:::" + that.data.status);
        this.getCustomerAccountInfo();
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
  getCustomerAccountInfo: function () {
    var that = this;
    util.weshowRequest(
      api.GetInCome,
      {
        'customerId': 2
      },
      'POST').then(res => {
        that.setData({
        
          amount: res.data.bizContent.customerAccount.amount
        });

        console.log("getAccountInfo:" + JSON.stringify(res.data.bizContent.customerAccount.amount));
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
  drawCashAll:function(){
    var that=this;
    that.getApply(that.data.amount);

  }, 
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCustomerAccountInfo();
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