// pages/myReservation/personal.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var wxpay = require('../../../utils/wxpay.js');
var app = getApp();
Page({});

  /**
   * 页面的初始数据
   */
  // data: {
  //   customerinfo:'',
  //   headPhoto:''
  // },
  // onLoad: function (options) {
  //   this.loadPersonalInfo();
  // },
function loadPersonalInfo(that){
    util.weshowRequest(
      api.Getcustomerinfo, {
        "customerId": app.globalData.customerId
      },
      'POST').then(res => {
        //success
        that.setData({
          customerinfo: res.data.bizContent.customerinfo,
          headPhoto: res.data.bizContent.customerinfo.customerFaceInfo
        });
      }).catch((err) => { });
  };
function goToMyShareStore() {
    wx.navigateTo({
      url: '/pages/Shop/Openshare/share',
    })
  };

function goToMyBarber() {
  wx.navigateTo({
    url: '/pages/Customer/myBarber/myBarber',
  })
};
function goToHistoryCost() {
  wx.navigateTo({
    url: '/pages/Customer/myHistoryCost/cost',
  })
};
function goToCoupon() {
  wx.navigateTo({
    url: '/pages/Customer/myCoupon/coupon',
  })
};

function changeToBarber () {
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
    wx.navigateTo({
      url: '/pages/Customer/myHistoryCost/cost',
    })
};
function goSetting() {
  wx.navigateTo({
    url: '/pages/Customer/myCustomers/my',
  })
};
function uploadHairPhoto() {
  var that = this;
  wx.navigateTo({
    url: '/pages/Customer/camaraIdentity/camaraIdentity?photoName=personnal',
  })
};
function jumpToBarber () {
    wx.navigateTo({
      url: '/pages/Customer/myCustomers/jumpToBarber',
    })
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
    var bizContent = { 'customerId': app.globalData.customerId }
    var photoPaths = '';
    photoPaths = wx.getStorageSync("personnal");
   // console.log(wx.getStorageSync("personnal"))
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

//  });
module.exports = {
  loadPersonalInfo,
  jumpToBarber,
  getHeadPhoto,
  goToMyShareStore,
  goToMyBarber,
  goToCoupon,
  goToConsumption,
  goSetting,
  changeToBarber,
  uploadHairPhoto,
  // takePhoto,
  goToHistoryCost
}
