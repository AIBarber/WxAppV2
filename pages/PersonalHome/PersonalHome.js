var util = require('../../utils/util.js');
var api = require('../../config/api.js');
// var model = require('../../utils/model.js');

var CustomerHome = require('../Customer/myCustomers/personal.js');
var BarberHome = require('../Barber/BarberHome/personal.js');
// import myDialog from '../template/dialog';
// var LoginMain = require('../../LoginMain.js');
var app = getApp();

var isPullDownRefreshing = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // LoginMain
    // faceid: app.globalData.faceid,
    faceid:123123,
    userType: app.globalData.userType,
    // userInfo: app.globalData.userInfo,
    // accountInfo: app.globalData.accountInfo,
    // hasUserInfo: app.globalData.hasUserInfo,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // CustomerHome
    customerFaceInfo: '',
    // reservation: null,
    attribute: null,
    myHairSrc: null,

    //BarberHome
    reservations: [],
    orders: [],
    barberDetails: [],
    barberID: null,
    timeToReserve: [],
    barberInfo:'',
    chooseTime: 0,
    customerinfo: '',
    headPhoto: '',
    barberInfo: "",
    location_address: ""
  },

  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.userType);
    if (this.data.faceid == null) {
     
    }
    //CustomerHome
    else if (that.data.userType == 2) {
      CustomerHome.loadPersonalInfo(that);
    }

    //BarberHome
    else {
      BarberHome.getBarberInfo(that);
    }
  },

  onShareAppMessage: function (ops) {
    return model.getShareFunction();
  },

  onShow: function () {
    //this.getAccount(app.globalData.userid);
    console.log('onShow... data');
   var that=this;
    CustomerHome.getHeadPhoto(that);
    if (app.globalData.faceid == null) {
    }
    else {
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady... data');
  },
  uploadHairPhoto:function(){
  
    CustomerHome.uploadHairPhoto();
  },
  
  goSetting: function () {
    var that = this;
    CustomerHome.goSetting(that);
  },
  backToprevPage:function(){
    CustomerHome.backToprevPage();
  },
  goToMyShareStore:function(){
    CustomerHome.goToMyShareStore();
  },
  onGotUserInfo: function (e) {
    LoginMain.onGotUserInfo(this, e);
  },
  
  goToMyBarber: function () {
    CustomerHome.goToMyBarber();
  },

  goToCoupon: function () {
    CustomerHome.goToCoupon();
  },

  goToConsumption: function () {
    CustomerHome.goToConsumption();
  },

  goToHistoryCost: function () {
    CustomerHome.goToHistoryCost();
  },

  goToMyCustomers: function () {
    BarberHome.goToMyCustomers();
  },

  gotoCashdraw: function () {
    BarberHome.gotoCashdraw();
  },
  showTime:function(){
    var that=this
     BarberHome.showTime(that);
  },
  changeToBarber: function () {
    // CustomerHome.changeToBarber(this);
    // BarberHome.getDataList_details(this);
    // BarberHome.getDataList_reservations(this);
    // BarberHome.getDataList_orders(this);
    // BarberHome.getDataList_time(this);
  },
  jumpToBarber:function(){
    CustomerHome.jumpToBarber();
  },
  backToprevPage: function () {
    BarberHome.backToprevPage();
  },

  changeToCustomer: function () {
    // BarberHome.changeToCustomer(this);
    // CustomerHome.getInfo(this);
    // CustomerHome.getReservation(this);
    // CustomerHome.getAttribute(this);
    // CustomerHome.getCurService(this);
  },

  select0: function (event) {
    BarberHome.select0(this, event);
  },

  select1: function (event) {
    BarberHome.select1(this, event);
  },

  select2: function (event) {
    BarberHome.select2(this, event);
  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  toBarber: function () {
    //切换用户为客户
    var that = this;
    util.weshowRequest(
      api.Getbarberid, {
        "customerId": app.globalData.customerId
      },
      'POST').then(res => {
        // success
        var status = res.data.bizContent.status;
        if (status == '1') {
          //已注册
          that.setData({
            barberID: res.data.bizContent.barberId
          });
          app.globalData.barberId = that.data.barberID;
          app.globalData.userType = 1;
          //跳转到理发师页面
          that.setData({
            userType: app.globalData.userType
          });
          this.onLoad();
        } else {
          //未注册,跳转到认证页面
          wx.navigateTo({
            url: '/pages/Login/IDConfirm/IDConfirm'
          });
        }

      }).catch((err) => {
        console.log('barberInfo err :' + err);
      });
  },
  toCustomer:function () {
    var that = this;
    app.globalData.userType = 2;
    that.setData({
      userType: 2
    });
    this.onLoad();
  }
})
