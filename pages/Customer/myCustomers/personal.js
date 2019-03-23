// pages/myReservation/personal.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var wxpay = require('../../../utils/wxpay.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerinfo:'',
    headPhoto:''
  },
  onLoad: function (options) {
    this.loadPersonalInfo();
  },
  loadPersonalInfo: function (){
    var that = this;
    util.weshowRequest(
      api.Getcustomerinfo, {
        "customerId": "1"
      },
      'POST').then(res => {
        //success
        that.setData({
          customerinfo: res.data.bizContent.customerinfo,
          headPhoto: res.data.bizContent.customerinfo.customerFaceInfo
        });
      }).catch((err) => { });
  },
  goToMyShareStore:function () {
    wx.navigateTo({
      url: '/pages/Shop/Openshare/share',
    })
  },

goToMyBarber :function () {
  wx.navigateTo({
    url: '../myBarber/myBarber',
  })
},
goToHistoryCost:function () {
  wx.navigateTo({
    url: '../myHistoryCost/cost',
  })
},
goToCoupon: function () {
  wx.navigateTo({
    url: '../myCoupon/coupon',
  })
},

changeToBarber : function () {
  if (app.globalData.userType != 1) {
    wx.navigateTo({
      url: '../FaceIdentity/Identity',
    })
  } else {
    wx.navigateTo({
      url: '../BarBer/personal',
    })
  }
},
goToConsumption: function () {
    wx.navigateTo({
      url: '/pages/Customer/myHistoryCost/cost',
    })
},
uploadHairPhoto : function () {
  var that = this;
  wx.navigateTo({
    url: '../camaraIdentity/camaraIdentity?photoName=personnal',
  })
},
  jumpToBarber:  function () {
    wx.navigateTo({
      url: '../myCustomers/jumpToBarber',
    })
  }
})