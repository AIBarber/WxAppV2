// var util = require('../../utils/util.js');
// var api = require('../../config/api.js');
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
    userType: 1,
    // userInfo: app.globalData.userInfo,
    // accountInfo: app.globalData.accountInfo,
    // hasUserInfo: app.globalData.hasUserInfo,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // CustomerHome
    customerFaceInfo: '',
    headPhoto: '',
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
    chooseTime: 0
  },

  onLoad: function (options) {
    console.log('onLoad...');
    console.log('onLoad... global');
    console.log("customerHome:"+CustomerHome);
    //      if(options.userType!=null){
    // this.setData({
    //   // userInfo: app.globalData.userInfo,
    //   // faceid: 123123,
    //   userType:options.userType
    // })
    //      }
    var that = this;
    if (this.data.faceid == null) {
      // util.login().then(res => {
      //   console.log('home login success');
      //   console.log(res);
      //   LoginMain.onLogin(that, res);
      // }).catch((err) => {
      //   // fail
      //   console.log('home login fail');
      //   console.log(err);
      //   LoginMain.onLogin(that, null);
      //   that = null;
      // });
    }

    //CustomerHome
    else if (that.data.userType == 2) {
      CustomerHome.getPersonalData(that);
    
      // CustomerHome.getAttribute(this);
      // CustomerHome.getCurService(this);
    }

    //BarberHome
    else {
      BarberHome.getBarberInfo(that);
      // BarberHome.getDataList_reservations(this);
      // BarberHome.getDataList_orders(this);
      // BarberHome.getDataList_time(this)
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
  toCustomer:function(){
    var that=this;
    BarberHome.toCustomer(that);
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
  }
})
