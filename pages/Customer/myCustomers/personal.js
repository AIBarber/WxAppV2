// pages/myReservation/personal.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var wxpay = require('../../../utils/wxpay.js');
var app = getApp();
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     customerFaceInfo: '',
//     headPhoto: '',
//     reservation: null,
//     attribute: null,
//     myHairSrc: null,
//   },
function jumpToBarber () {
    wx.navigateTo({
      url: '../Customer/myCustomers/jumpToBarber',
    })
  };
  /**
   * 生命周期函数--监听页面加载
   */
function getPersonalData(object) {
    var that = object;
    util.weshowRequest(
      api.Getcustomerinfo,
      {
        customerId: 1
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('customerFaceInfo:: ');

        // success
        that.setData({
          customerFaceInfo: res.data.bizContent.customerinfo
        });
        console.log("this.data.customerFaceInfo:" + that.data.customerFaceInfo);
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
      });
  };
function onLoad(options) {
    this.getPersonalData();
  };

function onShow() {
    this.getHeadPhoto();
  };
function getHeadPhoto(object) {
    // console.log("进入onShow")
   var that = object;
    if (wx.getStorageSync("personnal") == null) {

    } else {
      that.setData({
        myHairSrc: wx.getStorageSync("personnal")
      })
      var bizContent = { 'customerId': 1 }
    var photoPaths='';
      photoPaths = wx.getStorageSync("personnal");
      util.wxUploadFile(photoPaths, bizContent).then(res => {
        var face = res.data.bizContent;
        var a = JSON.parse(res.data);
        that.setData({
          headPhoto: a.bizContent.faceinfo
        })

      }).catch((err) => {
        console.log('HeadPhoto err :' + err);
        // fail
        util.stopRefreshing;
        // wx.showToast({
        //   title: '正在获取数据…',
        //   icon: 'loading',
        //   duration: 3000,
        //   mask: true
        // });
      });


    }
    wx.removeStorageSync("personnal");
  };

  // getInfo:function(){
  //   console.log('getDataList ' + api.StoreCustomerDetail);
  //   wx.showNavigationBarLoading();
  //   var that = this;

  //   util.weshowRequest(
  //     api.Getcustomerinfo,
  //     {
  //       'customerid': app.globalData.userid
  //     },
  //     'POST').then(res => {
  //       //if (res.data) {}
  //       console.log('getDataList 11111111111111111111');
  //       console.log(res);
  //       // success
  //       that.setData({ info: res.data });
  //       console.log(res.data.type)
  //       app.globalData.userType=res.data.type
  //       // console.log(that.data);
  //       that.stopRefreshing();
  //       //that.waitUpdate();
  //     }).catch((err) => {
  //       console.log('getDataList err22222222222222222222' + err);
  //       // fail
  //       that.stopRefreshing();
  //       // wx.showToast({
  //       //   title: '正在获取数据…',
  //       //   icon: 'loading',
  //       //   duration: 3000,
  //       //   mask: true
  //       // });
  //       that.setData({ info: (wx.getStorageSync('info') || []) });
  //     });
  // },

  // getReservation:function(){
  //   console.log('getDataList ' + api.BarberSubscribe);
  //   wx.showNavigationBarLoading();
  //   var that = this;

  //   util.weshowRequest(
  //     api.BarberSubscribe,
  //     {
  //       'barberid ': null,
  //       'customerid': app.globalData.userid,
  //     },
  //     'POST').then(res => {
  //       //if (res.data) {}
  //       console.log('getDataList 33333333333333333333333333333333');
  //       console.log(res);
  //       // success
  //       that.setData({ reservation: res.data });
  //       // console.log(that.data);
  //       //that.stopRefreshing();
  //       //that.waitUpdate();
  //     }).catch((err) => {
  //       console.log('getDataList err 44444444444444444444444444444444' + err);
  //       // fail
  //       //that.stopRefreshing();
  //       wx.showToast({
  //         title: '正在获取数据…',
  //         icon: 'loading',
  //         duration: 3000,
  //         mask: true
  //       });
  //       that.setData({ reservation: (wx.getStorageSync('reservation') || []) });
  //     });
  // },

  // getAttribute:function(){
  //   console.log('getDataList ' + api.CustomerAttribute);
  //   wx.showNavigationBarLoading();
  //   var that = this;

  //   util.weshowRequest(
  //     api.CustomerAttribute,
  //     {
  //       'customerid': app.globalData.userid
  //     },
  //     'POST').then(res => {
  //       //if (res.data) {}
  //       console.log('getDataList 555555555555555555555555555');
  //       console.log(res);
  //       // success
  //       that.setData({ attribute: res.data });
  //       // console.log(that.data);
  //       //that.stopRefreshing();
  //       //that.waitUpdate();
  //     }).catch((err) => {
  //       console.log('getDataList err' + err);
  //       // fail
  //       //that.stopRefreshing();
  //       wx.showToast({
  //         title: '正在获取数据…',
  //         icon: 'loading',
  //         duration: 3000,
  //         mask: true
  //       });
  //       that.setData({ attribute: (wx.getStorageSync('attribute') || []) });
  //     });
  // },

function backToprevPage() {
    wx.navigateBack({
    })
  };
function goToMyShareStore() {
    wx.navigateTo({
      url: '../Customer/ShopList/List',
    })
  };
function goToMyBarber() {
    wx.navigateTo({
      url: '../Customer/myBarber/myBarber',
    })
  };
function goToHistoryCost(){
    wx.navigateTo({
      url: '../Customer/myHistoryCost/cost',
    })
  };
function goToCoupon() {
    wx.navigateTo({
      url: '../Customer/myCoupon/coupon',
    })
  };

function changeToBarber() {
    if (app.globalData.userType != 1) {
      wx.navigateTo({
        url: '../FaceIdentity/Identity',
      })
    } else {
      wx.navigateTo({
        url: '../BarBer/personal',
      })
    }
  };

function goToConsumption() {

  };
function goToMyShareShop() {
    wx.navigateTo({
      url: '../myHistoryCost/cost',
    })
  };
function uploadHairPhoto() {
    var that = this;
    wx.navigateTo({
      url: '../Customer/camaraIdentity/camaraIdentity?photoName=personnal',
    })
  };
function takePhoto() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: function (res) {
        myHairSrc: res.tempFilePaths
      },
    })

    console.log(myHairSrc);
  }
// })

module.exports = {
  getPersonalData,
  jumpToBarber,
  getHeadPhoto,
  backToprevPage,
  goToMyShareStore,
  goToMyBarber,
  goToCoupon,
  goToConsumption,
  changeToBarber,
  uploadHairPhoto,
  takePhoto,
  goToHistoryCost
}