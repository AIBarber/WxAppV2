var app = getApp();
var fileData = require('../../../utils/data.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var model = require('../../../utils/model.js');

Page( {
  data: {
    shopItem: {},
    shopdetail: [],
    imageList:[],//店铺图片列表
    barberList:[],//理发师列表
    faceList:[],//顾客列表
    curIndex: 0,
    winWidth: 0,
    winHeight: 0
  },
  onLoad: function (options) {
    var that = this;
    var storeId = options.storeId;
    //请求获取店铺详情
    util.weshowRequest(
      api.StoreDetail,
      {
        "storeId": storeId
      },
      'POST').then(res => {
        // success
        var bizContent = res.data.bizContent;
        this.setData({
          shopItem: bizContent.store,
          imageList: bizContent.store.imageList,
          barberList: bizContent.store.barberList,
          faceList: bizContent.store.faceList
        })
        
      }).catch((err) => {
      });
  },

  getStoreDetail(){
   
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
  }
})