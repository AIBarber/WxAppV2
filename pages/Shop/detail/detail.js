<<<<<<< HEAD
var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page( {
  data: {
    shopItems: fileData.getshopData(),
    shopdetail: [],
=======
var app = getApp()
var fileData = require('../../../utils/data.js')
var util = require('../../../utils/util')
Page( {
  data: {
    shopItems: fileData.getshopData(),
>>>>>>> 7221ad17ce4fda0798de5e73a30d137a699f23d2
    curIndex: 0,
    winWidth: 0,
    winHeight: 0
  },
  onLoad: function () {
    var that = this
    that.setData({
      shop: that.data.shopItems
    });
<<<<<<< HEAD
    this.getshopInfo();
=======
>>>>>>> 7221ad17ce4fda0798de5e73a30d137a699f23d2

    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

  },
  getLocation:function(){
    wx.navigateTo({
      url:'../location/location'
    })
  },
  bookTap:function(){
    wx.navigateTo({
      url:'../book/book'
    })
<<<<<<< HEAD
  },
  getshopInfo: function () {
    console.log('getshopInfo ' + api.StoreDetail);
    //wx.showNavigationBarLoading();
    var that = this;
    util.weshowRequest(
      api.StoreDetail,
      {
        "storeId": "1",
        'size': 10,
        //'barberid': app.globalData.userid
      },
      'POST').then(res => {
        //if (res.data) {}
        console.log('SteList ');
        console.log(res.data);
        // success
        that.setData({ shopdetail:res.data.bizContent.store});
        console.log('StoreList ');
        console.log(that.data.shopdetail);
        console.log('shopList ');
        //that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        //that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
        //that.setData({ barberDetails: (wx.getStorageSync('barberDetails') || []) });
      });
=======
>>>>>>> 7221ad17ce4fda0798de5e73a30d137a699f23d2
  }
})