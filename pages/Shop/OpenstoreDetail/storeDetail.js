// pages/Shop/OpenstoreDetail/storeDetail.js
var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid:'',
    shopList: '',
    photo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      shopid:options.shopid
    })
    this.getDataList();
  },

  getDataList: function () {
    console.log('getDataList ' + api.ShareStoreDetail);
    wx.showNavigationBarLoading();
    var that = this;

    util.weshowRequest(
      api.ShareStoreDetail,
      {
        "storeId": that.data.shopid
      },
      'POST').then(res => {
        console.log(res.data);
        // success
        that.setData({
          shopList: res.data.bizContent.store,
        });
        that.stopRefreshing();
        //that.waitUpdate();
      }).catch((err) => {
        console.log('getDataList err' + err);
        // fail
        that.stopRefreshing();
        wx.showToast({
          title: '正在获取数据…',
          icon: 'loading',
          duration: 3000,
          mask: true
        });
      });
  },

  goToIncome:function(){

  },

  goTohistoryBarber:function(){

  },

  goTohistoryCustomer:function(){

  },

  goTohistoryOrder:function(){

  },

  upLoadPhoto:function(){
    var that = this;
    wx.uploadFile({
      url: api.GetFaceId,
      filePath: that.data.src,
      name: 'face_image',
      formData: {
        'appid': app.globalData.appid,
        'openid': app.globalData.userid,
        'timestamp': util.getCurrentSecond()
      },
      success: function (res) {
        console.log('*******************888888888*************************')
        console.log(res)
        var data = JSON.parse(res.data)
        console.log(data)
        if (data != null && data.error_code == 0) {
          that.setData({
            faceid: data.result.user_list[0].user_id
          })
          //app.globalData.userid = data.data.openid
          app.globalData.faceid = data.result.user_list[0].user_id
          console.log('********************************************')
          console.log(app.globalData.faceid)
          that.stopRefreshing();
        }
        else {
          wx.showModal({
            title: '提示',
            content: '未识别出人脸，请确保人像清晰完整。点击重新进行拍摄！',
          })
        }
      },
      fail: function (res) {
      }
    })
  },

  confirmChange:function(){

  },

  stopRefreshing: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})